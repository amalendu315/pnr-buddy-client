// FlightDataComponent.tsx
"use client";
import React, { useState } from "react";
import {
  fetchAkasaData,
  fetchAirAsiaData,
  fetchSpiceJetData,
} from "../api/flightDataAPI";
import toast from "react-hot-toast";

const FlightDataComponent: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [pnrs, setPnrs] = useState(""); // Change to string for textarea
  const [airline, setAirline] = useState("akasa");
  const [flightData, setFlightData] = useState(null);
  const [errors, setErrors] = useState<string[] | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors(null);
    setFlightData(null);
    // Split the PNRs string into an array of strings
    const pnrArray = pnrs
      .split("\n")
      .map((pnr) => pnr.trim().replace(/"/g, "")) // Remove quotes here
      .filter((pnr) => pnr); 

    try {
      let data;
      switch (airline) {
        case "akasa":
          data = await fetchAkasaData(pnrArray); // Pass array of PNRs
          break;
        case "airasia":
          data = await fetchAirAsiaData(pnrArray);
          break;
        case "spicejet":
          data = await fetchSpiceJetData(pnrArray);
          break;
        default:
          setErrors(["Invalid airline selected."]);
          return;
      }

      console.log('data', data)
      setFlightData(data.results);
      setErrors(data.errors.length > 0 ? data.errors.join("\n") : null); 
      setPnrs("");
      setIsLoading(false);
    } catch (err: any) {
      setErrors(err.message || "Error fetching flight data.");
      setIsLoading(false);
    }
  };

  console.log('errors', errors)

  const handleAirlineChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAirline(e.target.value);
  };

  const handleCopyButtonClick = () => {
    if (flightData) {
      navigator.clipboard
        .writeText(flightData)
        .then(() => {
          // Optionally show a success message to the user
          toast.success("Flight data copied to clipboard!");
        })
        .catch((err) => {
          // Optionally show an error message to the user
          toast.error("Failed to copy flight data: ", err);
        });
    }
  };

  const handleClearButtonClick = (e:React.MouseEvent<HTMLButtonElement>)=>{
    e.preventDefault();
    setFlightData(null);
    setErrors(null);
    setPnrs("");
  }
  
  return (
    <div className="w-full">
      <div className="flex justify-center animate-pulse">
        <img
          src="/assets/pnrdetails.png"
          alt=""
          className="w-[330px] h-[145px]"
        />
      </div>
      <div className="mx-auto p-4 h-[45vh] w-full flex flex-col justify-start pt-0">
        <form
          onSubmit={handleSubmit}
          className={`flex flex-col md:flex-row gap-4 w-full`} // Changed to flex-row
        >
          <div className="md:w-1/2 flex items-center gap-2">
            <label
              htmlFor="airline"
              className="block text-sm font-medium text-gray-700 mr-2 whitespace-nowrap"
            >
              Airline:
            </label>
            <select
              id="airline"
              value={airline}
              onChange={handleAirlineChange}
              className={`mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md border text-center`}
            >
              <option value="akasa">Akasa Air</option>
              <option value="spicejet">SpiceJet</option>
            </select>
          </div>
          <div className="md:w-1/2 flex items-center gap-2">
            <label
              htmlFor="pnr"
              className="block text-sm font-medium text-gray-700"
            >
              PNRs (one per line): {/* Updated label */}
            </label>
            <textarea
              id="pnr"
              value={pnrs}
              onChange={(e) => setPnrs(e.target.value)}
              placeholder={`PNR1\nPNR2\nPNR3\n...`} // Updated placeholder
              className="w-full px-3 py-2 bg-white border shadow-sm border-gray-300 placeholder-gray-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded whitespace-nowrap"
          >
            Fetch Flight Data
          </button>
        </form>
        {/* ... (error and flightData display) */}
        {/* {error && <div className="error text-red-500 mt-4">{error}</div>} */}

        <div className="mt-4">
          {/* Flight Data Container */}
          {flightData && (
            <div className="relative">
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={(e) => handleCopyButtonClick()}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Copy Data
                </button>
                <button
                  onClick={(e) => handleClearButtonClick(e)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Clear Data
                </button>
              </div>
              <div className="max-h-[770px] overflow-y-auto">
                <pre className="bg-gray-100 p-4 text-center rounded-md overflow-x-auto whitespace-pre-wrap">
                  {flightData}
                </pre>
              </div>
            </div>
          )}

          {/* Error Container */}
          {errors?.length && (
            <div className="mt-4 ">
              {/* Remove max height from here */}
              <div className="max-h-[770px] overflow-y-auto">
              <pre className="bg-red-500 p-4 text-center rounded-md overflow-x-auto whitespace-pre-wrap">
                {errors}
              </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightDataComponent;
