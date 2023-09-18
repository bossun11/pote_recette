import React, { FC } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

import { ShopType } from "../../types";
import { formatAddress, getPhotoUrl } from "../../utils/utils";
import { useAuthContext } from "../../context/AuthContext";
import NeutralButton from "../Buttons/NeutralButton";
import ShopReviewsModal from "./ShopReviewsModal";

type ShopInfoCardProps = {
  shopDetail: ShopType;
  isBookmarked: boolean;
  handleBookmark: () => void;
};

const ShopInfoCard: FC<ShopInfoCardProps> = ({ shopDetail, isBookmarked, handleBookmark }) => {
  const {
    name,
    formatted_address,
    website,
    photos,
    current_opening_hours,
    rating,
    user_ratings_total,
    reviews,
  } = shopDetail;

  const { isSignedIn } = useAuthContext();
  const address = formatAddress(formatted_address);
  const photoUrl = getPhotoUrl(photos[0].photo_reference, 400);

  const twitterShareText = `美味しいお芋を見つけたよ！\n「${name}」\n#PotaRecette #さつまいも`;

  const renderWeekdays = (weekday_text: string[]) => {
    return weekday_text.map((day) => {
      const [dayOfWeek, time] = day.split(": ");
      return (
        <div key={day} className="flex w-full">
          <div className="ml-10 sm:ml-16">
            {dayOfWeek}：{time}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="space-y-4 mt-4 w-full max-w-md">
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
                    <FaRegStar className="text-yellow-300 text-3xl" onClick={handleBookmark} />
                  )}
                </div>
              </div>
            )}
            <div className="flex flex-col items-center mb-7 w-full">
              <div className="font-bold text-lg mb-2 text-reddishBrown">営業日時</div>
              {current_opening_hours && renderWeekdays(current_opening_hours.weekday_text)}
            </div>
            <div className="flex flex-col items-center mb-7 w-full">
              <div className="font-bold text-lg mb-2 text-reddishBrown">住所</div>
              <div>{address}</div>
            </div>
            <div className="flex flex-col items-center mb-7 w-full">
              <div className="font-bold text-lg text-reddishBrown">公式HP</div>
              {website ? (
                <a
                  href={website}
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
            {isSignedIn && (
              <>
                <div className="flex flex-col items-center mb-3">
                  <NeutralButton
                    buttonText="口コミを見る"
                    onClick={() => {
                      if (document)
                        (document.getElementById("shop_reviews") as HTMLFormElement).showModal();
                    }}
                  />
                  <ShopReviewsModal
                    rating={rating}
                    user_ratings_total={user_ratings_total}
                    reviews={reviews}
                  />
                </div>

                <div className="flex items-center justify-center">
                  <details className="dropdown mb-7 z-10">
                    <summary className="m-1 btn">SNSでシェア</summary>
                    <ul className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52">
                      <li>
                        <div className="text-gray-400 pointer-events-none">次でシェア：</div>
                      </li>
                      <li>
                        <a
                          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                            twitterShareText,
                          )}&url=${window.location.href}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link link-hover"
                        >
                          X（Twitter）
                        </a>
                      </li>
                      <li>
                        <a
                          href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
                            window.location.href,
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link link-hover"
                        >
                          LINE
                        </a>
                      </li>
                    </ul>
                  </details>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopInfoCard;
