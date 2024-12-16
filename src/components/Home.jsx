import React, { useState, useEffect } from "react";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // No need to toggle the state
  }, []); // Empty dependency array ensures this runs once

  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative w-full h-full flex-grow">
      <img
        src="/assets/logo2.png"
        alt="Background"
        className="w-full h-full object-contain"
      />

      <div className="absolute inset-0 bg-black/50"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center w-full h-full">
        <div className="flex flex-col gap-4">
          <p className="text-white text-lg mb-4 flex flex-col items-center gap-36">
            {/* <span className="flex flex-col items-center justify-center">
              New user? <span>Click the sidebar links to navigate.</span>
              <svg
                className="w-6 h-6 rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5l7 7-7 7"
                />
              </svg>
            </span> */}
            <span className="flex flex-col items-center justify-center text-2xl">
              Namelist Formatting ?
              <span className="text-green-500">
                Click the NAMELIST to navigate.
              </span>
              <svg
                className="w-6 h-6 rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5l7 7-7 7"
                />
              </svg>
            </span>
            <span className="flex flex-col items-center justify-center text-2xl">
              PNR Purchase Data Needed ?{" "}
              <span className="text-green-500">
                Click the PNR Purchase to navigate.
              </span>
              <svg
                className="w-6 h-6 rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5l7 7-7 7"
                />
              </svg>
            </span>
            <span className="flex flex-col items-center justify-center text-2xl">
              GOOD / BAD Fetching ?{" "}
              <span className="text-green-500">
                Click the FLIGHT OPS to navigate.
              </span>
              <svg
                className="w-6 h-6 rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 5l7 7-7 7"
                />
              </svg>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
