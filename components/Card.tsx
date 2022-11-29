import Image from "next/image";
import React, { useContext } from "react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import { StarIcon } from "@heroicons/react/24/solid";
import { Product } from "../types/Product";
import Link from "next/link";
import { CartContext } from "../context/CartContext";
import { CartContextType } from "../types/CartContextType";
import { AuthContext } from "../context/AuthContext";
import { AuthContextType } from "../types/AuthContextType";
import { toast, Toaster } from "react-hot-toast";

type Props = {
  item: Product;
};

export const Card = ({ item }: Props) => {
  const { currentUser } = useContext<AuthContextType>(AuthContext);
  const { handleAddCart, handleWishtList, wishListItems } =
    useContext<CartContextType>(CartContext);

  const isAdded = wishListItems.findIndex((w) => w.name === item.name);

  return (
    <>
      <div className="cursor-pointer group relative card border-[1px] border-[#dbdbdb] rounded-[12px] overflow-hidden bg-white">
        <Image
          src={item.image}
          width={600}
          height={200}
          alt="product"
          className="w-full md:w-[32rem] h-[20rem] object-cover"
          loading="lazy"
        />
        <div className="card-body p-9 ">
          <Link
            href={"/products/" + item.id}
            className="font-[600] text-[1.4rem] text-[#71717A] hover:underline"
          >
            {item.name}
          </Link>
          <div className="flex items-center gap-x-3 my-6">
            <div className="flex items-center gap-x-2">
              {[...Array(5)].map((item, index) => (
                <StarIcon key={index} color="#FBBF24" className="w-6 h-6" />
              ))}
            </div>
            <p className="text-[#6B81A1] text-2xl font-semibold">
              ({item.rating.count})
            </p>
          </div>
          <p className="mt-3 font-bold text-[1.6rem] ">${item.price}</p>
        </div>
        <button
          onClick={() => handleAddCart(item)}
          className="absolute bottom-[-100%] group-hover:bottom-0 bg-[#001134] w-full text-[1.5rem] font-semibold text-white p-5 z-10 transition-all  flex items-center justify-center gap-x-4"
        >
          <ShoppingBagIcon className="w-8 h-8" />
          Add to cart
        </button>
      {currentUser&&
        <HeartIcon
        color={isAdded === -1 ? "black" : "red"}
        onClick={() =>  handleWishtList(item) }
        className="heart-icon w-8 h-8 absolute top-4 right-4 cursor-pointer"
      />}
      </div>
    
    </>
  );
};
