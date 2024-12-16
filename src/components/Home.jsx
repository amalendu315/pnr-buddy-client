import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


export default function Home() {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);

  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;

    switch (selectedOption) {
      case "option1":
        navigate("/namelist");
        break;
      case "option2":
        navigate("/pnrdetails");
        break;
      case "option3":
        navigate("/flightops");
        break;
      default:
        // Handle default case or error
        break;
    }
  };

  useEffect(() => {
    setIsMounted(true); // No need to toggle the state
  }, []); // Empty dependency array ensures this runs once

  if (!isMounted) {
    return null;
  }

  return (
    <div class="flex justify-center items-center h-screen">
      <div class="bg-white border border-gray-300 rounded-md shadow-md p-4">
        <h2 class="text-lg font-bold mb-4">What are you here for?</h2>
        <select
          class="w-full bg-white border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          onChange={handleSelectChange}
        >
          <option value="">Select an option</option>
          <option value="option1" class="text-gray-900">
            Namelist Formatting !
          </option>
          <option value="option2" class="text-gray-900">
            PNR Purchase Data !
          </option>
          <option value="option3" class="text-gray-900">
            Flight Operations "GOOD/BAD" !
          </option>
        </select>
      </div>
    </div>
  );
}
