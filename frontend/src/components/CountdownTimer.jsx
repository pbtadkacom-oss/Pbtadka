import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    timerComponents.push(
      <div key={interval} className="flex flex-col items-center bg-black/80 backdrop-blur-md px-3 py-2 min-w-[60px]">
        <span className="text-xl font-black text-white leading-none">
            {timeLeft[interval] < 10 ? `0${timeLeft[interval]}` : timeLeft[interval]}
        </span>
        <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 mt-1">{interval}</span>
      </div>
    );
  });

  return (
    <div className="flex gap-[2px] rounded-lg overflow-hidden border border-white/10 shadow-2xl">
      {timerComponents.length ? timerComponents : (
        <div className="bg-primary-red px-6 py-2 text-white font-black uppercase tracking-widest text-xs">Released Now!</div>
      )}
    </div>
  );
};

export default CountdownTimer;
