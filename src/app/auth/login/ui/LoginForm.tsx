'use client';

import { authenticate } from "@/actions";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { IoInformationOutline } from "react-icons/io5";


export const LoginForm = () => {

    const [state, dispatch] = useActionState(authenticate, undefined);
    const router = useRouter();

    useEffect(() => {

        if (state === "Success") {
            // router.replace("/");
            window.location.replace("/"); // <-- Do refresh
        } 
        
    }, [state]);

    return (
        <form action={dispatch} className="flex flex-col">

            <label htmlFor="email">Correo electrónico</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="email" name="email" />


            <label htmlFor="email">Contraseña</label>
            <input
                className="px-5 py-2 border bg-gray-200 rounded mb-5"
                type="password" name="password" />

            <div className="flex h-8 items-end space-x-1" >
                {state === "CredentialsSignin" && (
                    <div className="mb-2">
                        <p className="text-red-500"><IoInformationOutline className="w-5 h-5 text-red-500" />
                        Credenciales inválidas</p>

                    </div>

                )}

            </div>

            <LoginButton />

            {/* divider */}


            {/* divisor l ine */}
            <div className="flex items-center my-5">
                <div className="flex-1 border-t border-gray-500"></div>
                <div className="px-2 text-gray-800">O</div>
                <div className="flex-1 border-t border-gray-500"></div>
            </div>

            <Link
                href="/auth/new-account"
                className="btn-secondary text-center">
                Crear una nueva cuenta
            </Link>

        </form>
    )
}


function LoginButton() {
    const {pending} = useFormStatus();

    return (
        <button type="submit" className={
            clsx({
                'btn-primary': !pending,
                'btn-disabled': pending,
            })
        }
        disabled={pending}
        >
            Ingresar
        </button>
    )
}