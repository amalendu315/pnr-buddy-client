import React from "react";
import { Link, useLocation } from "react-router-dom"; // Import from react-router-dom
import { navMenu } from "../../constants";

import {
  LuLayoutDashboard,
  LuShoppingCart,
  LuPlaneTakeoff,
} from "react-icons/lu";
import type { IconType } from "react-icons";

type IconMapType = {
  [key: string]: IconType;
};

const Sidebar = () => {
  const location = useLocation(); // Use useLocation hook
  const pathname = location.pathname;

  const iconMap: IconMapType = {
    "/namelist": LuLayoutDashboard,
    "/pnrdetails": LuShoppingCart,
    "/flightops": LuPlaneTakeoff,
  };

  return (
    <aside className="w-1/5 bg-gradient-to-b from-gray-700 to-gray-800 p-4 text-gray-200">
      <div className="flex justify-center items-center">
        <Link to="/">
          {" "}
          {/* Use Link from react-router-dom */}
          <img src="/assets/logo.png" alt="AIR IQ Logo" className="h-12" />
        </Link>
      </div>
      <hr className="border-t border-gray-600 my-4" />
      <div className="mt-8 pt-8">
        <ul className="space-y-8">
          {navMenu.map((link, index) => (
            <li key={index}>
              <Link
                to={link.href} // Use 'to' instead of 'href'
                className={`flex items-center gap-2 px-4 py-2 rounded bg-gray-800 hover:bg-gray-600 transition-colors duration-200 cursor-pointer 
                           ${
                             pathname === link.href
                               ? "bg-gray-600 text-white"
                               : ""
                           }`}
              >
                <span>
                  {iconMap[link?.href] &&
                    React.createElement(iconMap[link?.href])}
                </span>
                <span className="capitalize">{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
