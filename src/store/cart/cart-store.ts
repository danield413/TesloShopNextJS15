import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  cart: CartProduct[];
  itemsInCart: number;
  subtotal: number;
  tax: number;
  total: number;

  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProductFromCart: (product: CartProduct) => void;
}

const calculateSummary = (cart: CartProduct[]) => {
  const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  return { itemsInCart, subtotal, tax, total };
};

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      itemsInCart: 0,
      subtotal: 0,
      tax: 0,
      total: 0,

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();
        const existingProduct = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        let updatedCart: CartProduct[];

        if (!existingProduct) {
          updatedCart = [...cart, product];
        } else {
          updatedCart = cart.map((item) =>
            item.id === product.id && item.size === product.size
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          );
        }

        set({ cart: updatedCart, ...calculateSummary(updatedCart) });
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();

        const updatedCart = cart.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity }
            : item
        );

        set({ cart: updatedCart, ...calculateSummary(updatedCart) });
      },

      removeProductFromCart: (product: CartProduct) => {
        const { cart } = get();

        const updatedCart = cart.filter(
          (item) => !(item.id === product.id && item.size === product.size)
        );

        set({ cart: updatedCart, ...calculateSummary(updatedCart) });
      },
    }),
    { name: "shopping-cart" }
  )
);
