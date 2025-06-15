import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    tax: number;
    total: number;
    itemsInCart: number;
  };

  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProductFromCart: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      //Methods

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      getSummaryInformation: () => {
        const { cart } = get();

        const subTotal = cart.reduce(
          (subTotal, item) => subTotal + item.price * item.quantity,
          0
        );
        const tax = subTotal * 0.15; // Assuming a tax rate of 15%
        const total = subTotal + tax;
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity,
          0
        );

        return {
          subTotal,
          tax,
          total,
          itemsInCart,
        };
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        //check if the product already exists in the cart with the same size
        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) {
          set({
            cart: [...cart, product],
          });
          return;
        }

        // If the product already exists, update the quantity
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: item.quantity + product.quantity,
            };
          }
          return item;
        });
        set({
          cart: updatedCartProducts,
        });
      },
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: quantity,
            };
          }
          return item;
        });

        set({
          cart: updatedCartProducts,
        });
      },
      removeProductFromCart: (product: CartProduct) => {
        const { cart } = get();
        const updatedCartProducts = cart.filter(
          (item) => !(item.id === product.id && item.size === product.size)
        );

        set({
          cart: updatedCartProducts,
        });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
