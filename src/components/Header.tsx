
import { navMenu } from "../constants"
import { Link, useLocation } from "react-router-dom";

const Header = () => {

  const location = useLocation();
  const pathname = location.pathname;

  const matchingLink = navMenu.find((link) => link.href === pathname);

  const displayedRouteName = matchingLink ? (
    <div className="flex items-center">
      <Link
        to="/"
        className="text-gray-300 hover:text-white transition-colors text-lg"
      >
        Home
      </Link>
      <span className="mx-2 text-gray-400 text-lg">&gt;</span> {/* Separator */}
      <span className="capitalize text-gray-200 text-lg">
        {matchingLink.name}
      </span>
    </div>
  ) : (
    <span className="text-gray-200 text-lg">Home</span>
  );

  return (
    <header className="bg-gradient-to-r from-gray-800 to-gray-900 p-4 w-full">
      <div className="flex justify-between items-center">
        {displayedRouteName}
        <div className="flex items-center gap-2">
          <span className="text-gray-300 text-xl">Co-Worker</span>
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
