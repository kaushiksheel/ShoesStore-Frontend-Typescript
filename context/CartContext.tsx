import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  addToCart,
  addToWishlist,
  getCartItems,
  getWishlistItems,
  removeCartItems,
  removeFromWishlist,
} from "../api/request";
import { CartContextType } from "../types/CartContextType";
import { Product } from "../types/Product";
import { toast } from "react-hot-toast";
import { AuthContext } from "./AuthContext";
import { AuthContextType } from "../types/AuthContextType";

export const CartContext = createContext({} as CartContextType);

type CartContextProvider = {
  children: ReactNode;
};

export const CartContextProvider = ({ children }: CartContextProvider) => {
  const { currentUser } = useContext<AuthContextType>(AuthContext);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [wishListItems, setWishListItems] = useState<Product[]>([]);

  const handleAddCart = async (product: Product) => {
    if (cartItems.includes(product)) return toast.error("item already added");
    if (!currentUser) return toast.error("login required");
    const { name, image, description, price, quantity } = product;
    const desc = description;
    try {
      await addToCart(name, image, desc, price, quantity);
    } catch (error) {
      console.log(error);
    }
    setCartItems((cartItems) => [...cartItems, product]);
  };

  const fetchCartItems = async () => {
    try {
      const { data } = await getCartItems();
      setCartItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleRemoveCart = async (itemName: string) => {
    try {
      await removeCartItems(itemName);
    } catch (error) {
      console.log(error);
    }
    const removedCartItem = cartItems.filter((item) => item.name !== itemName);

    setCartItems(removedCartItem);
  };

  const handleItemQuantityIncrement =  (itemName: string) => {
  
    setCartItems((cartItems) =>
      cartItems.map((item) =>
        item.name === itemName
          ? { ...item, quantity: item.quantity + (item.quantity < 5 ? 1 : 0) }
          : { ...item }
      )
    );
  };
  const handleItemQuantityDecrement = (itemName: string) => {
    setCartItems((cartItems) =>
      cartItems.map((item) =>
        item.name === itemName
          ? { ...item, quantity: item.quantity - (item.quantity > 1 ? 1 : 0) }
          : { ...item }
      )
    );
  };

  const handleAddToWishlist = async (item: Product) => {
    const { name, image, description, price,rating } = item;
    if (wishListItems.includes(item)) return alert("item already added");
    try {
      await addToWishlist(name, image, description, price,rating.count);
    } catch (error) {
      console.log(error);
    }

    setWishListItems((wishListItems) => [...wishListItems, item]);
  };

  const handleRemoveFromWishlist = async(itemName: string) => {

    try {
      await removeFromWishlist(itemName);
    } catch (error) {
      console.log(error);
    }
    const removeItem = wishListItems.filter((item) => item.name !== itemName);
    setWishListItems(removeItem);
  };

  const handleWishtList = (item: Product) => {
    const isAdded = wishListItems.findIndex((w) => w.name === item.name);
    if (isAdded === -1) {
      toast.success("added to wishlist");
      handleAddToWishlist(item);
    } else {
      handleRemoveFromWishlist(item.name);
      toast.error("removed from wishlist");
    }
  };


  const fetchWishListItems = async () => {
    try {
      const { data } = await getWishlistItems();
      setWishListItems(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    fetchWishListItems()
  },[])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        handleAddCart,
        handleRemoveCart,
        handleItemQuantityIncrement,
        handleItemQuantityDecrement,
        wishListItems,
        setWishListItems,
        handleRemoveFromWishlist,
        handleWishtList,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
