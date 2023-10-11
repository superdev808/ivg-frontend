
import { useState, useRef } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import SearchBar from "../searchBar";
import useOutsideClick from "@/hooks/useOutsideClick";
import useCheckMobileScreen from "@/hooks/useCheckMobileScreen";
const Navigation = () => {
  // toggle sidebar
  const [isOpen, setIsOpen] = useState(false);
  const boxRef = useRef(null);


  const navLinks = [
      {id: 'guides',title: 'Guides', link: '/guides'},
      {id:'calculators',title: 'Calculators', link: '/calculators'},
      // {id:'explore',title: 'Explore', link: '/explore'},

  ]

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu: () => void = () => {
    setIsOpen(false);
  };


  useOutsideClick(boxRef, closeMenu);
  useCheckMobileScreen(closeMenu);

  return (
    <div ref={boxRef} className="absolute z-2 w-full border-bottom-1 border-100	 bg-white shadow-1 ">
      
      <Sidebar isOpen={isOpen} toggle={toggle} navLinks={navLinks} />
      <Navbar isOpen={isOpen} toggle={toggle} navLinks={navLinks}/>
      
    </div>
  );
};

export default Navigation;