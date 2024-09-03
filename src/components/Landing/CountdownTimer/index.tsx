import { useState, useEffect } from "react";

type CoundownTimerProps = {
  targetDate?: string;
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

export default function CountdownTimer({ targetDate }: CoundownTimerProps) {
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

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="my-24 flex flex-col items-center justify-center text-white">
      <h2 className="mb-6 text-xl">Entradas disponibles en:</h2>
      <div className="flex space-x-6">
        <TimeUnitCircle label="Días" value={timeLeft.days} max={365} />
        <TimeUnitCircle label="Horas" value={timeLeft.hours} max={24} />
        <TimeUnitCircle label="Minutos" value={timeLeft.minutes} max={60} />
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
            strokeWidth="6"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50%"
            cy="50%"
          />
          <circle
            className="text-white"
            strokeWidth="6"
            strokeDasharray={`${percentage} ${circumference}`}
            strokeLinecap="round"
            stroke="currentColor"
            fill="transparent"
            r={radius}
            cx="50%"
            cy="50%"
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
