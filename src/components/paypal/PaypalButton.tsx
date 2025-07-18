'use client';

import { paypalCheckPayment, setTransactionId } from '@/actions';
import { CreateOrderActions, CreateOrderData, OnApproveActions, OnApproveData } from '@paypal/paypal-js';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

interface Props {
    orderId: string; // This is the order ID generated by your server
    amount: number; 
}

export const PaypalButton = ({ orderId, amount }: Props) => {

    const [{ isPending }] = usePayPalScriptReducer();

    const roundedAmount = Math.round( amount * 100 ) / 100;
        

    if ( isPending ) {
        return (
            <div className="animate-pulse">
                <div className="h-11 bg-gray-300 rounded" />
                <div className="h-11 bg-gray-300 rounded mt-2" />
            </div>
        )
    }   

    // Generate the transaction ID (order ID) of paypal
    const createOrder = async(data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {
        const transactionId = await actions.order.create({
            intent: 'CAPTURE',
            // reference_id: '12345',
            purchase_units: [
                {
                    invoice_id: orderId,
                    amount: {
                        currency_code: 'USD',
                        value: `${roundedAmount}`,
                    },
                }
            ],
        })

        // console.log('Transaction ID:', transactionId);

        // Save the transaction ID in database
        const {ok} = await setTransactionId(orderId, transactionId);

        if (!ok) {
            console.error('Error saving transaction ID:', ok);
            throw new Error('Error guardando el ID de transacción');
        }

        return transactionId;
    }
    
    const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {

        const details = await actions.order?.capture();
        if (!details) return;

        await paypalCheckPayment( details.id! );

    }

    return (
        <PayPalButtons 
            createOrder={ createOrder }
            onApprove={ onApprove }
        />
    )
}
