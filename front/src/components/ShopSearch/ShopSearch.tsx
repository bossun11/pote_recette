import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FiX } from "react-icons/fi";
import axios from "axios";

import GoogleMap from "../GoogleMap/GoogleMap";
import { inputSearchValidationSchema } from "../../utils/validationSchema";

type InputSearchParams = z.infer<typeof inputSearchValidationSchema>;

type ShopType = {
  place_id: string;
  name: string;
  formatted_address: string;
};

const ShopSearch: FC = () => {
  const { register, handleSubmit, formState, reset } = useForm<InputSearchParams>({
    mode: "onChange",
    resolver: zodResolver(inputSearchValidationSchema),
  });

  const [shops, setShops] = useState<ShopType[]>([]);

  const onSubmit = async (data: InputSearchParams) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/shops/search?location=${data.search}`,
      );
      const results = res.data;
      console.log(results);
      setShops(results.results);
    } catch (e) {
      console.log(e);
    }
  };

  const handleReset = () => {
    reset();
  };

  // ショップの情報をカードにして表示
  const renderShopCard = (shop: ShopType) => {
    const address = shop.formatted_address.replace(/日本、〒\d{3}-\d{4} /, "");
    return (
      <div key={shop.place_id} className="card w-88 bg-base-100">
        <div className="card-body ">
          <h2 className="card-title">{shop.name}</h2>
          <p>{address}</p>
        </div>
      </div>
    );
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
            {shops.length > 0 && shops.map(renderShopCard)}
          </div>
        </div>
      </div>
      <div className="w-2/3">{<GoogleMap />}</div>
    </div>
  );
};

export default ShopSearch;
