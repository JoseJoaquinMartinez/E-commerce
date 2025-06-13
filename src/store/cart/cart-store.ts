import type { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];

  addProductToCart: (product: CartProduct) => void;
  //updateProductInCart
  //removeProductFromCart
}

export const useCartStore = create<State>()(
  //persist()
  (set, get) => ({
    cart: [],

    //Methods

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
  })
);
