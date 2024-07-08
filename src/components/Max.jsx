import React from "react";

const Max = ({ data }) => {
  return (
    <div className="w-full flex flex-col text-white border border-slate-300 rounded-lg p-4 mt-2 bg-slate-900 bg-opacity-90 backdrop-blur-md shadow-lg hover:shadow-xl transition duration-300 ease-in-out relative z-10 justify-center items-center h-[12vh] md:mt-5">
      <p className="text-3xl">Max: {data.score} kg</p>
    </div>
  );
};

export default Max;
