'use client';

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';

export const PaypalButton = () => {

    const [{ isPending }] = usePayPalScriptReducer();

    if ( isPending ) {
        return (
            <div className="animate-pulse">
                <div className="h-11 bg-gray-300 rounded" />
                <div className="h-11 bg-gray-300 rounded mt-2" />
            </div>
        )
    }

    return (
        <PayPalButtons 
            // createOrder={}
            // onApprove={() => {
            //     // Aquí puedes manejar la aprobación del pago
            // }}
        />
    )
}
