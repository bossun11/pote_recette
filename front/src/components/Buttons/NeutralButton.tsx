import React, { FC } from "react";

type Props = {
  buttonText: string;
  onClick?: () => void;
};

const NeutralButton: FC<Props> = ({ buttonText, onClick }) => {
  return (
    <button data-theme="valentine" className="btn btn-neutral" onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default NeutralButton;
