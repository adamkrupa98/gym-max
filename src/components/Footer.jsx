import React from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaGithubSquare } from "react-icons/fa";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  return (
    <div className="w-full h-auto bg-[#f0a04b] flex p-4 items-center justify-center">
      <p className="w-1/3 text-center  text-white">Kontakt</p>
      <div className="flex w-1/3 mx-auto item-center justify-between">
        <FaFacebookSquare size={35} className="text-white" />
        <FaSquareInstagram size={35} className="text-white" />
        <FaGithubSquare size={35} className="text-white" />
      </div>
      <p className="w-1/3 text-center  text-white">Regulamin</p>
    </div>
  );
};

export default Footer;
