import { LogOut } from "react-feather";
import { Logoutcontroller } from "./user.controller";

const Logout = () => {
  const user = localStorage.getItem("user");
  const userId = user ? JSON.parse(user).id : null;

  return (
    <button
      className="btn btn-circle size-6 p-1 ml-2"
      onClick={() => {
        Logoutcontroller(userId);
      }}
    >
      <LogOut />
    </button>
  );
};

export default Logout;
