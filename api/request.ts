import axios from "axios";
import { Product } from "../types/Product";

const SHOE_API_ENDPOINT = "https://shoe-product-api-production.up.railway.app";

const BACKEND_BASE_URL = "http://localhost:4000/api";

const login = (email: string, password: string) =>
  axios.post(`${BACKEND_BASE_URL}/login`, { email, password });

const signup = (fullname: string, email: string, password: string) =>
  axios.post(`${BACKEND_BASE_URL}/signup`, { fullname, email, password });

const getProducts = () => axios.get(`${SHOE_API_ENDPOINT}/shoes`);
const getProductById = (id: string) =>
  axios.get(`${SHOE_API_ENDPOINT}/shoes/${id}`);

const getCartItems = () =>
  axios.get(`${BACKEND_BASE_URL}/get-cart-item`, {
    headers: {
      "x-auth-token":
        typeof window !== "undefined" && localStorage.getItem("token"),
    },
  });
const getWishlistItems = () =>
  axios.get(`${BACKEND_BASE_URL}/get-wishlist-item`, {
    headers: {
      "x-auth-token":
        typeof window !== "undefined" && localStorage.getItem("token"),
    },
  });

const addToCart = (
  name: string,
  image: string,
  desc: string,
  price: string,
  quantity: number
) =>
  axios.post(
    `${BACKEND_BASE_URL}/add-to-cart`,
    { name, image, desc, price, quantity },
    {
      headers: {
        "x-auth-token":
          typeof window !== "undefined" && localStorage.getItem("token"),
      },
    }
  );
const addToWishlist = (
  name: string,
  image: string,
  desc: string,
  price: string,
  rating:number
) =>
  axios.post(
    `${BACKEND_BASE_URL}/add-to-wishlist`,
    { name, image, desc, price,rating },
    {
      headers: {
        "x-auth-token":
          typeof window !== "undefined" && localStorage.getItem("token"),
      },
    }
  );
const removeFromWishlist = (
 name:string
) =>
  axios.post(
    `${BACKEND_BASE_URL}/remove-wishlist-item`,
    { name},
    {
      headers: {
        "x-auth-token":
          typeof window !== "undefined" && localStorage.getItem("token"),
      },
    }
  );

const removeCartItems = (itemName: string) =>
  axios.post(
    `${BACKEND_BASE_URL}/remove-cart-item`,
    { itemName },
    {
      headers: {
        "x-auth-token":
          typeof window !== "undefined" && localStorage.getItem("token"),
      },
    }
  );

const increaseCartQuantity = (quantity: number, name: string) =>
  axios.put(
    `${BACKEND_BASE_URL}/increase-cart-quantity`,
    { quantity, name },
    {
      headers: {
        "x-auth-token":
          typeof window !== "undefined" && localStorage.getItem("token"),
      },
    }
  );

const checkout = (items: Product[], email: string) =>
  axios.post(
    `${BACKEND_BASE_URL}/checkout`,
    { email, items },
    {
      headers: {
        "x-auth-token":
          typeof window !== "undefined" && localStorage.getItem("token"),
      },
    }
  );

const order = (name: string, image: string, price: number) =>
  axios.post(
    `${BACKEND_BASE_URL}/order`,
    { name, image, price },
    {
      headers: {
        "x-auth-token":
          typeof window !== "undefined" && localStorage.getItem("token"),
      },
    }
  );

export {
  getProducts,
  getProductById,
  login,
  signup,
  getCartItems,
  removeCartItems,
  addToCart,
  increaseCartQuantity,
  checkout,
  order,
  addToWishlist,
  getWishlistItems,
  removeFromWishlist
};
