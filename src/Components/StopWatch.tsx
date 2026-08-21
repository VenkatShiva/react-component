import { useEffect, useRef, useState } from "react";
import Button from "../helpers/Button";

function convertSec(secs: number) {
  let number = secs || 0;
  const hr = Math.floor(number / 3600);
  const min = Math.floor((number % 3600) / 60);
  const sec = number % 60;
  return {
    hr,
    min,
    sec,
  };
}

const format = (value: number) => String(value).padStart(2, "0");

function StopWatch() {
  const [seconds, setSeconds] = useState<number>(0);
  const counterRef = useRef<number | null>(null);
  const { hr, min, sec } = convertSec(seconds);

  const start = () => {
    if (counterRef.current !== null) return;
    counterRef.current = setInterval(() => {
      setSeconds((num) => num + 1);
    }, 1000);
  };
  const pause = () => {
    if (counterRef.current !== null) {
      clearInterval(counterRef.current);
    }
    counterRef.current = null;
  };
  const stop = () => {
    setSeconds(0);
    pause();
  };
  useEffect(() => {
    return pause;
  }, []);
  return (
    <section className="flex flex-col items-center">
      <h2 className="text-4xl font-semibold mb-2">Stop Watch</h2>
      <div className="flex gap-2 items-center">
        <div className="p-5 bg-gray-200 rounded-md font-bold text-3xl w-20 text-center">
          {format(hr)}
        </div>
        <span className="font-bold text-3xl">:</span>
        <div className="p-5 bg-gray-200 rounded-md font-bold text-3xl w-20 text-center">
          {format(min)}
        </div>
        <span className="font-bold text-3xl">:</span>
        <div className="p-5 bg-gray-200 rounded-md font-bold text-3xl w-20 text-center">
          {format(sec)}
        </div>
      </div>

      <div className="flex gap-3 mt-3">
        <Button onClick={start}>Start</Button>
        <Button onClick={pause}>Pause</Button>
        <Button onClick={stop}>Stop</Button>
      </div>
    </section>
  );
}

export default StopWatch;
