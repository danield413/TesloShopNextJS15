'use server';

import prisma from "@/lib/prisma";
import bcryptjs from 'bcryptjs';


export const registerUser = async ( name: string, email: string, password: string ) => {

    try {
        
        const user = await prisma.user.create({
            data: {
                name,
                email: email.toLowerCase(),
                password: bcryptjs.hashSync(password), // Asegúrate de que la contraseña esté hasheada antes de guardarla
            },
            select: {
                id: true,
                name: true,
                email: true,
            }
        })

        return { ok: true, user, message: "Usuario registrado correctamente" };

    } catch (error) {
        console.error("Error registering user:", error);
        return { ok: false, message: "Error al registrar el usuario" };
    }

}   