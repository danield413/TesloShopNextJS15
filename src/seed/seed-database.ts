import prisma from "../lib/prisma";
import { initialData } from "./seed";
import { countries } from "./seed-countries";

async function main() {
  console.log("Seeding database...");

  //* STEPS TO SEED MY DATABASE
  //*1. Delete all previous data
  await prisma.country.deleteMany();

  await prisma.user.deleteMany();

  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  //*2. Create new data (Initial data)

  const { categories, products, users} = initialData;


  await prisma.user.createMany({
    data: users,
  });

  await prisma.country.createMany({
    data: countries
  });

  //Categories
  const categoriesData = categories.map((category) => ({ name: category }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  const categoriesDB = await prisma.category.findMany();

  // Products
  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;

    return map;
  }, {} as Record<string, string>); // <string=shirt, string=categoryID>

  products.forEach(async (product) => {
    const { type, images, ...rest } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });
}

(() => {
  //? If we are in production, we don't want to seed the database. That's destructive.
  if (process.env.NODE_ENV === "production") return;

  main();
})();
