import React from "react";

const Max = ({ data }) => {
  return (
    <div className="w-full flex flex-col text-gray-900 border border-slate-400 rounded-lg p-4 mt-2 bg-gray-200 bg-opacity-30 backdrop-blur-md shadow-lg hover:shadow-xl transition duration-300 ease-in-out relative z-10 justify-center items-center h-[12vh] md:mt-5 md:ml-1">
      <p className="text-3xl">Max: {data.score} kg</p>
    </div>
  );
};

export default Max;
