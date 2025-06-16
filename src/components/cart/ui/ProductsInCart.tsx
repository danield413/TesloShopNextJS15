'use client'

import { QuantitySelector } from '@/components'
import { useCartStore } from '@/store'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export const ProductsInCart = () => {

    const productsInCart = useCartStore((state) => state.cart);
    const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
    const removeProductFromCart = useCartStore((state) => state.removeProductFromCart);

    const [loaded, setLoaded] = useState(false);
    console.log('ProductsInCart', productsInCart);
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
                        <Link className='hover:underline cursor-pointer font-bold' href={`/products/${product.slug}}`}>{product.title}</Link>
                        <p>$ {product.price}</p>
                        <div className='bg-blue-300 mt-1 text-center rounded py-2 mb-3 max-w-20'>Talla {product.size}</div>
                        <QuantitySelector
                            quantity={product.quantity}
                            onQuantityChange={ quantity => {updateProductQuantity(product, quantity)} }
                        />

                        <button className="underline mt-3"
                                onClick={() => removeProductFromCart(product)}
                        >Remover</button>
                    </div>
                </div>
            ))}
        </>
    )
}
