'use server';

import prisma from "@/lib/prisma";
import { sleep } from "@/utils";


export const getStockBySlug = async (slug: string): Promise<number> => {

    try {

        await sleep(3);

        const stock = await prisma.product.findUnique({
            where: {
                slug: slug
            },
            select: {
                inStock: true
            }
        });

        return stock?.inStock ?? 0;

    } catch (error) {
        console.error("Error fetching product stock by slug:", error);
        return 0;
    }

}