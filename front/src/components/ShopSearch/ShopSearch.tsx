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
import NeutralButton from "../Buttons/NeutralButton";

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

  // 与えられた位置情報を基に、APIから店舗情報を取得し、マップの中心とステートの店舗リストを更新する関数
  const getShopsByLocation = async (location: string) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_API_URL}/shops/search?location=${location}`,
      );
      const results = res.data;
      if (results.results.length > 0) {
        setCenter({
          lat: results.results[0].geometry.location.lat,
          lng: results.results[0].geometry.location.lng,
        });
        setShops(results.results);
      }
    } catch (e) {
      toast.error("店舗情報の取得に失敗しました");
    }
  };

  const onSubmit = async (data: InputSearchParams) => {
    getShopsByLocation(data.search);
  };

  // 緯度経度から住所を取得する関数
  const reverseGeocoding = async (latitude: number, longitude: number): Promise<string | null> => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_GOOGLE_MAP_BASE_URL}/geocode/json?latlng=${latitude},${longitude}&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}&language=ja`,
      );
      return res.data.plus_code.compound_code;
    } catch (e) {
      toast.error("住所の取得に失敗しました");
      return null;
    }
  };

  // 現在地からショップを検索する関数
  const searchFromCurrentLocation = async () => {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const locationName = await reverseGeocoding(latitude, longitude);
        if (locationName) getShopsByLocation(locationName);
      });
    else toast.error("位置情報の取得に失敗しました。");
  };

  // お気に入りのショップ情報を取得する関数
  const getBookmarks = async (): Promise<void> => {
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
      <div className="flex flex-col h-screen lg:flex-row">
        <div className="flex flex-col p-4 overflow-auto w-full lg:w-1/3">
          <div className="flex items-center justify-center mb-3 lg:flex-col">
            <SearchForm onSubmit={onSubmit} />
            <div className="divider">OR</div>
            <NeutralButton buttonText="現在地から検索" onClick={searchFromCurrentLocation} />
          </div>
          {isSignedIn && (
            <div className="tabs justify-center items-center mb-3 flex">
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
          <div className="flex flex-col items-center space-y-4 mt-4 overflow-auto h-[50vh] lg:h-auto">
            {(tab === "all" ? shops : bookmarks).map((shop) => (
              <ShopCard key={shop.place_id} shop={shop} />
            ))}
          </div>
        </div>
        <div className="h-[40%] w-[84%] px-4 pb-4 mx-auto lg:h-auto xl:w-2/3 lg:pb-0 lg:px-0 md:w-[60%]">
          {<GoogleMap center={center} zoom={10} markers={shops} />}
        </div>
      </div>
    </>
  );
};

export default ShopSearch;
