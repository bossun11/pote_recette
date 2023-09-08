import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { RailsShopType } from "../../types";
import PageHelmet from "../PageHelmet";
import ShopRankingCard from "./ShopRankingCard";

const ShopRankings: FC = () => {
  const [shopRankings, setShopRankings] = useState<RailsShopType[]>([]);

  useEffect(() => {
    const getShopRankings = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/shops/rankings`);
        setShopRankings(res.data);
      } catch (e) {
        toast.error("ランキングの取得に失敗しました。");
      }
    };

    getShopRankings();
  }, []);

  return (
    <>
      <PageHelmet title="ショップランキング" />
      <h1 className="text-4xl font-bold text-center mt-10">Bestショップ TOP3</h1>
      <div className="card w-auto">
        <div className="card-body">
          <div className="flex flex-col justify-center items-center lg:flex-row">
            {shopRankings.map((shop, i) => (
              <ShopRankingCard key={shop.place_id} shop={shop} index={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopRankings;
