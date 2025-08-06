import { useEffect, useState } from "react";
import { useUserStore } from "./components/auth/user.store/useUser.store";
import Navbar from "./pages/navbar/Navbar";
import ChangeThemeButton from "./pages/navbar/ChangeTheme.button";
import AdminSidebar from "./pages/admin.sidebar/AdminSidebar";
import { Route, Routes } from "react-router";
import HomePage from "./pages/home/Home";
import ShopingCart from "./pages/navbar/ShopingCart";
import Register from "./components/auth/register.Form/Register";
import Login from "./components/auth/login.Form/Login";

function App() {
  const [index, setIndex] = useState(0);
  const { isLoggedIn, user } = useUserStore();
  const themes = ["valentine", "nord", "caramellatte", "wireframe", "business"];

  useEffect(() => {
    console.log(JSON.parse(JSON.stringify(localStorage.getItem("user"))));
  }, [isLoggedIn, user]);

  const handleTheme = () => {
    setIndex((prevIndex) => (prevIndex + 1) % themes.length);
  };

  return (
    <div className="min-h-screen flex flex-col" data-theme={themes[index]}>
      <Navbar>
        <ShopingCart />
        <ChangeThemeButton handler={handleTheme} />
      </Navbar>
      {user?.role === "admin" ? <AdminSidebar /> : null}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
