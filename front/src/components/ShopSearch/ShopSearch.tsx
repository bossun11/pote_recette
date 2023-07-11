import React, { FC } from "react";
import GoogleMap from "../GoogleMap/GoogleMap";

const ShopSearch: FC = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-gray-200 overflow-auto">
        {/* 左側のコンテンツをここに配置します */}
        <p>左側のコンテンツ</p>
      </div>
      <div className="w-2/3">
        <GoogleMap />
      </div>
    </div>
  );
};

export default ShopSearch;
