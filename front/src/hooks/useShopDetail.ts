import { useEffect, useState } from "react";
import axios from "axios";
import { ShopType } from "../types";

// Places APIからショップの詳細情報を取得するカスタムフック
export const useShopDetail = (id: string | undefined) => {
  const [shopDetail, setShopDetail] = useState<ShopType>();

  useEffect(() => {
    const getShopDetail = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/shops/${id}`);
        setShopDetail(res.data.result);
      } catch (e) {
        console.error(e);
      }
    };

    getShopDetail();
  }, []);

  return shopDetail;
};
