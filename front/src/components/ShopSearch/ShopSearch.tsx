import React, { FC, useEffect, useState } from "react";
import axios from "axios";

import GoogleMap from "../GoogleMap/GoogleMap";
import { GoogleMapCenterType, InputSearchParams, ShopType } from "../../types";
import { useShopContext } from "../../context/ShopContext";
import ShopCard from "./ShopCard";
import SearchForm from "./SearchForm";
import { useAuthContext } from "../../context/AuthContext";
import { getAuthHeaders } from "../../utils/utils";
import PageHelmet from "../PageHelmet";
import { toast } from "react-toastify";

const ShopSearch: FC = () => {
  // 東京を初期値としてマップの中心に設定
  const defaultCenter: GoogleMapCenterType = {
    lat: 35.681236,
    lng: 139.767125,
  };

  const { isSignedIn } = useAuthContext();
  const { shops, setShops } = useShopContext();
  const [center, setCenter] = useState<GoogleMapCenterType>(defaultCenter);

  // タブの状態を管理するステート
  const [tab, setTab] = useState<"all" | "bookmarks">("all");
  // お気に入りのショップ情報を管理するステート
  const [bookmarks, setBookmarks] = useState<ShopType[]>([]);

  const headers = getAuthHeaders();

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
      if (results.results.length > 0)
        setCenter({
          lat: results.results[0].geometry.location.lat,
          lng: results.results[0].geometry.location.lng,
        });

      setShops(results.results);
    } catch (e) {
      toast.error("店舗情報の取得に失敗しました");
    }
  };

  // お気に入りのショップ情報を取得する関数
  const getBookmarks = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/bookmarks`, {
        headers,
      });
      setBookmarks(res.data);
    } catch (e) {
      toast.error("お気に入り情報の取得に失敗しました");
    }
  };

  // タブが変更されたときにお気に入りのショップ情報を取得する
  useEffect(() => {
    if (tab === "bookmarks") getBookmarks();
  }, [tab]);

  return (
    <>
      <PageHelmet title="店舗検索" />
      <div className="flex h-screen">
        <div className="w-1/3 overflow-auto">
          <div className="p-4 flex flex-col h-full">
            <SearchForm onSubmit={onSubmit} />
            {isSignedIn && (
              <div className="tabs justify-center items-center my-3">
                <div
                  className={`tab tab-lg tab-bordered ${tab === "all" ? "tab-active" : ""}`}
                  onClick={() => setTab("all")}
                >
                  すべて
                </div>
                <div
                  className={`tab tab-lg tab-bordered ${tab === "bookmarks" ? "tab-active" : ""}`}
                  onClick={() => setTab("bookmarks")}
                >
                  お気に入り
                </div>
              </div>
            )}
            {/* Google Place APIから取得した店舗情報をここに表示する */}
            <div className="space-y-4 mt-4 w-full max-w-md overflow-auto">
              {(tab === "all" ? shops : bookmarks).map((shop) => (
                <ShopCard key={shop.place_id} shop={shop} />
              ))}
            </div>
          </div>
        </div>
        <div className="w-2/3">{<GoogleMap center={center} zoom={11} markers={shops} />}</div>
      </div>
    </>
  );
};

export default ShopSearch;
