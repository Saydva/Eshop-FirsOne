import { useState, type ReactNode } from "react";
import { Menu } from "react-feather";

type NavbarProps = {
  children?: ReactNode;
};

const Navbar = ({ children }: NavbarProps) => {
  const [open, setOpen] = useState(false);
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
          <ul
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            onMouseLeave={() => setOpen(false)}
          >
            <li onClick={() => setOpen(false)}>
              <a>Homepage</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="navbar-center">Center</div>
      <div className="navbar-end">
        <div className="btn btn-ghost btn-circle">{children}</div>
      </div>
    </div>
  );
};

export default Navbar;
