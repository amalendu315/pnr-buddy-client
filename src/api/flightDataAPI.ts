// flightDataApi.ts

import axios from "axios";

const BASE_URL =
  process.env.SERVER_URL || "https://pnr-buddy-server-1.onrender.com"; 


// ... (other interfaces for FlightData, etc. - you'll need to define these based on the API responses) ...

export const fetchAkasaData = async (pnrs: string[]) => {
   try {
     const response = await axios.post(`${BASE_URL}/akasa`, pnrs);
     return response.data;
   } catch (error) {
     console.error("Error fetching Akasa data:", error);
     throw error;
   }
};

export const fetchAirAsiaData = async (pnrs: string[]) => {
  try {
    const pnrData: any = pnrs.map((pnr) => ({ pnr }));
    const response = await axios.post(`${BASE_URL}/airasia`, pnrData);
    return response.data;
  } catch (error) {
    console.error("Error fetching AirAsia data:", error);
    throw error;
  }
};

export const fetchSpiceJetData = async (pnrs: string[]) => {
  try {
    const response = await axios.post(`${BASE_URL}/retrieve`, pnrs);
    return response.data;
  } catch (error) {
    console.error("Error fetching Spicejet data:", error);
    throw error;
  }
};
