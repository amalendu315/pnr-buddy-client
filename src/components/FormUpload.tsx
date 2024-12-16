import React,{useState} from 'react';
import axios from "axios";
import { LuLoader2 } from 'react-icons/lu';

const FormUpload = () => {

    const [isLoading, setIsLoading] = useState(false)
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
          // Make sure the URL is correct for your server
          const response = await axios.post(
            `http://ec2-3-110-55-153.ap-south-1.compute.amazonaws.com:3004/convert`,
            formData,
            {
              responseType: "arraybuffer",
            }
          ); // Important!
          // Access the filename and file data from the response data
          const fileData = await response.data;

          const url = window.URL.createObjectURL(
            new Blob([fileData], {
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            })
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${fileName.split(" ")[0]} Namelist.xlsx`);
          document.body.appendChild(link);
          link.click();
        } catch (error) {
          // Handle error
          console.error("Error converting file:", error);
        } finally{
          setIsLoading(false);
        }
      }
    };

  return (
    <div className="relative top-[240px] w-[350px] h-[480px] my-0 mx-auto rounded-xl pt-12 flex flex-col shadow-lg bg-gray-50">
      <div className="mt-0 flex justify-center animate-pulse">
        <img src="/assets/logo5.png" alt="" className="w-[230px]" />
      </div>
      <div className="w-full h-[280px] mt-16">
        <form
          onSubmit={handleSubmit}
          className="w-full h-[280px] flex flex-col justify-around items-center pnrForm"
        >
          <p className="text-blue-700 font-bold">{fileName}</p>
          <input
            className="hidden"
            type="file"
            id="PNR"
            name="PNR"
            onChange={handleFileChange}
          />
          <label htmlFor="PNR">UPLOAD</label>
          <p>E.g - "ATU87B G"</p>
          <button
            type="submit"
            className="bg-green-400 text-black px-6 py-2 rounded mt-4 hover:bg-green-500"
            disabled={isLoading}
          >
            {isLoading ? <LuLoader2 className="h-6 w-6 animate-spin" /> : <>Download</>}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormUpload
