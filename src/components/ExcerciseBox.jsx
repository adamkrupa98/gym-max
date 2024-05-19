import { Link } from "react-router-dom";

const ExcerciseBox = ({ exercise, max = 0, date = "-", exerciseId }) => {
  return (
    <div className="bg-white p-4 h-full w-full flex items-center md:flex-col mt-5">
      <Link
        to={`/exercise/details/${exerciseId}`}
        className="flex md:flex-col items-center justify-center p-4 md:mt-1 shadow-xl hover:scale-125 duration-100 md:w-[200px] max-w-[400px] w-full"
      >
        <h1 className="text-3xl md:text-3xl font-medium p-4 first-letter:uppercase h-[105px] md:w-[200px] w-full">
          {exercise}
        </h1>
        <div className="grid w-[200px] md:w-full items-center">
          <p className="text-xl md:text-2xl font-medium">Waga: {max}kg</p>
          <p className="text-xl md:text-2xl font-medium mt-14">{date}</p>
        </div>
      </Link>
    </div>
  );
};

export default ExcerciseBox;
