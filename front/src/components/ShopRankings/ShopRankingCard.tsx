import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";

import { RailsShopType } from "../../types";
import { formatAddress } from "../../utils/utils";
import NeutralButton from "../Buttons/NeutralButton";

type ShopRankingCardProps = {
  shop: RailsShopType;
  index: number;
};

const ShopRankingCard: FC<ShopRankingCardProps> = ({ shop, index }) => {
  const { place_id, photos, name, formatted_address, rating, user_ratings_total } = shop;
  const navigate = useNavigate();

  const crownColors = ["text-yellow-400", "text-gray-400", "text-yellow-600"];
  const rank = index + 1;

  const changeCrownIcon = (index: number) => {
    return <FaCrown className={`${crownColors[index]} mr-3`} />;
  };

  return (
    <div
      className="card card-compact w-full bg-base-100 shadow-xl mx-4 my-4 flex flex-col items-center justify-center lg:w-auto lg:my-0"
      key={place_id}
    >
      <div className="card-title">
        <h2 className="font-bold text-4xl pt-5 flex items-center">
          {changeCrownIcon(index)}
          {rank}位
        </h2>
      </div>
      <figure className="px-10 pt-5">
        <img src={photos.url} alt="" className="w-80 h-44 rounded-xl" />
      </figure>
      <div className="card-body items-center text-center mb-3">
        <div className="font-bold text-2xl mb-5">{name}</div>
        <div className="text-xl mb-2">{formatAddress(formatted_address)}</div>
        <div className="flex items-center justify-start mb-3">
          <div className="text-xl ">平均評価：{rating}</div>
          <div className="text-xl ml-4">総評価数：{user_ratings_total}件</div>
        </div>
        <NeutralButton
          buttonText="詳細を見る"
          onClick={() => navigate(`/shop-search/${place_id}`)}
        />
      </div>
    </div>
  );
};

export default ShopRankingCard;
