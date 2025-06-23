"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";


export const OrderSummary = () => {

    const [loaded, setLoaded] = useState(false);

    const itemsInCart = useCartStore((state) => state.itemsInCart);
    const subtotal = useCartStore((state) => state.subtotal);
    const tax = useCartStore((state) => state.tax);
    const total = useCartStore((state) => state.total);


    useEffect(() => {
        setLoaded(true);
    });

    if (!loaded) {
        return <div className='flex justify-center items-center text-blue-500'> Loading... </div>
    }

    return (
        <div className="grid grid-cols-2">
            <span>No. Productos</span>
            <span className="text-right">{itemsInCart} artículos</span>

            <span>Subtotal</span>
            <span className="text-right">{currencyFormat(subtotal)}</span>

            <span>Impuestos (15%)</span>
            <span className="text-right">$ {tax}</span>

            <span className="mt-5 text-2xl">Total:</span>
            <span className="mt-5 text-2xl text-right">{currencyFormat(total)}</span>
        </div>
    )
}
