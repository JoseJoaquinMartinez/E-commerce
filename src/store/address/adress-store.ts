import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  address: {
    firstName: string;
    lastName: string;
    address: string;
    address2?: string;
    city: string;
    postalCode: string;
    country: string;
    phone: string;
  };
  //Methods
  setAddress: (addres: State["address"]) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      address: {
        firstName: "",
        lastName: "",
        address: "",
        address2: "",
        city: "",
        postalCode: "",
        country: "",
        phone: "",
      },
      setAddress: (address) => {
        set({ address: address });
      },
    }),
    {
      name: "address-storage",
    }
  )
);
