import Image from "next/image";
import React, { useContext } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Product } from "../types/Product";
import { CartContext } from "../context/CartContext";
import { CartContextType } from "../types/CartContextType";
import { motion } from "framer-motion";
import { children_variant } from "../helpers/framer-motion";

type Props = {
  item: Product;
};




export const WishListItem = ({ item }: Props) => {
  const { handleRemoveFromWishlist } = useContext<CartContextType>(CartContext);
  return (
    <motion.div variants={children_variant} className="cursor-pointer group relative card border-[1px] border-[#dbdbdb] rounded-[12px] overflow-hidden bg-white">
      <Image
        src={item.image}
        width={600}
        height={200}
        alt="product"
        className="w-full md:w-[32rem] h-[20rem] object-cover"
        loading="lazy"
      />
      <div className="card-body p-9 ">
        <p className="font-[600] text-[1.4rem] text-[#71717A] ">{item.name}</p>
        <div className="flex items-center gap-x-3 my-6"></div>
        <p className="mt-3 font-bold text-[1.6rem] ">${item.price}</p>
      </div>
      <button
        onClick={() => handleRemoveFromWishlist(item.name)}
        className="absolute bottom-[-100%] group-hover:bottom-0 bg-[#001134] w-full text-[1.5rem] font-semibold text-white p-5 z-10 transition-all  flex items-center justify-center gap-x-4"
      >
        <TrashIcon className="w-8 h-8" />
        Remove
      </button>
    </motion.div>
  );
};
