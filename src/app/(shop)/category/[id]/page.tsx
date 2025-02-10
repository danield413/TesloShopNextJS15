import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: Category;
  };
}

const seedProducts = initialData.products;

export default function CategoryIDPage({ params }: Props) {
  const { id } = params;

  const products = seedProducts.filter((product) => product.gender === id);

  const labels: Record<Category, string> = {
    men: 'para hombres',
    women: 'para mujeres',
    kid: 'para niños',
    unisex: 'Para todos',
  }

  // if (id === 'kids') {
  //   notFound();
  // }

  return (
    <>
      <Title title={`Articulos ${ labels[id] }`} subtitle="Todos los productos" className="mb-2" />

      <ProductGrid products={ products } />
    </>
  );
}
