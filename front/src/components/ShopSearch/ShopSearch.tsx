import React, { FC } from "react";

const ShopSearch: FC = () => {
  return (
    <div className="flex h-screen">
      <div className="w-1/3 bg-gray-200 overflow-auto">
        {/* 左側のコンテンツをここに配置します */}
        <p>左側のコンテンツ</p>
      </div>
      <div className="w-2/3 bg-gray-300">
        {/* Googleマップを表示するためのコンテンツをここに配置します */}
        <p>Googleマップの表示領域</p>
      </div>
    </div>
  );
};

export default ShopSearch;
