// src/components/ui/sidebar/SidebarSession.tsx

import { auth } from "@/auth.config";


export default async function SidebarSession() {
  const session = await auth();
  
    console.log({ session });

  if (session?.user) {
    return <div>Bienvenido, {session.user.name}</div>;
  }
  return <div>Iniciar sesión</div>;
}