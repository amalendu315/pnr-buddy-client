
import { Routes, Route } from "react-router-dom";
import Header from './components/Header';
import FormUpload from './components/FormUpload';
import Footer from './components/Footer';
import FlightDataComponent from "./components/FlightData";

function App() {
  return (
    <div>
        <Header /> {/* Include the Header component */}
        <Routes>
          <Route path="/" element={<FormUpload />} />
          <Route path="/pnrdetails" element={<FlightDataComponent />} />
          {/* <Route path="/contact" element={<Contact />} /> */}
          {/* ... other routes */}
        </Routes>
        <Footer />
    </div>
  );
}

export default App;
