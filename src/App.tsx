
import { Routes, Route } from "react-router-dom";
import FormUpload from './components/FormUpload';
import FlightDataComponent from "./components/FlightData";
import Home from "./components/Home";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/namelist" element={<FormUpload />} />
        <Route path="/pnrdetails" element={<FlightDataComponent />} />
        {/* <Route path="/contact" element={<Contact />} /> */}
        {/* ... other routes */}
      </Routes>
  );
}

export default App;
