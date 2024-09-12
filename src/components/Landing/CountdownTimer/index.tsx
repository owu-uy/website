"use client";

import { useState, useEffect } from "react";

type CountdownTimerProps = {
  targetDate: string;
  title: string;
};

type TimeLeftProps = {
  days: number;
  hours: number;
  minutes: number;
};

type TimeUnitCircleType = {
  label: string;
  value: number;
  max: number;
};

export default function CountdownTimer({ targetDate, title }: CountdownTimerProps) {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft: TimeLeftProps;

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Clear the interval when the component unmounts or targetDate changes
    return () => clearInterval(timer);
  }, [targetDate]); // Add targetDate to the dependency array

  return (
    <div className="flex flex-col items-center justify-center text-white">
      {title ? <h2 className="mb-6 text-xl">{title}</h2> : null}
      <div className="flex space-x-6">
        <TimeUnitCircle label="Días" max={365} value={timeLeft.days} />
        <TimeUnitCircle label="Horas" max={24} value={timeLeft.hours} />
        <TimeUnitCircle label="Minutos" max={60} value={timeLeft.minutes} />
      </div>
    </div>
  );
}

function TimeUnitCircle({ label, value, max }: TimeUnitCircleType) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const percentage = (value / max) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-24 w-24">
        <svg className="absolute left-0 top-0 h-full w-full">
          <circle
            className="text-gray-700"
            cx="50%"
            cy="50%"
            fill="transparent"
            r={radius}
            stroke="currentColor"
            strokeWidth="6"
          />
          <circle
            className="text-white"
            cx="50%"
            cy="50%"
            fill="transparent"
            r={radius}
            stroke="currentColor"
            strokeDasharray={`${percentage} ${circumference}`}
            strokeLinecap="round"
            strokeWidth="6"
            style={{ transform: "rotate(-90deg)", transformOrigin: "50% 50%" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-3xl font-bold">{value}</span>
        </div>
      </div>
      <span className="mt-2 text-lg">{label}</span>
    </div>
  );
}
