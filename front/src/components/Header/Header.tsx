import React, { FC, useState } from "react";
import { Link } from "react-router-dom";

import { useAuthContext } from "../../context/AuthContext";
import BeforeLoginMenu from "./BeforeLoginMenu";
import AfterLoginMenu from "./AfterLoginMenu";

const Header: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isSignedIn } = useAuthContext();

  const changeMenuState = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="drawer drawer-end z-50">
      <input
        type="checkbox"
        id="my-drawer"
        className="drawer-toggle"
        checked={isOpen}
        onChange={changeMenuState}
      />
      <div className="flex flex-col drawer-content">
        <nav className="bg-deepRed px-6">
          <div className="flex items-center justify-between">
            <Link to="/">
              <img className="w-72 py-1" src="/images/logo.png" alt="logo" />
            </Link>
          </div>
        </nav>
        <label
          htmlFor="my-drawer"
          className="absolute top-1/2 right-0 p-4 transform -translate-y-1/2"
        >
          <svg
            className="swap-off fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" className="drawer-overlay"></label>
        {isSignedIn ? (
          <AfterLoginMenu changeMenuState={changeMenuState} />
        ) : (
          <BeforeLoginMenu changeMenuState={changeMenuState} />
        )}
      </div>
    </div>
  );
};

export default Header;
