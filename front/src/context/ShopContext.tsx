import React, { createContext, useContext, useState } from "react";
import { ShopType } from "../types";

type ShopContextType = {
  shops: ShopType[];
  setShops: React.Dispatch<React.SetStateAction<ShopType[]>>;
};

type ShopProviderProps = {
  children: React.ReactNode;
};

const ShopContext = createContext<ShopContextType>({} as ShopContextType);

export const ShopProvider = ({ children }: ShopProviderProps) => {
  const [shops, setShops] = useState<ShopType[]>([]);

  const ShopContextValue = {
    shops,
    setShops,
  };

  return <ShopContext.Provider value={ShopContextValue}>{children}</ShopContext.Provider>;
};

export const useShopContext = () => useContext(ShopContext);
