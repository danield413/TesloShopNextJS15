import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { redirect } from "next/navigation";

export const revalidate =  60; // Revalidate every 60 seconds

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function Home({ searchParams }: Props ) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;

  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });

  if ( products.length === 0 ) {
    redirect('/');
  }

  // console.log(products)

  return (
    <>
      <Title 
        title="Tienda" 
        subtitle="Todos los productos"
        className="mb-2"
      />

      <ProductGrid products={products} />

      <Pagination totalPages={totalPages}/>

    </>
  );
}
