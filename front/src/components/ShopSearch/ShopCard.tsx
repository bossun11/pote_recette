import React, { FC } from "react";
import { RailsShopType, ShopType } from "../../types";
import { useNavigate } from "react-router-dom";
import { formatAddress, getPhotoUrl } from "../../utils/utils";

type ShopCardProps = {
  shop: ShopType | RailsShopType;
};

const ShopCard: FC<ShopCardProps> = ({ shop }) => {
  const { business_status, formatted_address, name, photos, place_id, rating, user_ratings_total } =
    shop;

  // お店が営業していない場合は表示しない
  if (business_status && business_status !== "OPERATIONAL") return null;

  // ショップの写真が取得できない場合は表示しない
  if (!photos) return null;

  const navigate = useNavigate();

  const address = formatAddress(formatted_address);

  // 画像URLを取得する
  let photoUrl;
  if (Array.isArray(photos))
    // Google Place APIからのデータの場合
    photoUrl = getPhotoUrl(photos[0].photo_reference, 600);
  // RailsAPIからのデータの場合
  else photoUrl = `${photos.url}`;

  return (
    <div
      key={shop.place_id}
      className="card w-96 bg-base-100 cursor-pointer"
      onClick={() => navigate(`/shop-search/${place_id}`)}
    >
      <div className="card-body">
        <div className="flex justify-between items-center">
          <div className="flex-col">
            <h2 className="card-title text-lg">{name}</h2>
            <div className="text-sm mt-2">{address}</div>
            <p className="text-sm mt-2">
              評価：{rating}（{user_ratings_total}件）
            </p>
          </div>
          <div className="items-center ml-1">
            <div className="w-20 h-20 flex-shrink-0">
              <img src={photoUrl} alt="" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
