import React, { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import axios from "axios";

import { GoogleMapCenterType, ShopType } from "../../types";
import { getPhotoUrl, getAuthHeaders } from "../../utils/utils";
import GoogleMap from "../GoogleMap/GoogleMap";
import { useAuthContext } from "../../context/AuthContext";
import ShopInfoCard from "./ShopInfoCard";
import { useShopDetail } from "../../hooks/useShopDetail";
import PageHelmet from "../PageHelmet";
import { toast } from "react-toastify";

const ShopDetail: FC = () => {
  const { id } = useParams();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const { isSignedIn } = useAuthContext();

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
          toast.error("ブックマーク情報の取得に失敗しました");
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

  const {
    place_id,
    name,
    formatted_address,
    website,
    photos,
    geometry,
    rating,
    user_ratings_total,
  } = shopDetail;
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
        latitude: geometry.location.lat,
        longitude: geometry.location.lng,
        rating: rating,
        user_ratings_total: user_ratings_total,
      },
    };
    if (isBookmarked)
      try {
        await axios.delete(`${process.env.REACT_APP_BACKEND_API_URL}/bookmarks/${id}`, {
          data: shopData,
          headers: headers,
        });
        setIsBookmarked(false);
        toast.success("お気に入りから削除しました");
      } catch (e) {
        toast.error("お気に入りの削除に失敗しました");
      }
    else
      try {
        await axios.post(`${process.env.REACT_APP_BACKEND_API_URL}/bookmarks`, shopData, {
          headers,
        });
        setIsBookmarked(true);
        toast.success("お気に入りに追加しました");
      } catch (e) {
        toast.error("お気に入りの登録に失敗しました");
      }
  };

  return (
    <>
      <PageHelmet title={`${name}に関する詳細情報`} />
      <div className="flex flex-col overflow-auto lg:flex-row">
        <div className="flex flex-col p-4 w-full lg:w-1/3">
          <div className="flex items-center justify-between px-4">
            <Link to="/shop-search" className="flex items-center">
              <MdOutlineArrowBackIos size={24} />
              <button className="ml-2">戻る</button>
            </Link>
            <div className="text-2xl font-bold text-center flex-grow">{name}</div>
            <div className="w-[40px]"></div>
          </div>
          <div className="flex items-center justify-center flex-col lg:flex-row">
            <ShopInfoCard
              shopDetail={shopDetail}
              isBookmarked={isBookmarked}
              handleBookmark={handleBookmark}
            />
          </div>
        </div>
        <div className="p-4 h-[50vh] md:w-[80vh] md:mx-auto lg:p-0 lg:h-auto lg:w-2/3">
          {<GoogleMap center={center} zoom={15} markers={shopDetail} infoWindow={true} />}
        </div>
      </div>
    </>
  );
};

export default ShopDetail;
