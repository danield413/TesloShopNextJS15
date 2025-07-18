"use server";

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const setUserAddress = async (address: Address, userId: string) => {
    try {

        const newAddress = await createOrReplaceAddress(address, userId);

        return {
            ok: true,
            message: "User address set successfully",
            address: newAddress,
        }

    } catch (error) {
        console.error("Error setting user address:", error);
        return {
            ok: false,
            message: "Failed to set user address",
        };
    }
};

const createOrReplaceAddress = async (address: Address, userId: string) => {
    try {
        // Check if the address already exists for the user
        const storedAddress = await prisma.userAddress.findUnique({
            where: {
                userId,
            },
        });

        const addressToSave = {
            userId,
            address: address.address,
            address2: address.address2,
            countryId: address.country,
            firstName: address.firstName,
            lastName: address.lastName,
            postalCode: address.postalCode,
            phone: address.phone,
            city: address.city,
        };

        if (!storedAddress) {
            // If the address does not exist, create a new one
            const newAddress = await prisma.userAddress.create({
                data: addressToSave,
            });

            return newAddress;
        }

        const updatedAddress = await prisma.userAddress.update({
            where: {
                userId,
            },
            data: addressToSave,
        });
        
        return updatedAddress;


    } catch (error) {
        console.error("Error creating or replacing address:", error);
        throw new Error("Failed to create or replace address");
    }
};
