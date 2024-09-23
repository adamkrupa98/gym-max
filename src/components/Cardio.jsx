import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm, userForm } from "react-hook-form";
const Cardio = () => {
  const [selectedRange, setSelectedRange] = useState("week");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  const modalContent = (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg relative w-[500px]">
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-2 right-2 text-gray-700 text-3xl leading-none"
        >
          &times;
        </button>
        <p className="text-center text-2xl">Uzupełnij dane treningu</p>
        <div className="mt-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control flex flex-col">
              <label className="text-xl">Czas (min.)</label>
              <input type="number" name="time" {...register("time")} />
            </div>
            <div className="form-control flex flex-col">
              <label className="text-xl">Kcal</label>
              <input type="number" name="kcal" {...register("kcal")} />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
  return (
    <div className="flex h-screen mt-[-155px] justify-center">
      <div className="mt-[20vh] max-w-[800px] w-full">
        <div className="flex justify-between">
          <div className="flex justify-between w-[50%]">
            <button
              className={`text-xl border w-[35%] rounded-md ${selectedRange === "week" ? "bg-[#f0a04b]" : "bg-gray-400"} text-white p-1`}
              onClick={() => setSelectedRange("week")}
            >
              Tydzień
            </button>
            <button
              className={`text-xl border w-[35%] rounded-md ${selectedRange === "month" ? "bg-[#f0a04b]" : "bg-gray-400"} text-white p-1`}
              onClick={() => setSelectedRange("month")}
            >
              Miesiąc
            </button>
            <button
              className={`text-xl border w-[35%] rounded-md ${selectedRange === "halfyear" ? "bg-[#f0a04b]" : "bg-gray-400"} text-white p-1`}
              onClick={() => setSelectedRange("halfyear")}
            >
              Pół roku
            </button>
            <button
              className={`text-xl border w-[35%] rounded-md ${selectedRange === "year" ? "bg-[#f0a04b]" : "bg-gray-400"} text-white p-1`}
              onClick={() => setSelectedRange("year")}
            >
              Rok
            </button>
          </div>
          <div>
            <button
              className="bg-[#f0a04b] text-2xl p-1 rounded-md border-2 text-white hover:border-[#ab733771]"
              onClick={() => setIsModalOpen(true)}
            >
              Dodaj cardio
            </button>
          </div>
        </div>
      </div>
      {isModalOpen && ReactDOM.createPortal(modalContent, document.body)}
    </div>
  );
};

export default Cardio;
