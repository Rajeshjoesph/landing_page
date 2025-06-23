import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./Pages/Navbar.jsx";
import HeroPage from "./Pages/HeroPage";
import AboutUs from "./Pages/Aboutus";
import ContactSection from "./Pages/ContactSection";
import Footer from "./Pages/FooterPage.jsx";
import Product from "./Pages/Products.jsx";
import GracePackaging from "./Pages/GracePackaging.jsx";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div>
      {/* <Navbar />
      <HeroPage /> */}
      {/* <Product/> */}
      {/* <ContactSection /> */}
      <GracePackaging />
      {/* <AboutUs />
      <Footer/> */}
      {/* <div className="p-6">
        <h1 className="text-3xl font-bold">Welcome to Grace Packing!</h1>
      </div> */}
    </div>
  );
}

export default App;
