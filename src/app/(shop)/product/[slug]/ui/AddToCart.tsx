'use client'

import { QuantitySelector, SizeSelector } from "@/components";
import { CartProduct, Product } from "@/interfaces";
import { useCartStore } from "@/store";
import { Size } from "@prisma/client";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface Props {
    product: Product;
}

export const AddToCart = ({ product }: Props) => {

    const addProductToCart = useCartStore( state => state.addProductToCart );

    const [size, setSize] = useState<Size | undefined>();
    const [quantity, setQuantity] = useState<number>(1);

    console.log(quantity)

    const addToCart = () => {

        if (!size) {
            return toast.error("You must select a size before adding to the cart.");
        }

        if (quantity < 1) {
            return toast.error("You must select a quantity greater than 0.");
        }
        
        // Create the cart product
        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity,
            size,
            image: product.images[0] // Assuming the first image is the main image
        }

        addProductToCart(cartProduct);
        toast.success("Product added to cart.");

        // Reset the size and quantity after adding to cart
        setQuantity(1);
        setSize(undefined);
    }

    return (
        <>

            <div><Toaster/></div>

            {/* Selector de tallas */}
            <SizeSelector
                selectedSize={size}
                availableSizes={product.sizes}
                onSizeChange={setSize}
            />

            {/* Selector de cantidad */}
            <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

            {/* Button */}
            <button className="btn-primary my-5" onClick={addToCart}>Agregar al carrito</button>
        </>
    );
};
