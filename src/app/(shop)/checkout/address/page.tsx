import { Title } from '@/components';
import { AddressForm } from './ui/AddressForm';
import { getCountries } from '@/actions';
import { auth } from '@/auth.config';
import { getUserAddress } from '@/actions/address/get-user-address';

export default async function NamePage() {

  const countries = await getCountries();

  const session = await auth();

  if (!session) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">Acceso denegado</h1>
        <p className="mt-4">Por favor, inicia sesión para continuar.</p>
      </div>
    )
  }

  const userAddress = await getUserAddress(session.user.id);

  console.log("User Address p:", userAddress);

  return (
    <div className="flex flex-col sm:justify-center sm:items-center mb-72 px-10 sm:px-0">

      <div className="w-full  xl:w-[1000px] flex flex-col justify-center text-left">

        <Title title="Dirección" subtitle="Dirección de entrega" />

        <AddressForm countries={countries} userStoredAddress={userAddress} />

      </div>




    </div>
  );
}