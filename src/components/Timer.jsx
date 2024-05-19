import React, { useState, useEffect } from "react";

const Timer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const now = new Date();
    const target = new Date(targetDate);

    // Ustawianie obu dat na początek dnia
    now.setHours(0, 0, 0, 0);
    target.setHours(0, 0, 0, 0);

    const difference = target - now;

    // Ustawianie dni na wartość bezwzględną
    const days = Math.abs(Math.floor(difference / (1000 * 60 * 60 * 24)));

    return { days };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-[50vh] flex flex-col py-10">
      <h1 className="text-4xl md:text-6xl lg:text-5xl font-bold">
        Od ostatniego rekordu minęło
      </h1>
      <p className="text-8xl md:text-6xl lg:text-8xl mt-10 text-[#f0a04b]">
        {timeLeft.days} dni
      </p>
    </div>
  );
};

export default Timer;
