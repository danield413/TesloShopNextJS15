'use client'

import { QuantitySelector } from '@/components'
import { useCartStore } from '@/store'
import { currencyFormat } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export const ProductsInCart = () => {

    const productsInCart = useCartStore((state) => state.cart);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) {
        return <div className='flex justify-center items-center text-blue-500'> Loading... </div>
    }

    return (
        <>
            {/* Items */}
            {productsInCart.map((product) => (
                <div key={`${product.slug}-${product.size}`} className="flex mb-5">
                    <Image
                        src={`/products/${product.image}`}
                        width={100}
                        height={100}
                        style={{
                            width: "100px",
                            height: "100px",
                        }}
                        alt={product.title}
                        className="mr-5 rounded"
                    />

                    <div>
                        <span className='font-bold' >{product.title}</span>
                        <p>{ (currencyFormat(product.price * product.quantity)) }</p>
                        <div className='bg-blue-300 mt-1 text-center rounded py-2 mb-3 w-auto px-2'>Talla {product.size} - Cantidad: {product.quantity}</div>
                        
                    </div>
                </div>
            ))}
        </>
    )
}
