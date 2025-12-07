// flightDataApi.ts

import axios from "axios";

const BASE_URL =
  "http://ec2-13-127-133-185.ap-south-1.compute.amazonaws.com:3004";
  
// const bASE_URL =
//   "http://localhost:3004"; 


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

export const fetchAkasaStatus = async (formData:any) => {
  try {
    const response = await axios.post(`${BASE_URL}/flightops/akasa`, formData);
    return response.data;
  } catch (error) {
    console.error("Error fetching Akasa Status:", error);
    throw error;
  }
};

export const fetchSpicejetStatus = async (formData:any)=>{
  try {
    const response = await axios.post(`${BASE_URL}/flightops/spicejet`, formData);
    return response.data;
  } catch (error) {
    console.error("Error fetching Spicejet Status:", error);
    throw error;
  }
};
