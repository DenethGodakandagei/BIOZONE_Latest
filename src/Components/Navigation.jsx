import React, { useState, useRef, useEffect } from "react";
import Logo from "../Assest/Web_Images/BioZoneLogo.png";
import { PrimaryButton } from "./Elements/Buttons";
import { useSpring, animated } from "react-spring";
import { HiOutlineMenuAlt3 } from "react-icons/hi"; // For hamburger icon
import { AiOutlineClose } from "react-icons/ai"; // For close icon

const Navigation = ({ homeRef, locationsRef, galleryRef, contactRef }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [isRotating, setIsRotating] = useState(true);

  // Handle toggling the menu
  const toggleMenu = () => {
    if (!isOpen) {
      setIsMenuVisible(true); // Show menu when opening
      setIsOpen(true);
      setIsRotating(false); // Reset rotation when opening
    } else {
      // Wait for animation before hiding menu
      setIsOpen(false);
      setIsRotating(true); // Trigger rotation when closing
    }
  };

  // Wait for the close animation before unmounting
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => setIsMenuVisible(false), 300); // Adjust timeout to match animation duration
      return () => clearTimeout(timer); // Cleanup timeout
    }
  }, [isOpen]);

  // Animation for the mobile menu (both opening and closing)
  const menuAnimation = useSpring({
    transform: isOpen ? "translateY(0%)" : "translateY(-100%)",
    opacity: isOpen ? 1 : 0,
    config: { tension: 200, friction: 25 },
  });

  const scrollToSection = (sectionRef) => {
    window.scrollTo({
      top: sectionRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  const navLinks = ["Home", "Locations", "Gallery", "Contact us"];
  const sectionRefs = [homeRef, locationsRef, galleryRef, contactRef];

  return (
    <nav className="shadow-md">
      <div className="navcard 2xl:px-56 xl:px-36 px-5 w-full h-16 lg:h-auto  bg-[#f9fefcc2] backdrop-blur-[20px] py-4 lg:flex items-center justify-between shadow-sm fixed top-0 left-0 z-50">
        {/* Logo */}
        <div className="flex flex-row justify-between z-50 -mt-3">
          <div className="flex items-center cursor-pointer w-auto">
            <img src={Logo} alt="Logo" className="w-14 h-auto" />
          </div>

          {/* Hamburger Icon */}
          <div className="md:hidden flex flex-row justify-between w-auto z-50">
            <button
              onClick={toggleMenu}
              className={`text-2xl focus:outline-none transform transition-transform duration-300 ${
                isRotating ? "rotate-0" : "-rotate-180"
              }`}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <AiOutlineClose /> : <HiOutlineMenuAlt3 />}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex space-x-12 ml-28 text-[#606060] text-[16px] font-normal">
          {navLinks.map((link, index) => (
            <li
              key={index}
              className="relative group hover:text-black cursor-pointer"
              onClick={() => scrollToSection(sectionRefs[index])} // Add onClick handler
            >
              {link}
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-gradient-to-r from-[#159D72] to-[#07958F] transition-all duration-300 group-hover:w-full"></span>
            </li>
          ))}
        </ul>

        {/* Desktop Button */}
        <div className="hidden lg:block">
          <PrimaryButton TextContent={"Online Student Portal"} />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuVisible && (
        <animated.div
          style={menuAnimation}
          className="fixed  top-0 left-0 w-screen bg-[#f9fefc77] backdrop-blur-[20px] shadow-lg z-40 pt-0 "
        >
          <div className="flex items-center mb-6 px-6">
            <img src={Logo} alt="Logo" className="w-10 h-10" />
          </div>
          <ul className="flex flex-col items-start p-6 space-y-5 ">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href="#"
                  className="block text-[14px] text-gray-600 pl-2 hover:text-teal-600"
                  onClick={() => scrollToSection(sectionRefs[index])}
                >
                  {link}
                </a>
              </li>
            ))}
            <li>
              <button className="w-full bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700">
                Online Student Portal →
              </button>
            </li>
          </ul>
        </animated.div>
      )}
    </nav>
  );
};

export default Navigation;
