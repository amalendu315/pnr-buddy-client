import React, { useState } from "react";
import axios from "axios";
import { LuLoader2 } from "react-icons/lu";

const fileCodeInfo = {
  "i.xlsx": "Indigo",
  "g.xlsx": "GoAir",
  "s.xlsx": "Spicejet",
  "a.xlsx": "AirAsia",
  "q.xlsx": "Akasa",
  "t.xlsx": "ThaiAirAsia",
  "d.xlsx": "Druk Air",
  "b.xlsx": "Bhutan Airlines",
  "e.xlsx": "Air India Domestic",
  "f.xlsx": "Air India International",
  "h.xlsx": "Air India Express International",
};

const FormUpload = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("Select File");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    setIsLoading(true);
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("PNR", selectedFile);

      try {
        const response = await axios.post(
          `http://localhost:3004/convert`,
          formData,
          {
            responseType: "arraybuffer",
          }
        );
        const fileData = await response.data;

        const url = window.URL.createObjectURL(
          new Blob([fileData], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          })
        );
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `${fileName.split(" ")[0]} Namelist.xlsx`
        );
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error("Error converting file:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

 return (
   <div className="relative top-[120px] w-full flex justify-center items-start space-x-8">
     {/* Main Form Container */}
     <div className="w-[400px] h-full gap-4 flex flex-col items-center bg-gray-50 shadow-lg rounded-xl p-6">
       <div className="mt-0 flex justify-center animate-pulse">
         <img src="/assets/logo5.png" alt="" className="w-[230px]" />
       </div>
       <div className="w-full h-[280px] mt-16">
         <form
           onSubmit={handleSubmit}
           className="w-full flex flex-col items-center pnrForm gap-6"
         >
           <p className="text-blue-700 font-bold">{fileName}</p>
           <input
             className="hidden"
             type="file"
             id="PNR"
             name="PNR"
             onChange={handleFileChange}
           />
           <label
             htmlFor="PNR"
             className="cursor-pointer bg-orange-400 text-white px-6 py-2 rounded mt-2 hover:bg-orange-500"
           >
             UPLOAD
           </label>
           <p className="mt-4">E.g - "ATU87B G"</p>
           <button
             type="submit"
             className="bg-green-400 text-black px-6 py-2 rounded mt-4 hover:bg-green-500"
             disabled={isLoading}
           >
             {isLoading ? (
               <LuLoader2 className="h-6 w-6 animate-spin" />
             ) : (
               <>Download</>
             )}
           </button>
         </form>
       </div>
     </div>

     {/* File Code Information Box Side by Side */}
     <div className="w-[400px] p-6 border border-gray-300 rounded-lg bg-white shadow-md text-center">
       <h2 className="text-lg font-bold mb-4">File Code Information</h2>
       <ul className="text-sm text-left space-y-2">
         {Object.entries(fileCodeInfo).map(([key, value]) => (
           <li
             key={key}
             className="flex justify-between px-4 py-2 bg-gray-100 rounded-lg"
           >
             <strong>{key}</strong> <span>{value}</span>
           </li>
         ))}
       </ul>
     </div>
   </div>
 );
};

export default FormUpload;
