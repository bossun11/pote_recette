import React, { FC } from "react";
import { ShopType } from "../../types";

type ShopCardProps = {
  shop: ShopType;
};

const ShopCard: FC<ShopCardProps> = ({ shop }) => {
  const address = shop.formatted_address.replace(/日本、〒\d{3}-\d{4} /, "");
  const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=600&photoreference=${shop.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`;

  return (
    <div key={shop.place_id} className="card w-88 bg-base-100 cursor-pointer">
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
