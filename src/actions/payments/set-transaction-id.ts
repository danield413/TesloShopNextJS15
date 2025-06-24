'use server';

import prisma from "@/lib/prisma";

export const setTransactionId = async (orderId: string, transactionId: string) => {

    try {
        const response = await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                transactionId: transactionId,
            }
        });
    
        if (!response) {
            return {
                ok: false,
                message: 'No se encontró la orden con el ID proporcionado',
            };
        }

        return {
            ok: true,
            message: 'Orden actualizada correctamente con el ID de transacción',
        };
    
    } catch (error) {
        return {
            ok: false,
            message: 'Orden actualizada correctamente con el ID de transacción',
        };
        
    }

}

