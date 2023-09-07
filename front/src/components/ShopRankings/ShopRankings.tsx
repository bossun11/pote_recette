import axios from "axios";
import React, { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaCrown } from "react-icons/fa";

import { RailsShopType } from "../../types";
import PageHelmet from "../PageHelmet";
import { formatAddress } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import NeutralButton from "../Buttons/NeutralButton";

const ShopRankings: FC = () => {
  const [shopRankings, setShopRankings] = useState<RailsShopType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getShopRankings = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/shops/rankings`);
        setShopRankings(res.data);
        console.log(res.data);
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
          <div className="flex justify-center items-start">
            {shopRankings.map((shop, i) => (
              <div
                className="card card-compact w-96 bg-base-100 shadow-xl mx-4 flex flex-col items-center justify-center"
                key={shop.place_id}
              >
                <div className="card-title">
                  <h2 className="font-bold text-4xl pt-5 flex items-center">
                    {i === 0 ? (
                      <FaCrown className="text-yellow-400 mr-3" />
                    ) : i === 1 ? (
                      <FaCrown className="text-gray-400 mr-3" />
                    ) : i === 2 ? (
                      <FaCrown className="text-yellow-600 mr-3" />
                    ) : (
                      <></>
                    )}
                    {i + 1}位
                  </h2>
                </div>
                <figure className="px-10 pt-5">
                  <img src={shop.photos.url} alt="" className="w-80 h-44 rounded-xl" />
                </figure>
                <div className="card-body items-center text-center mb-3">
                  <div className="font-bold text-2xl mb-5">{shop.name}</div>
                  <div className="text-xl mb-2">{formatAddress(shop.formatted_address)}</div>
                  <div className="flex items-center justify-start mb-3">
                    <div className="text-xl ">平均評価：{shop.rating}</div>
                    <div className="text-xl ml-4">総評価数：{shop.user_ratings_total}件</div>
                  </div>
                  <NeutralButton
                    buttonText="詳細を見る"
                    onClick={() => navigate(`/shop-search/${shop.place_id}`)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopRankings;
