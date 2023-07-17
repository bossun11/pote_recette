import React, { FC, useEffect, useState } from "react";
import axios from "axios";

import GoogleMap from "../GoogleMap/GoogleMap";
import { GoogleMapCenterType, InputSearchParams } from "../../types";
import { useShopContext } from "../../context/ShopContext";
import ShopCard from "./ShopCard";
import SearchForm from "./SearchForm";

const ShopSearch: FC = () => {
  // 名古屋をデフォルトの中心に設定
  const defaultCenter: GoogleMapCenterType = {
    lat: 35.182253007459444,
    lng: 136.90534328438358,
  };

  const { shops, setShops } = useShopContext();
  const [center, setCenter] = useState<GoogleMapCenterType>(defaultCenter);

  useEffect(() => {
    if (shops.length > 0)
      setCenter({
        lat: shops[0].geometry.location.lat,
        lng: shops[0].geometry.location.lng,
      });
  }, [shops]);

  const onSubmit = async (data: InputSearchParams) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/shops/search?location=${data.search}`,
      );
      const results = res.data;
      console.log(results);
      if (results.results.length > 0)
        setCenter({
          lat: results.results[0].geometry.location.lat,
          lng: results.results[0].geometry.location.lng,
        });

      setShops(results.results);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 overflow-auto">
        <div className="p-4 flex flex-col h-full">
          <SearchForm onSubmit={onSubmit} />
          {/* Google Place APIから取得した店舗情報をここに表示する */}
          <div className="space-y-4 mt-4 w-full max-w-md overflow-auto">
            {shops.length > 0 && shops.map((shop) => <ShopCard key={shop.place_id} shop={shop} />)}
          </div>
        </div>
      </div>
      <div className="w-2/3">{<GoogleMap center={center} />}</div>
    </div>
  );
};

export default ShopSearch;
