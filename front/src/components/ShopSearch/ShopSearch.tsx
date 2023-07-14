import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FiX } from "react-icons/fi";
import axios from "axios";

import GoogleMap from "../GoogleMap/GoogleMap";
import { inputSearchValidationSchema } from "../../utils/validationSchema";
import { GoogleMapCenterType } from "../../types";
import { useShopContext } from "../../context/ShopContext";
import ShopCard from "./ShopCard";

type InputSearchParams = z.infer<typeof inputSearchValidationSchema>;

const ShopSearch: FC = () => {
  const { register, handleSubmit, formState, reset } = useForm<InputSearchParams>({
    mode: "onChange",
    resolver: zodResolver(inputSearchValidationSchema),
  });

  // 名古屋をデフォルトの中心に設定
  const defaultCenter: GoogleMapCenterType = {
    lat: 35.182253007459444,
    lng: 136.90534328438358,
  };

  const { shops, setShops } = useShopContext();
  const [center, setCenter] = useState<GoogleMapCenterType>(defaultCenter);

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

  const handleReset = () => {
    reset();
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/3 overflow-auto">
        <div className="p-4 flex flex-col h-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">
              <div className="relative">
                <input
                  type="text"
                  placeholder="検索"
                  className="input input-bordered w-full max-w-xs"
                  {...register("search")}
                />
                {formState.isValid && (
                  <FiX
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={handleReset}
                  />
                )}
              </div>
              <input
                data-theme="valentine"
                className="btn btn-neutral ml-3"
                type="submit"
                value="検索"
                disabled={!formState.isValid}
              />
            </div>
          </form>
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
