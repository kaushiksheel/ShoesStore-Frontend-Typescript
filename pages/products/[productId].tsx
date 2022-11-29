import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useContext } from "react";
import { getProductById, getProducts } from "../../api/request";
import { CartContext } from "../../context/CartContext";
import { CartContextType } from "../../types/CartContextType";
import { Product } from "../../types/Product";

type Props = {
  data: Product;
};

const Product = ({ data }: Props) => {
  const {handleAddCart}=useContext<CartContextType>(CartContext)
  const router = useRouter();

  return (
    <>
      <div className="max-w-[1124px] m-auto p-3">
        <div className="container grid grid-cols-1 md:grid-cols-3 items-center md:mt-[10%]">
          <Image
            src={data?.image}
            className="m-auto md:m-0"
            width={300}
            height={300}
            alt={data?.name}
          />
          <div className="info col-span-2 mt-8 md:mt-0 ">
            <h3 className="text-3xl md:text-5xl font-bold text-center md:text-left md:max-w-[80%]" style={{lineHeight:1.4}}>
            {data?.name}
            </h3>
            <p className="text-2xl md:text-2xl font-medium leading-[23px] text-center md:text-left mt-5     md:leading-[27px] md:max-w-[80%]">
            {data?.description}
            </p>
            <p className="font-bold text-5xl bg-[#FAFAFA] w-fit  p-4 mt-5 md:mt-5 m-auto md:m-0">
              ${data?.price}
            </p>
            <div className="flex flex-col md:flex-row gap-x-5 md:gap-y-6 mt-5 items-center ">
              <button onClick={()=>handleAddCart(data)} className=" w-fit bg-[#18181B] text-white text-2xl text-center py-8 font-bold rounded-lg hover:bg-[#282828] px-11">
                Add to cart
              </button>
             
            </div>
          </div>
        </div>
      </div>
      <div
        onClick={() => router.push("/products")}
        className="cursor-pointer absolute top-5 right-5 flex items-center text-3xl gap-x-5 bg-gray-200 px-6 py-3 rounded-lg"
      >
        <ArrowLeftIcon className="w-8 h-8" /> Back
      </div>
    </>
  );
};
export default Product;

export const getStaticPaths = async () => {
  const { data } = await getProducts();

  const paths = data.map((item: Product) => {
    return {
      params: { productId: item.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const id = context.params.productId;
  const { data } = await getProductById(id);
  return {
    props: {
      data
    },
  };
};
