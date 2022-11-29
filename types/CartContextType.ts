import { Product } from "./Product";

export type CartContextType = {
  cartItems: Product[];
  setCartItems: (cartItems: Product[]) => void;
  handleAddCart: (product: Product) => void;
  handleRemoveCart: (itemName: string) => void;
  handleItemQuantityIncrement: (itemName: string) => void;
  handleItemQuantityDecrement: (itemName: string) => void;
  wishListItems: Product[];
  setWishListItems: (item: Product[]) => void;
  handleRemoveFromWishlist: (itemName:string) => void;
  handleWishtList: (item:Product) => void;
};
