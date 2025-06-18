import { auth } from "@/auth.config";
import { Footer, Sidebar, TopMenu } from "@/components";

export default async function ShopLayout({ children }: { children: React.ReactNode }) {

  const session = await auth();

  console.log({lyt: session})



  return (
    <div className="min-h-screen">

      <TopMenu />

      <Sidebar userSession={session!} />

      <div className="px-0 sm:px-10">
      { children }
      </div>

      <Footer />
    </div>
  );
}
