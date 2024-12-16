import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import Sidebar from "./components/ui/sidebar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="flex min-h-screen">
        {/* <Sidebar /> */}
        <div className="flex-grow flex flex-col">
          <Header />
          <main className="flex-grow bg-gradient-to-b from-blue-400 to-white flex flex-col items-center">
            <App />
            <Toaster position="top-center" />
          </main>
          <Footer />
        </div>
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
