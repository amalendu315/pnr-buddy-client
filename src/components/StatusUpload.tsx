import React,{useState} from 'react';
import toast from 'react-hot-toast';
import { fetchAkasaStatus, fetchSpicejetStatus } from '../api/flightDataAPI';
import { LuLoader2 } from 'react-icons/lu';

const StatusUpload = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>("Select File");
    const [flightData, setFlightData] = useState<string[]>([]);
    const [errors, setErrors] = useState<string[] | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files.length > 0) {
        setSelectedFile(event.target.files[0]);
        setFileName(event.target.files[0].name);
      }
    };
    const handleCopyButtonClick = () => {
      const flightDataString = flightData.join("\n");
      if (flightData) {
        const textArea = document.createElement("textarea");
        textArea.value = flightDataString;
        document.body.appendChild(textArea);
        textArea.select();

        try {
          document.execCommand("copy");
          toast.success("Flight data copied to clipboard!");
        } catch (err) {
          console.error("Failed to copy text:", err);
          toast.error("Failed to copy text. Please try again.");
        }
        document.body.removeChild(textArea);
      }
    };

    const handleClearButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setFlightData([]);
      setErrors(null);
    };

    const handleSubmit = async (event: React.FormEvent) => {
      setIsLoading(true);
      event.preventDefault();
      if (selectedFile) {
        const formData = new FormData();
        formData.append("PNR", selectedFile);

        const filename = selectedFile?.name.toLowerCase();
        let airline = "";

        if (filename.includes("akasa") || filename.includes("qp")) {
          airline = "akasa";
        } else if (filename.includes("spicejet") || filename.includes("sg")) {
          airline = "spicejet";
        } else {
          toast.error("Unsupported airline.");
          return;
        }

        try {
          let data;
          switch (airline) {
            case "akasa":
              data = await fetchAkasaStatus(formData);
              break;
            case "spicejet":
              data = await fetchSpicejetStatus(formData);
              // data = await fetchSpiceJetData(pnrArray);
              break;
            default:
              setErrors(["Invalid airline selected."]);
              return;
          }
          setFlightData(data.results);
          setErrors(data.errors.length > 0 ? data.errors.join("\n") : null);
        } catch (error:any) {
          setErrors(error.message || "Error fetching flight data.");
        } finally{
          setIsLoading(false);
        }
      }
    };

  return (
    <>
      <div className="relative top-[50px] w-[350px] h-[480px] my-0 mx-auto rounded-xl pt-12 flex flex-col shadow-lg bg-gray-50">
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
            <button
              type="submit"
              className="bg-green-400 text-black px-6 py-2 rounded mt-4 hover:bg-green-500"
              disabled={isLoading}
            >
              FETCH STATUS
            </button>
          </form>
        </div>
      </div>
      {flightData.length && (
        <div className="mt-16 w-full">
          {/* Flight Data Container */}
            <div className="relative">
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={(e) => handleCopyButtonClick()}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Copy Data
                </button>
                {/* <button
                  onClick={handleExport}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Export to Excel
                </button>*/}
                <button
                  onClick={(e) => handleClearButtonClick(e)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Clear Data
                </button>
              </div>
              <div className="max-h-[650px] overflow-y-auto">
                  <ul className="p-4 text-center rounded-md overflow-x-auto whitespace-pre-wrap list-none w-full">
                    {flightData.map((result, index) => (
                      <li key={index}>{result}</li> // Each result on a new line
                    ))}
                  </ul>
              </div>
            </div>
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
      )}
      {isLoading && (
        <LuLoader2 className='w-6 h-6 animate-spin'  />
      )}
    </>
  );
}

export default StatusUpload