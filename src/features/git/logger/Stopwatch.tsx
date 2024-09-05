"use client";

import { useEffect, useState } from "react";

interface StopwatchProps {
  issueId: number;
  projectId: number;
  resetAfterSuccess: boolean;
  onRequestLogTime: (issueId: number, seconds: number) => void;
}

export const Stopwatch: React.FC<StopwatchProps> = ({
  issueId,
  resetAfterSuccess,
  onRequestLogTime,
}) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => setSeconds((prev) => prev + 1), 1000);
      setIntervalId(id);
      return () => clearInterval(id);
    } else if (intervalId) {
      clearInterval(intervalId);
    }
  }, [isRunning]);

  // Reset le temps si le parent déclenche `resetAfterSuccess`
  useEffect(() => {
    if (resetAfterSuccess) {
      setSeconds(0);
    }
  }, [resetAfterSuccess]);

  // Commence ou arrête le chronomètre
  const handleStartStop = () => {
    setIsRunning((prevState) => !prevState);
  };

  // Log le temps et stoppe le chronomètre
  const handleLogTime = () => {
    setIsRunning(false);
    onRequestLogTime(issueId, seconds);
  };

  // Réinitialise le chronomètre à 0
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };

  // Formate l'affichage du temps
  const formattedTime = `${String(Math.floor(seconds / 60)).padStart(
    2,
    "0"
  )}:${String(seconds % 60).padStart(2, "0")}`;

  return (
    <div className="flex flex-col sm:flex-row items-center w-full p-2 sm:py-4">
      {/* Affichage du temps formaté */}
      <div className="w-[110%]">
        <span className="text-lg font-bold block text-center sm:text-xl md:text-2xl">
          {formattedTime}
        </span>
      </div>

      {/* Boutons en ligne pour desktop, en colonne pour mobile */}
      <div className="flex flex-col sm:flex-row w-[120%] space-y-2 sm:space-y-0 sm:space-x-2">
        <button
          onClick={handleStartStop}
          className={`w-full p-2 ${
            isRunning ? "bg-orange-500" : "bg-green-500"
          } text-white rounded text-center font-bold`}
        >
          {isRunning ? "Pause" : "Start"}
        </button>
        <button
          onClick={handleLogTime}
          className="w-full p-2 bg-red-500 text-white rounded text-center font-bold"
        >
          Log Time
        </button>
        <button
          onClick={handleReset}
          className="w-full p-2 bg-gray-500 text-white rounded text-center font-bold"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
