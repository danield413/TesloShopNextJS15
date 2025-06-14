'use server';

import prisma from "@/lib/prisma";


export const getProductBySlug = async (slug: string) => {
  
    try {

        const product = await prisma.product.findUnique({
            where: {
                slug: slug
            },
            include: {
                ProductImage: {
                    select: {
                        url: true
                    }
                }
            }
        });

        if (!product)  return null;

        return {
            ...product,
            images: product.ProductImage.map((image) => image.url)
        };

    } catch (error) {
        console.error("Error fetching product by slug:", error);
        return null;
    }

};