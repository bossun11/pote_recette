import React, { FC } from "react";
import ShopRating from "../Rating/ShopRating";

type ShopReviewsModalProps = {
  id: string;
  rating: number;
  user_ratings_total: number;
  reviews?: {
    text: string;
    time: number;
    relative_time_description: string;
  }[];
};

const ShopReviewsModal: FC<ShopReviewsModalProps> = ({
  id,
  rating,
  user_ratings_total,
  reviews,
}) => {
  // 口コミを表示するカード
  const reviewCards = () => {
    if (!reviews || reviews.length === 0)
      return <div className="flex items-start justify-center text-lg">口コミはありません</div>;

    return reviews.map((review) => {
      const { text, time, relative_time_description } = review;
      if (text === "") return;
      return (
        <div className="card w-full bg-base-100 shadow-xl card-bordered mb-5" key={time}>
          <div className="card-body">
            <p className="break-words">{text}</p>
            <p className="text-deepRed text-sm text-left mt-2">{`${relative_time_description}の口コミ`}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <dialog id={id} className="modal">
      <form method="dialog" className="modal-box bg-creamLight">
        <div className="flex justify-end mb-2">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </div>
        <div className="sm:flex items-center justify-center">
          <div className="flex items-center">
            <div className="text-xl">平均評価：{rating}</div>
            <ShopRating rating={rating} />
          </div>
          <div className="text-xl text-start sm:ml-4">総評価数：{user_ratings_total}件</div>
        </div>
        <div className="divider"></div>
        {reviewCards()}
      </form>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default ShopReviewsModal;
