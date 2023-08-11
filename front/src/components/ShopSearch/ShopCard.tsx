import React, { FC } from "react";
import { RailsShopType, ShopType } from "../../types";
import { useNavigate } from "react-router-dom";
import { formatAddress, getPhotoUrl } from "../../utils/utils";

type ShopCardProps = {
  shop: ShopType | RailsShopType;
};

const ShopCard: FC<ShopCardProps> = ({ shop }) => {
  // お店が営業していない場合は表示しない
  if (shop.business_status && shop.business_status !== "OPERATIONAL") return null;

  // ショップ情報が取得できない場合は表示しない
  if (!shop) return null;

  const navigate = useNavigate();

  const address = formatAddress(shop.formatted_address);

  // 画像URLを取得する
  let photoUrl;
  if (Array.isArray(shop.photos))
    // Google Place APIからのデータの場合
    photoUrl = getPhotoUrl(shop.photos[0].photo_reference, 600);
  // RailsAPIからのデータの場合
  else photoUrl = `${shop.photos.url}`;

  return (
    <div
      key={shop.place_id}
      className="card w-88 bg-base-100 cursor-pointer"
      onClick={() => navigate(`/shop-search/${shop.place_id}`)}
    >
      <div className="card-body">
        <div className="flex justify-between items-center">
          <div className="flex-col ite">
            <h2 className="card-title">{shop.name}</h2>
            <p>{address}</p>
          </div>
          <div className="items-center">
            <img src={photoUrl} alt="" className="w-20 h-20" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
