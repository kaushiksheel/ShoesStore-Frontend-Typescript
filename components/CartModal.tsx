import React, { useContext } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { CartItem } from "./CartItem";
import { CartContext } from "../context/CartContext";
import { CartContextType } from "../types/CartContextType";
import Lottie from "react-lottie";
import animationData from "../public/629-empty-box.json";
import { checkout,order } from "../api/request";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";
import { AuthContextType } from "../types/AuthContextType";
import { Product } from "../types/Product";
import {motion} from 'framer-motion'

export const CartModal = () => {
  const router = useRouter();
  const { currentUser } = useContext<AuthContextType>(AuthContext);
  const { cartItems } = useContext<CartContextType>(CartContext);

  const handleSidebar = () => {
    let cartModal = document.getElementById("cartModal");
    let cardModalContent = document.querySelector(".card-modal-content");

    cartModal?.classList.remove("active");
    cardModalContent?.classList.remove("active");
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCheckout = async () => {
   
    const { data } = await checkout(cartItems, currentUser?.email as string);
    if (data) {
      router.push(data.url);
      cartItems?.map(async(item:Product)=>{
          await order(item.name,item.image,parseInt(item.price))
      })
    }
  };





  
  const prices = cartItems.map((item) => parseInt(item.price) * item.quantity);
  const totalPrice = prices.reduce((a, b) => {
    return a + b;
  }, 0);

  return (
    <div
      id="cartModal"
      className="cart-modal  fixed top-0 w-[100vw] h-[100vh] bg-[rgba(0,0,0,.7)] z-50 "
    >
      <div className="card-modal-content  group fixed cart  right-0 bg-white w-[42rem] h-[100vh] p-7 ">
        <div className="header flex items-center justify-between mb-2">
          <p className="text-3xl font-bold">Shopping Cart</p>
          <div
            onClick={handleSidebar}
            className="hover:bg-[#f4f4f4] p-2 rounded-md group-hover:right-[100%]"
          >
            <XMarkIcon className="w-11 h-11 cursor-pointer " />
          </div>
        </div>
        <div className="cartitems  h-[35rem] overflow-y-auto overflow-x-hidden">
          {cartItems.length > 0 ? (
            cartItems?.map((item) => (
              <CartItem key={item.id || item._id} item={item} />
            ))
          ) : (
            <div className="text-center mt-14">
              <Lottie options={defaultOptions} height={200} width={200} />
              <p className="text-2xl font-semibold">Cart Is Empty</p>
            </div>
          )}
        </div>
        <div className="pricing border-t-[#dbdbdb] border-t-[1px]">
          <div className="flex items-center justify-between mt-3">
            <div className="text-2xl font-normal leading-[32px]">
              <p>Sub total</p>
              <p>Total</p>
            </div>
            <div className="leading-[32px] text-2xl ">
              <p>${totalPrice}.00</p>
              <p className="font-bold">${totalPrice}.00</p>
            </div>
          </div>
          <div className="mt-6">
            <motion.button
            whileTap={{ scale: 0.8 }} 
             onClick={handleCheckout}
              className="inline-block w-full bg-[#18181B] text-white text-2xl text-center p-8 font-bold rounded-lg hover:bg-[#282828]"
            disabled={cartItems.length<1}
            >
              Checkout
            </motion.button>
            <motion.button
            whileTap={{ scale: 0.8 }} 
              onClick={handleSidebar}
              className="w-full bg-white text-black text-2xl text-center p-8 font-bold rounded-lg mt-5 border-2 border-[#D4D4D8] hover:bg-[#f3f3f3]"
            >
              Continue Shopping
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};
