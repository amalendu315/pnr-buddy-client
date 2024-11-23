import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="relative -top-1 w-full mb-5">
      <img
        src="/assets/SiteHeader.png"
        alt="Header"
        className="w-full h-[150px]"
      />
      <nav className="absolute top-0 left-0 w-full p-4">
        <ul className="flex space-x-4 justify-evenly items-center pt-3">
          <li className="text-xl font-bold">
            <Link to="/" className="hover:text-red-600 text-white">
              Namelist Formatter
            </Link>
          </li>
          <li className="text-xl font-bold">
            <Link to="/pnrdetails" className="hover:text-red-600 text-white">
              Purchase PNR
            </Link>
          </li>
          {/* <li>
            <Link to="/contact" className="hover:underline text-white">
              Contact
            </Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
