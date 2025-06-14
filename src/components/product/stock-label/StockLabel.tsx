'use client';

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import { useEffect, useState } from "react";

interface Props {
    slug: string;
}

export const StockLabel = ({ slug }: Props) => {

  const [stock, setStock] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
      getStock()
  }, []);

  const getStock = async () => {
    const inStock = await getStockBySlug(slug);
    setStock(inStock);
    setLoading(false);
  }

  return (
    <>
   
    
    {
        loading ? (
            <h1 className={` ${titleFont.className} antialiased font-bold text-md rounded text-center animate-pulse text-gray-400 bg-gray-200`}>
            Cargando stock...
            </h1>
        ) :
        (
             <h1 className={` ${titleFont.className} antialiased font-bold text-xl`}>
            Stock: {stock}
            </h1>
        )
    }

    
    </>
  );
};
