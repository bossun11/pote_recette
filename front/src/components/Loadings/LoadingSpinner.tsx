import React, { FC } from "react";
import { createPortal } from "react-dom";

const LoadingSpinner: FC = () => {
  return createPortal(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>,
    document.body,
  );
};

export default LoadingSpinner;
