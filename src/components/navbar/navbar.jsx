import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

// import logo from "../../assets/logo.svg";

const Menu = () => (
  <>
    <p>
      <a href="/home">Home</a>
    </p>
    <p>
      <a href="/face-detection">Face Detection</a>
    </p>
    <p>
      <a href="/image-detection">Image Detection</a>
    </p>
    <p>
      <a href="/sign-detection">Sign Language Detection</a>
    </p>
  </>
);

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="tensorflow__navbar">
      <div className="tensorflow__navbar-links">
        <div className="tensorflow__navbar-links_logo">
          {/* <img src={logo} alt="logo" /> */}
        </div>
        <div className="tensorflow__navbar-links_container">
          <Menu />
        </div>
      </div>
      <div className="tensorflow__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#fff"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="tensorflow__navbar-menu_container scale-up center">
            <div className="tensorflow__navbar-menu_container-links">
              <Menu />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
