import { Link } from "react-router-dom";

const TopExcerciseBox = ({ exercise, max = 0, date = "-", exerciseId }) => {
  return (
    <Link
      to={`/exercise/details/${exerciseId}`}
      className="flex items-center justify-center"
    >
      <div className="bg-[#f3efd8] p-4 m-4 drop-shadow-2xl hover:scale-125 duration-100 h-60 w-[200px]">
        <h1 className="text-2xl md:text-3xl font-medium p-4">{exercise}</h1>
        <p className="text-xl md:text-2xl mt-1">Waga: {max}kg</p>
        <p className="text-xl md:text-2xl mt-14 te">{date}</p>
      </div>
    </Link>
  );
};

export default TopExcerciseBox;
