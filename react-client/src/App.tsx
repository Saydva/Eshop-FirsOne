import { useState } from "react";
import Navbar from "./navbar/Navbar";
import ChangeThemeButton from "./navbar/ChangeTheme.button";
import AppBody from "./App-body/AppBody";
import ProductCard from "./product/productCard/ProductCard";

function App() {
  const [index, setIndex] = useState(0);
  const themes = ["valentine", "nord", "caramellatte", "wireframe", "business"];

  const handleTheme = () => {
    setIndex((prevIndex) => (prevIndex + 1) % themes.length);
  };

  return (
    <div className="min-h-screen flex flex-col" data-theme={themes[index]}>
      <Navbar>
        <ChangeThemeButton handler={handleTheme} />
      </Navbar>
      <AppBody />
    </div>
  );
}

export default App;
