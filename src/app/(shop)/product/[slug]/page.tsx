export const revalidate = 604800; // 7 days

import { getProductBySlug } from "@/actions";
import { MobileSlideshow, QuantitySelector, SizeSelector, SlideShow, StockLabel } from "@/components";
import { titleFont } from "@/config/fonts";
import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

interface Props {
  params: {
    slug: string;
  }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;
 
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product not found",
      description: "The product you are looking for does not exist.",
    };
  }
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: product.title ?? "Product not found",
    description: product.description ?? "No description available",
    openGraph: {
      title: product.title ?? "Product not found",
      images: [`/products/${product.images[1]}`],
      description: product.description ?? "No description available",
    },
  }

}

export default async function ProductSlugPage({ params }: Props) {
  
  const { slug } = params;

  const product = await getProductBySlug(slug);
  console.log(product)

  if ( !product ) {
    notFound();
  }
  
  return (
    <div
      className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3"
    >

      {/* SlideShow */}
      <div className="col-span-1 md:col-span-2">
        {/* Desktop slideshow */}
        <SlideShow images={product.images} title={product.title} clase="hidden md:block" />

        {/* Mobile slideshow */}
        <MobileSlideshow images={product.images} title={product.title} className="block md:hidden"/>
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5">

          <h1 className={` ${titleFont.className} antialiased font-bold text-xl`}>
            {product.title}
          </h1>

         <StockLabel slug={product.slug} />

          <p className="text-lg mb-5">${ product.price }</p>

          {/* Selector de tallas */}
          <SizeSelector 
            selectedSize={ product.sizes[0] } 
            availableSizes={ product.sizes }
          />

          {/* Selector de cantidad */}
          <QuantitySelector quantity={1}/>

          {/* Button */}

          <button className="btn-primary my-5">Agregar al carrito</button>

          {/* Descripcion */}

          <h3 className="font-bold text-sm">Descripción</h3>
          <p className="font-light">
            { product.description }
          </p>

      </div>

    </div>
  );
}