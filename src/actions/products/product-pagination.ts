'use server';

import prisma from "@/lib/prisma";
import { Gender } from "@prisma/client";

interface PaginationOptions {
    page?: number;
    take?: number;
    gender?: Gender;
}

export const getPaginatedProductsWithImages = async ({ page = 1, take = 12, gender }: PaginationOptions) => {

    if ( isNaN(page) ) page = 1;
    if ( page < 1) page = 1;

    try {

        // We can use a Promise.all to fetch products and total count in parallel, but here we keep it simple.
        
        // 1. Get the products
        const products = await prisma.product.findMany({
            take: take,
            skip: (page - 1) * take,
            include: {
                ProductImage: {
                    take: 2,
                    select: {
                        url: true
                    }
                }
            },
            where: {
                gender: gender
            }
        });

        // 2. Get the total of pages
        const totalCount = await prisma.product.count({
            where: {
                gender: gender
            }
        });
        const totalPages = Math.ceil(totalCount / take);

        // console.log('products', products);

        return {
            currentPage: page,
            totalPages: totalPages,
            products: products.map(product => ({
                ...product,
                images: product.ProductImage.map(image => image.url)
            }))
        }

    } catch (error) {
        throw new Error('Error fetching products with images');
    }


}