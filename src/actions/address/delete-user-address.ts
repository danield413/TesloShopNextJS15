"use server";

import { Address } from "@/interfaces";
import prisma from "@/lib/prisma";

export const deleteUserAddress = async (userId: string) => {
  try {
    // Check if the address exists for the user
    const storedAddress = await prisma.userAddress.findUnique({
      where: {
        userId,
      },
    });

    if (storedAddress) {
      await prisma.userAddress.delete({
        where: {
          userId,
        },
      });
    }

    return {
      ok: true,
      message: "User address deleted successfully",
    };
   
  } catch (error) {
    console.error("Error deleting user address:", error);
    return {
      ok: false,
      message: "Failed to delete user address",
    };
  }
};
