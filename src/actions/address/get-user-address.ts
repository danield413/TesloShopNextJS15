"use server";

import prisma from "@/lib/prisma";

export const getUserAddress = async (userId: string) => {
    try {
        // Fetch the user's address from the database
        const userAddress = await prisma.userAddress.findUnique({
            where: {
                userId,
            },
        });

        if (!userAddress) return null;

        console.log("User Address:", userAddress);
        const { countryId, id, ...rest } = userAddress;

        return {
            ...rest,
            country: countryId,
        };

    } catch (error) {
        console.error("Error fetching user address:", error);
        return {
            ok: false,
            message: "Failed to fetch user address",
        };
    }
};
