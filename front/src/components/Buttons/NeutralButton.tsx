import React, { FC } from "react";

type Props = {
  buttonText: string;
};

const NeutralButton: FC<Props> = ({ buttonText }) => {
  return (
    <button data-theme="valentine" className="btn btn-neutral">
      {buttonText}
    </button>
  );
};

export default NeutralButton;
