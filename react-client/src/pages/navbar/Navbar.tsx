import { useState, type ReactNode } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Menu } from "react-feather";
import Logout from "../../components/auth/Logout";
import { Link } from "react-router";

type NavbarProps = {
  children?: ReactNode;
};

const Navbar = ({ children }: NavbarProps) => {
  const [open, setOpen] = useState(false);
  const { isLoggedIn, user } = useAuthStore();

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div className="navbar bg-base-100 shadow-sm mb-3">
      <div className="navbar-start">
        <div className={`dropdown ${open ? "dropdown-open" : ""}`}>
          <div
            role="button"
            className="btn btn-ghost btn-circle"
            onClick={toggleMenu}
          >
            <Menu />
          </div>
          {open && (
            <ul
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
              onMouseLeave={() => setOpen(false)}
            >
              <li onClick={() => setOpen(false)}>
                <Link className="btn m-1" to="/">
                  HomePage
                </Link>
              </li>
              {!isLoggedIn ? (
                <div>
                  <li onClick={() => setOpen(false)}>
                    <Link className="btn m-1" to="/register">
                      Register
                    </Link>
                  </li>
                  <li onClick={() => setOpen(false)}>
                    <Link className="btn m-1" to="/login">
                      Login
                    </Link>
                  </li>
                </div>
              ) : null}
            </ul>
          )}
        </div>
      </div>
      <div className="navbar-center">{isLoggedIn ? user?.name : "guest"}</div>
      {isLoggedIn ? <Logout /> : null}
      <div className="navbar-end gap-3">
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Navbar;
