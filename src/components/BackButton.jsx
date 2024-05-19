import React from "react";
import { TiArrowBack } from "react-icons/ti";
import { useHistory } from "react-router-dom";

const BackButton = () => {
  const history = useHistory();
  const handlePreviousSite = () => {
    history.goBack();
  };
  return (
    <div className="absolute left-2 bottom-20 md:left-[350px]">
      <button
        className="border-2 p-2 border-green-700 rounded-sm md:w-[100px] md:rounded-md md:flex md:justify-center md:bg-green-300"
        onClick={handlePreviousSite}
      >
        <TiArrowBack size={30} className="text-green-700 md:text-green-800" />
      </button>
    </div>
  );
};

export default BackButton;
