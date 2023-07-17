import React, { FC } from "react";
import { ShopType } from "../../types";
import { useNavigate } from "react-router-dom";
import { formatAddress, getPhotoUrl } from "../../utils/utils";

type ShopCardProps = {
  shop: ShopType;
};

const ShopCard: FC<ShopCardProps> = ({ shop }) => {
  // お店が営業していない場合は表示しない
  if (shop.business_status !== "OPERATIONAL") return null;

  const navigate = useNavigate();

  const address = formatAddress(shop.formatted_address);

  const photoUrl = getPhotoUrl(shop.photos[0].photo_reference, 600);

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
