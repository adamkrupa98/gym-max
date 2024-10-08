import React from "react";
import { MdDelete } from "react-icons/md";

const CardioTrainigBox = ({ trainigId, date, kcal, time }) => {
  const formattedDate = date.toLocaleDateString();
  return (
    <div className="w-full flex-col bg-transparent items-center h-full mb-2 row">
      <div className="flex items-center justify-between border border-slate-300 rounded-lg p-4 mt-2 bg-slate-800 bg-opacity-60 backdrop-blur-md shadow-lg hover:shadow-xl transition duration-300 ease-in-out">
        <h1 className="text-2xl font-semibold text-white first-letter:uppercase w-1/5">
          {formattedDate}
        </h1>
        <div className="flex w-full justify-left">
          <p className="text-lg font-medium text-white hidden md:block ml-5">
            Czas trwania: {time}min
          </p>
          <p className="text-lg font-medium text-white hidden md:block ml-10">
            Spalone kalorie: {kcal}
          </p>
        </div>
        <button className="border-2 rounded-md bg-red-500 p-1">
          <MdDelete color="white" size="20" />
        </button>
      </div>
    </div>
  );
};

export default CardioTrainigBox;
