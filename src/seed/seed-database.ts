import { initialData } from "./seed";
import prisma from "../lib/prisma";

import { countries } from "./seed-countries";

async function main() {
  //Delete existing data
  await prisma.userAddress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.country.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  /* await Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]); */

  const { categories, products, users } = initialData;

  //Seed users
  await prisma.user.createMany({
    data: users,
  });

  //Seed countries
  await prisma.country.createMany({
    data: countries,
  });
  //Seed categories
  const categoriesData = categories.map((name) => ({ name }));

  await prisma.category.createMany({
    data: categoriesData,
  });

  //Seed products
  const categoriesDB = await prisma.category.findMany();
  const categoriesMap = categoriesDB.reduce(
    (map: { [x: string]: any }, category: { name: string; id: any }) => {
      map[category.name.toLowerCase()] = category.id;

      return map;
    },
    {} as Record<string, string>
  ); //<string=label, string=id>

  products.forEach(async (productc) => {
    const { images, type, ...rest } = productc;
    //Category

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type],
      },
    });

    //Images
    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }));

    await prisma.productImage.createMany({
      data: imagesData,
    });
  });

  console.log("Seeding complete!");
}

(() => {
  main();
})();
