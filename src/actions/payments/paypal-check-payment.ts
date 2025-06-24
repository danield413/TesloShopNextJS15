"use server";
import { PaypalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (paypalTransactionId: string) => {
    // console.log(
    //     "Checking PayPal payment with transaction ID:",
    //     paypalTransactionId
    // );

    const authToken = await getPaypalBearerToken();

    console.log("Auth Token:", authToken);

    if (!authToken) {
        return {
            ok: false,
            message: "No se pudo obtener el token de autenticación de PayPal",
        }
    }

    const paypalResponse = await verifyPaypalPayment( paypalTransactionId, authToken );

    if (!paypalResponse) {
        return {
            ok: false,
            message: "No se pudo verificar el pago de PayPal",
        }
    }

    // Success response from PayPal
    const { status, purchase_units } = paypalResponse;
    const { invoice_id: orderId } = purchase_units[0]; 

    if (status !== 'COMPLETED') {
        return {
            ok: false,
            message: `El pago de PayPal no está completo. Estado: ${status}`,
        }
    }
    
    // Update the order status
    try {
        console.log({status, purchase_units});

        await prisma.order.update({
            where: {
                id: orderId,
            },
            data: {
                isPaid: true,
                paidAt: new Date(),
            }
        });

        // Revalidate the path
        revalidatePath(`/orders/${ orderId }`);

        return {
            ok: true,
            message: 'Pago de PayPal verificado y estado del pedido actualizado correctamente',
        }
        
    } catch (error) {
        console.error("Error updating order status:", error);
        return {
            ok: false,
            message: "Error al actualizar el estado del pedido",
        }
    }

};

const verifyPaypalPayment = async (paypalTransactionId: string, bearerToken: string): Promise<PaypalOrderStatusResponse | null> => {
    const options = {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${bearerToken}`,
        },
    };

    const paypalOrdersURL = `${ process.env.PAYPAL_ORDERS_URL }/${ paypalTransactionId }`;

    try {

        const response = await fetch(paypalOrdersURL, {
            ...options,
            cache: 'no-store'
        })
        const result = await response.json();

        return result;

    } catch (error) {
        console.error("Error verifying PayPal payment:", error);
        return null;
    }
         
}

const getPaypalBearerToken = async (): Promise<string | null> => {

    const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
    const oauth2Url = process.env.PAYPAL_OAUTH_URL ?? '';

    const base64Token = Buffer.from(
        `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
        "utf-8"
    ).toString("base64");

    const options = {
        method: "POST",
        headers: {
            Authorization:
                `Basic ${base64Token}`,
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ grant_type: "client_credentials" }),
    };

    try {

        const response = await fetch(oauth2Url, {
            ...options,
            cache: 'no-store'
        })
        const result = await response.json();

        return result.access_token;

    } catch (error) {
        console.log(error)
        return null;
    }

};
