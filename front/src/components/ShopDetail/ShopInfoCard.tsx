import React, { FC } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";

import { ShopType } from "../../types";
import { formatAddress, getPhotoUrl } from "../../utils/utils";
import { useAuthContext } from "../../context/AuthContext";
import NeutralButton from "../Buttons/NeutralButton";

type ShopInfoCardProps = {
  shopDetail: ShopType;
  isBookmarked: boolean;
  handleBookmark: () => void;
};

const ShopInfoCard: FC<ShopInfoCardProps> = ({ shopDetail, isBookmarked, handleBookmark }) => {
  const {
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

  // 口コミを表示するカード
  const reviewCards = () => {
    if (!reviews || reviews.length === 0)
      return <div className="flex items-start justify-center text-lg">口コミはありません</div>;

    return reviews.map((review) => {
      const { text, time, relative_time_description } = review;
      return (
        <div className="card w-auto bg-base-100 shadow-xl card-bordered mb-5" key={time}>
          <div className="card-body">
            <p className="">{text}</p>
            <p className="text-deepRed text-sm mt-2">{`${relative_time_description}の口コミ`}</p>
          </div>
        </div>
      );
    });
  };

  const shopRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;

    return (
      <div className="rating rating-md rating-half pointer-events-none">
        <input type="radio" className="rating-hidden" defaultChecked={rating < 0.5} />
        {[...Array(10)].map((_, i) => (
          <input
            key={i}
            type="radio"
            name="rating-10"
            className={`bg-amber-300 mask mask-star-2 ${
              i % 2 === 0 ? "mask-half-1" : "mask-half-2"
            }`}
            defaultChecked={i < fullStars * 2 || (i === fullStars * 2 && halfStar)}
          />
        ))}
      </div>
    );
  };

  return (
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
            <div className="flex flex-col items-center mb-7">
              <NeutralButton
                buttonText="口コミを見る"
                onClick={() => {
                  if (document)
                    (document.getElementById("shop_reviews") as HTMLFormElement).showModal();
                }}
              />
              {/* 口コミを閲覧できるモーダル */}
              <dialog id="shop_reviews" className="modal">
                <form method="dialog" className="modal-box bg-creamLight">
                  <div className="flex justify-end mb-2">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                      ✕
                    </button>
                  </div>
                  <div className="flex items-center justify-start">
                    <div className="text-xl ">平均評価：{rating}</div>
                    {shopRating(rating)}
                    <div className="text-xl ml-4">総評価数：{user_ratings_total}</div>
                  </div>
                  <div className="divider"></div>
                  <div className="flex flex-col items-center justify-center">{reviewCards()}</div>
                </form>
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopInfoCard;
