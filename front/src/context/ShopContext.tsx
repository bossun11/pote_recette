import React, { createContext, useContext, useState } from "react";
import { ShopType } from "../types";

type ShopContextType = {
  shops: ShopType[];
  setShops: React.Dispatch<React.SetStateAction<ShopType[]>>;
};

type ShopProviderProps = {
  children: React.ReactNode;
};

const ShopContext = createContext<ShopContextType | null>(null);

export const ShopProvider = ({ children }: ShopProviderProps) => {
  const [shops, setShops] = useState<ShopType[]>([]);

  const ShopContextValue = {
    shops,
    setShops,
  };

  return <ShopContext.Provider value={ShopContextValue}>{children}</ShopContext.Provider>;
};

export const useShopContext = () => {
  const context = useContext(ShopContext);
  if (context === null) throw new Error("useShopContextはShopProvider内で使用してください");

  return context;
};
