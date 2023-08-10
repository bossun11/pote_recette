import React, { FC } from "react";

type DefaultButtonProps = {
  buttonText: string;
};

const DefaultButton: FC<DefaultButtonProps> = ({ buttonText }) => {
  return <button className="btn rounded-full">{buttonText}</button>;
};

export default DefaultButton;
