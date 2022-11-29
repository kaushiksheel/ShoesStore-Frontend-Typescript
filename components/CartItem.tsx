import { TrashIcon } from "@heroicons/react/24/outline";
import { PlusCircleIcon, MinusCircleIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { CartContextType } from "../types/CartContextType";
import { Product } from "../types/Product";

const IMAGE_LINK =
  "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1050,h_1050/global/372981/01/sv01/fnd/IND/fmt/png/Puma-Perforated-Low-Men's--IDP-Shoes";

type Props = {
  item: Product;
};

export const CartItem = ({ item }: Props) => {
  const {
    handleRemoveCart,
    handleItemQuantityIncrement,
    handleItemQuantityDecrement,
  } = useContext<CartContextType>(CartContext);
  return (
    <div className="body mt-10">
      <div className="item flex items-center">
        <div className="left flex items-center gap-x-4 flex-1">
          <Image
            src={item.image}
            width={150}
            height={150}
            alt="product"
            className="object-contain h-[9rem] w-[9rem]"
          />
          <div className="info max-w-[50%] ">
            <p className="text-2xl font-semibold  ">{item.name}</p>
            <p className="text-[#7D7D85] text-[1.5rem]  mt-3 font-[500]">
              Qty: {item.quantity}
            </p>
            <div className="flex items-center gap-x-3 mt-2">
              <PlusCircleIcon
                onClick={() => handleItemQuantityIncrement(item.name)}
                color="#18181B"
                className="w-9 h-9 cursor-pointer"
              />
              <MinusCircleIcon
                onClick={() => handleItemQuantityDecrement(item.name)}
                color="#18181B"
                className="w-9 h-9 cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="right ">
          <p className="text-2xl font-semibold">
            ${parseInt(item.price)*item.quantity }.00
          </p>
          <TrashIcon
            onClick={() => handleRemoveCart(item.name)}
            color="#7D7D85"
            className="w-8 h-8 mt-[2.6rem] cursor-pointer hover:text-black"
          />
        </div>
      </div>
    </div>
  );
};
