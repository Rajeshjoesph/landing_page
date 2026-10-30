import { useEffect, useState } from "react";
import "./App.css";
import GracePackaging from "./Pages/GracePackaging.jsx";
import BoxDesigner from "./Pages/BoxDesigner";

function App() {
  const [hash, setHash] = useState(window.location.hash);
  useEffect(() => {
    const on = () => setHash(window.location.hash);
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);

  if (hash === "#/box-designer") return <BoxDesigner />;
  return <GracePackaging />;
}

export default App;