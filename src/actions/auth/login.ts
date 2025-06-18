'use server';
 
import { signIn } from '@/auth.config';
import { sleep } from '@/utils';
import { AuthError } from 'next-auth';
 
// ...
 
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {

    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    return 'Success';


  } catch (error) {
    
      return 'CredentialsSignin';

  }
}


export const login = async (email: string, password: string) => {
  
  try {

    await signIn('credentials', { email, password, redirect: false });

    return { ok: true, message: "Usuario autenticado correctamente" };

  } catch (error) {
    return { ok: false, message: "Error al autenticar el usuario" };
  }

}