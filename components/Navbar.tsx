import React, { useContext } from "react";
import {
  HomeIcon,
  ShoppingCartIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { AuthContext } from "../context/AuthContext";
import { AuthContextType } from "../types/AuthContextType";
import { useRouter } from "next/router";
import { CartContext } from "../context/CartContext";
import { CartContextType } from "../types/CartContextType";
import Link from "next/link";

export const Navbar = () => {
  const { currentUser, setCurrentUser } =
    useContext<AuthContextType>(AuthContext);
    const {cartItems}=useContext<CartContextType>(CartContext);
    const router=useRouter();

  const handleSidebar = () => {
    let cardModal = document.querySelector(".card-modal");
    let cardModalContent = document.querySelector(".card-modal-content");

    cardModal?.classList.add("active");
    cardModalContent?.classList.add("active");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("token");
  };


const toggleNavbar=()=>{
const links=document.querySelector('.links')
links?.classList.toggle('hidden')
}




  return (   
    <nav className=" bg-white border-[1px] border-[#dbdbdb] ">
      <div className="max-w-[1124px] m-auto p-3 py-6 flex items-center justify-between flex-wrap">
        <Link href='/products' className="font-bold text-3xl" >
          ShoeStore
        </Link >
        <Bars3Icon onClick={toggleNavbar} className="w-11 h-11 cursor-pointer md:hidden" />
        <ul className="hidden flex-col md:flex-row links md:flex items-center gap-x-8  w-full md:w-fit links transition-all">
          <li className="mt-6 md:mt-0">
            <Link
              className={`flex items-center text-2xl gap-x-2 font-semibold text-[${router.asPath==='/products'?'black':"#71717A"}] transition-all `}
              href="/products"
            >
              <HomeIcon className="w-8 h-8" />
              Home
            </Link>
          </li>
        {currentUser&&
        <>
          <li className="mt-6 md:mt-0">
            <Link
              className={`text-[${router.asPath==='/wishlist'?'black':"#71717A"}]  flex items-center text-2xl gap-x-2 font-semibold`}
              href="/wishlist"
            >
              <HeartIcon className="w-8 h-8" />
              Wishlist
            </Link>
          </li>
          <li className="relative mt-6 md:mt-0 w-fit" onClick={handleSidebar}>
            <a
              className="text-[#71717A] flex items-center text-2xl gap-x-2 font-semibold"
              href="#!"
            >
              <ShoppingCartIcon className="w-8 h-8" />
              Cart
            </a>
            {cartItems.length>0&&
            <span className="absolute -top-4 -right-3 bg-red-400 text-lg rounded-full w-[20px] h-[20px] text-white grid place-items-center">{cartItems.length}</span>
            }
          </li>
        </>
        }
          <li className="mt-6 md:mt-0"> 
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="bg-[#001134] text-white text-semibold  text-2xl px-10 py-3 rounded-md"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={()=>router.push('/login')}
                className="bg-[#001134] text-white text-semibold  text-2xl px-10 py-3 rounded-md"
              >
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};
