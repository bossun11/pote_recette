import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { FaCrown } from "react-icons/fa";

import { RailsShopType } from "../../types";
import { formatAddress } from "../../utils/utils";
import NeutralButton from "../Buttons/NeutralButton";
import ShopReviewsModal from "../Modal/ShopReviewsModal";

type ShopRankingCardProps = {
  shop: RailsShopType;
  index: number;
};

const ShopRankingCard: FC<ShopRankingCardProps> = ({ shop, index }) => {
  const { place_id, photos, name, formatted_address, rating, user_ratings_total, reviews } = shop;
  const navigate = useNavigate();

  const crownColors = ["text-yellow-400", "text-gray-400", "text-yellow-600"];
  const rank = index + 1;
  const modalId = `shop_reviews_${place_id}`;

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
        <div className="font-bold text-2xl mt-2 mb-3">{name}</div>
        <div className="text-xl mb-2">{formatAddress(formatted_address)}</div>
        <div className="flex flex-col items-center text-left">
          <NeutralButton
            buttonText="口コミを見る"
            onClick={() => {
              if (document) (document.getElementById(modalId) as HTMLFormElement).showModal();
            }}
          />
          <ShopReviewsModal
            id={modalId}
            rating={rating}
            user_ratings_total={user_ratings_total}
            reviews={reviews}
          />
        </div>
        <NeutralButton
          buttonText="詳細を見る"
          width="6"
          onClick={() => navigate(`/shop-search/${place_id}`)}
        />
      </div>
    </div>
  );
};

export default ShopRankingCard;
