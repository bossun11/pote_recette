import React, { FC } from "react";

type Props = {
  BTNTEXT: string;
};

const NeutralButton: FC<Props> = ({ BTNTEXT }) => {
  return (
    <button data-theme="valentine" className="btn btn-neutral">
      {BTNTEXT}
    </button>
  );
};

export default NeutralButton;
