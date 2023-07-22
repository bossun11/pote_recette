import React, { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import axios from "axios";
import { useJsApiLoader } from "@react-google-maps/api";

import { GoogleMapCenterType, ShopType } from "../../types";
import { getPhotoUrl, getAuthHeaders } from "../../utils/utils";
import GoogleMap from "../GoogleMap/GoogleMap";
import { useAuthContext } from "../../context/AuthContext";
import ShopInfoCard from "./ShopInfoCard";
import { useShopDetail } from "../../hooks/useShopDetail";
import PageHelmet from "../PageHelmet";

const ShopDetail: FC = () => {
  const { id } = useParams();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const { isSignedIn } = useAuthContext();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || "",
  });

  const headers = getAuthHeaders();

  // ショップの詳細情報を取得
  const shopDetail = useShopDetail(id);

  // ブックマークされているかどうかをチェック
  useEffect(() => {
    const checkBookmark = async () => {
      if (isSignedIn)
        try {
          const res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/bookmarks`, {
            headers,
          });
          const bookmarkedShops = res.data;
          // ブックマークされているショップのリストから、現在表示しているショップが含まれているかどうかをチェック
          const isShopBookmarked = bookmarkedShops.some((shop: ShopType) => shop.place_id === id);
          setIsBookmarked(isShopBookmarked);
        } catch (e) {
          console.error(e);
        }
    };

    checkBookmark();
  }, [id, isSignedIn]);

  // ロード中の処理
  if (!shopDetail)
    return (
      <div className="flex flex-col h-screen justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );

  const { place_id, name, formatted_address, website, photos, geometry } = shopDetail;
  const photoUrl = getPhotoUrl(photos[0].photo_reference, 400);

  const center: GoogleMapCenterType = {
    lat: geometry.location.lat,
    lng: geometry.location.lng,
  };

  // ブックマークの追加・削除
  const handleBookmark = async () => {
    const shopData = {
      shop: {
        place_id: place_id,
        name: name,
        formatted_address: formatted_address,
        photos: photoUrl,
        website: website,
      },
    };
    if (isBookmarked)
      try {
        await axios.delete(`${process.env.REACT_APP_BACKEND_API_URL}/bookmarks/${id}`, {
          data: shopData,
          headers: headers,
        });
        setIsBookmarked(false);
      } catch (e) {
        console.error(e);
      }
    else
      try {
        await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/bookmarks`, shopData, {
          headers,
        });
        setIsBookmarked(true);
      } catch (e) {
        console.error(e);
      }
  };

  return isLoaded ? (
    <>
      <PageHelmet title={`${name}に関する詳細情報`} />
      <div className="flex h-screen">
        <div className="w-1/3 overflow-auto">
          <div className="p-4 flex flex-col h-full">
            <div className="flex items-center justify-center">
              <Link to="/shop-search">
                <div className="flex flex-row cursor-pointer">
                  <MdOutlineArrowBackIos size={24} />
                  <button className="mr-2">戻る</button>
                </div>
              </Link>
              <div className="text-2xl font-bold">{name}</div>
            </div>
            {/* ここに店舗情報を表示 */}
            <ShopInfoCard
              shopDetail={shopDetail}
              isBookmarked={isBookmarked}
              handleBookmark={handleBookmark}
            />
          </div>
        </div>
        <div className="w-2/3 bg-white">{<GoogleMap center={center} zoom={15} />}</div>
      </div>
    </>
  ) : (
    <></>
  );
};

export default ShopDetail;
