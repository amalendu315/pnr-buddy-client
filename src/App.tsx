
import { Routes, Route } from "react-router-dom";
import FormUpload from './components/FormUpload';
import FlightDataComponent from "./components/FlightData";
import Home from "./components/Home";
import StatusUpload from "./components/StatusUpload";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/namelist" element={<FormUpload />} />
      <Route path="/pnrdetails" element={<FlightDataComponent />} />
      <Route path="/flightops" element={<StatusUpload />} />
    </Routes>
  );
}

export default App;
