import { CartProduct } from "@/interfaces";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
    cart: CartProduct[];

    getSummaryInformation: () => {
        itemsInCart: number;
        subtotal: number;
        tax: number;
        total: number;
    };

    addProductToCart: (product: CartProduct) => void;
    updateProductQuantity: (product: CartProduct, quantity: number) => void;
    removeProductFromCart: (product: CartProduct) => void;

}

export const useCartStore = create<State>()(

    persist(
        (set, get) => ({
            cart: [],

            getSummaryInformation: () => {
                const { cart } = get();
                const itemsInCart = cart.reduce((total, item) => total + item.quantity, 0);
                const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
                const tax = subtotal * 0.15;
                const total = subtotal + tax;

                return {
                    itemsInCart,
                    subtotal,
                    tax,
                    total
                };
            },

            addProductToCart: (product: CartProduct) => {
                const { cart } = get();

                //1. Check if the product already exists in the cart
                const existingProduct = cart.some(item => item.id === product.id && item.size === product.size);

                if (!existingProduct) {
                    set({ cart: [...cart, product] });
                    return;
                }

                // 2. I know the product already exists, so I update the quantity
                const updatedCartProducts = cart.map(item => {

                    if (item.id === product.id && item.size === product.size) {
                        return {
                            ...item,
                            quantity: item.quantity + product.quantity
                        };
                    }

                    return item;
                });

                set({ cart: updatedCartProducts });

            },

            updateProductQuantity: (product: CartProduct, quantity: number) => {
                const { cart } = get();

                const updatedCartProducts = cart.map(item => {
                    if (item.id === product.id && item.size === product.size) {
                        return {
                            ...item,
                            quantity
                        };
                    }
                    return item;
                });

                set({ cart: updatedCartProducts });
            },

            removeProductFromCart: (product: CartProduct) => {
                const { cart } = get();

                const updatedCartProducts = cart.filter(item => !(item.id === product.id && item.size === product.size));

                set({ cart: updatedCartProducts });
            },

        }),
        { name: "shopping-cart" },
    )


);