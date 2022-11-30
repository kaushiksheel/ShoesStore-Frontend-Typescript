import React, { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { CartModal } from "../../components/CartModal";
import { Navbar } from "../../components/Navbar";
import { WishListItem } from "../../components/WishListItem";
import { CartContext } from "../../context/CartContext";
import { CartContextType } from "../../types/CartContextType";
import { motion } from "framer-motion";
import { container_variant } from "../../helpers/framer-motion";
import { AuthContext } from "../../context/AuthContext";
import { AuthContextType } from "../../types/AuthContextType";


function Wishlist() {
  const {currentUser}=useContext<AuthContextType>(AuthContext)
  const { wishListItems } = useContext<CartContextType>(CartContext);


 
  return (
    <>
      <header className="sticky top-0 h-fit z-20">
        <Navbar />
      </header>
      <main>
        <section className="max-w-[1124px] m-auto p-3">
          <motion.div
            variants={container_variant}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-7"
          >
            {wishListItems?.map((item) => (
              <WishListItem key={item.id} item={item} />
            ))}
          </motion.div>
        </section>
      </main>
      <CartModal />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 1500,
          style: {
            fontSize: 14,
          },
        }}
      />
    </>
  );
}

export default Wishlist;


