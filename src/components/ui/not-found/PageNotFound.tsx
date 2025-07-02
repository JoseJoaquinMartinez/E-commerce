import Link from "next/link";
import { titleFont } from "@/config/fonts";
import { ProductImage } from "@/components/product/product-image/ProductImage";

export const PageNotFound = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-[800] w-full justify-center items-center align-middle">
      <div className="text-center px-5 m-x5">
        <h2 className={`${titleFont.className} antialiased text-9xl`}>404</h2>
        <p className="font-semibold text-xl">Woops! Lo sentimos mucho.</p>
        <p className="font-light">
          <span>Puedes regresar al </span>
          <Link
            href={"/"}
            className="font-normal hover:underline transition-all"
          >
            Inicio
          </Link>
        </p>
      </div>
      <div className="px-5 mx-5">
        <ProductImage
          src="/imgs/starman_750x750.png"
          alt="Starman"
          className="p-5 sm:p-0"
          width={550}
          height={550}
        />
      </div>
    </div>
  );
};
