import axios from "axios";
import { Product } from "../types/Product";

const SHOE_API_BASE_URL = "https://shoe-product-api-production.up.railway.app";


const BASE_URL = "https://shoestore-backend.onrender.com/api";

const headers = {
  headers: {
    "x-auth-token":
      typeof window !== "undefined" && localStorage.getItem("token"),
  },
};

const login = (email: string, password: string) =>
  axios.post(`${BASE_URL}/login`, { email, password });

const signup = (fullname: string, email: string, password: string) =>
  axios.post(`${BASE_URL}/signup`, { fullname, email, password });

const getProducts = () => axios.get(`${SHOE_API_BASE_URL}/shoes`);
const getProductById = (id: string) =>
  axios.get(`${SHOE_API_BASE_URL}/shoes/${id}`);

const getCartItems = () =>
  axios.get(`${BASE_URL}/get-cart-item`, headers);
const getWishlistItems = () =>
  axios.get(`${BASE_URL}/get-wishlist-item`, headers);

const addToCart = (
  name: string,
  image: string,
  desc: string,
  price: string,
  quantity: number
) =>
  axios.post(
    `${BASE_URL}/add-to-cart`,
    { name, image, desc, price, quantity },
    headers
  );
const addToWishlist = (
  name: string,
  image: string,
  desc: string,
  price: string,
  rating: number
) =>
  axios.post(
    `${BASE_URL}/add-to-wishlist`,
    { name, image, desc, price, rating },
    headers
  );
const removeFromWishlist = (name: string) =>
  axios.post(`${BASE_URL}/remove-wishlist-item`, { name }, headers);

const removeCartItems = (itemName: string) =>
  axios.post(`${BASE_URL}/remove-cart-item`, { itemName }, headers);

const increaseCartQuantity = (quantity: number, name: string) =>
  axios.put(
    `${BASE_URL}/increase-cart-quantity`,
    { quantity, name },
    headers
  );

const checkout = (items: Product[], email: string) =>
  axios.post(`${BASE_URL}/checkout`, { email, items }, headers);

const order = (name: string, image: string, price: number) =>
  axios.post(`${BASE_URL}/order`, { name, image, price }, headers);

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
  removeFromWishlist,
};
