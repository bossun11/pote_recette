import React, { FC } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { ShopType } from "../../types";
import { formatAddress, getPhotoUrl } from "../../utils/utils";
import { useAuthContext } from "../../context/AuthContext";

type ShopInfoCardProps = {
  shopDetail: ShopType;
  isBookmarked: boolean;
  handleBookmark: () => void;
};

const ShopInfoCard: FC<ShopInfoCardProps> = ({ shopDetail, isBookmarked, handleBookmark }) => {
  const { formatted_address, website, photos, current_opening_hours } = shopDetail;
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopInfoCard;