import React, { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import axios from "axios";
import { useJsApiLoader } from "@react-google-maps/api";
import { FaStar, FaRegStar } from "react-icons/fa";

import { GoogleMapCenterType, ShopType } from "../../types";
import { formatAddress, getPhotoUrl, getAuthHeaders } from "../../utils/utils";
import GoogleMap from "../GoogleMap/GoogleMap";
import { useAuthContext } from "../../context/AuthContext";

const ShopDetail: FC = () => {
  const { id } = useParams();
  const [shopDetail, setShopDetail] = useState<ShopType>();
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const { isSignedIn } = useAuthContext();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY || "",
  });

  const headers = getAuthHeaders();

  const renderWeekdays = (weekday_text: string[]) => {
    return weekday_text.map((day) => {
      const [dayOfWeek, time] = day.split(": ");
      return (
        <div key={day} className="flex w-full">
          <div className="ml-16">
            {dayOfWeek}:　{time}
          </div>
        </div>
      );
    });
  };

  // ショップの詳細情報を取得
  useEffect(() => {
    const getShopDetail = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BACKEND_API_URL}/shops/${id}`);
        setShopDetail(res.data.result);
      } catch (err) {
        console.error(err);
      }
    };

    getShopDetail();
  }, []);

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

  const address = formatAddress(shopDetail.formatted_address);

  const photoUrl = getPhotoUrl(shopDetail.photos[0].photo_reference, 400);

  const center: GoogleMapCenterType = {
    lat: shopDetail.geometry.location.lat,
    lng: shopDetail.geometry.location.lng,
  };

  const handleBookmark = async () => {
    const shopData = {
      shop: {
        place_id: shopDetail.place_id,
        name: shopDetail.name,
        formatted_address: shopDetail.formatted_address,
        photos: photoUrl,
        website: shopDetail.website,
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
            <div className="text-2xl font-bold">{shopDetail.name}</div>
          </div>
          {/* ここに店舗情報を表示する */}
          <div className="space-y-4 mt-4 w-full max-w-md overflow-auto">
            <div className="card bg-base-100">
              <div className="card-body">
                <div className="flex flex-col">
                  <img
                    src={photoUrl}
                    alt=""
                    className="artboard artboard-horizontal phone-1 mb-4 rounded-lg"
                  />
                  {isSignedIn && (
                    <div className="flex items-center justify-center mb-7 w-full">
                      <div className="font-bold text-2xl text-reddishBrown">お気に入り　　</div>
                      <div>
                        {isBookmarked ? (
                          <FaStar className="text-yellow-300 text-3xl" onClick={handleBookmark} />
                        ) : (
                          <FaRegStar
                            className="text-yellow-300 text-3xl"
                            onClick={handleBookmark}
                          />
                        )}
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col items-center mb-7 w-full">
                    <div className="font-bold text-lg mb-2 text-reddishBrown">営業日時</div>
                    {shopDetail.current_opening_hours &&
                      renderWeekdays(shopDetail.current_opening_hours.weekday_text)}
                  </div>
                  <div className="flex flex-col items-center mb-7 w-full">
                    <div className="font-bold text-lg mb-2 text-reddishBrown">住所</div>
                    <div>{address}</div>
                  </div>
                  <div className="flex flex-col items-center w-full mb-7">
                    <div className="font-bold text-lg text-reddishBrown">公式HP</div>
                    {shopDetail.website ? (
                      <a
                        href={shopDetail.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link link-hover"
                      >
                        ホームページを閲覧する
                      </a>
                    ) : (
                      <div>ホームページが見つかりませんでした</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-2/3 bg-white">{<GoogleMap center={center} zoom={15} />}</div>
    </div>
  ) : (
    <></>
  );
};

export default ShopDetail;
