import React, { FC } from "react";

type Props = {
  buttonText: string;
  onClick?: () => void;
  width?: string;
};

const NeutralButton: FC<Props> = ({ buttonText, onClick, width }) => {
  return (
    <button data-theme="valentine" className={`btn btn-neutral px-${width}`} onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default NeutralButton;
