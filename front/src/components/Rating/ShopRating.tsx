import React, { FC } from "react";

type ShopRatingProps = {
  rating: number;
  size?: "xs" | "sm" | "lg";
};

const ShopRating: FC<ShopRatingProps> = ({ rating, size = "md" }) => {
  const totalStars = 5;
  const totalHalfStars = totalStars * 2;

  const fullStars = Math.floor(rating);
  const halfStar = rating - fullStars >= 0.5;

  return (
    <div className={`rating rating-${size} rating-half pointer-events-none`}>
      <input type="radio" className="rating-hidden" defaultChecked={rating < 0.5} />
      {[...Array(totalHalfStars)].map((_, i) => (
        <input
          key={i}
          type="radio"
          name="rating-10"
          className={`bg-amber-300 mask mask-star-2 ${i % 2 === 0 ? "mask-half-1" : "mask-half-2"}`}
          defaultChecked={i < fullStars * 2 || (i === fullStars * 2 && halfStar)}
        />
      ))}
    </div>
  );
};

export default ShopRating;
