import React, { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { getProducts } from "../../api/request";
import { Card } from "../../components/Card";
import { CartModal } from "../../components/CartModal";
import { Navbar } from "../../components/Navbar";
import { WishListItem } from "../../components/WishListItem";
import { CartContext } from "../../context/CartContext";
import { CartContextType } from "../../types/CartContextType";
import { Product } from "../../types/Product";


function Wishlist() {
  const {wishListItems}=useContext<CartContextType>(CartContext)


  return (
    <>
      <header className="sticky top-0 h-fit z-20">
        <Navbar />
      </header>
      <main>
        <section className="max-w-[1124px] m-auto p-3">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {wishListItems?.map(item=>
            <WishListItem key={item.id} item={item}/>
              )}
          </div>
        </section>
      </main>
      <CartModal/>
      <Toaster
      position="top-right"
      toastOptions={{
        duration:1500,
        style:{
          fontSize:14
        }
      }}
      />
    </>
  );
}

export default Wishlist;



// get-wishlist-item

