
import { Product } from '@/interfaces';
import React from 'react'
import { ProductItem } from './ProductItem';

interface Props {
    products: Product[];
}

export const ProductGrid = ({ products }: Props) => {
  return (
    <div
        className='grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10'
    >

        {
            products.map((product) => (
                <ProductItem key={product.slug} product={product} />
            ))
        }

    </div>
  )
}
