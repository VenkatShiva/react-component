import { useEffect, useRef } from "react";
import "./styles.css";

const COLORS: Array<string> = [
  "red",
  "blue",
  "yellow",
  "orange",
  "green",
  "pink",
  "violet",
];

function MusicBox() {
  const refs = useRef<Array<HTMLDivElement | null>>([]);
  const timeRef = useRef<number | null>(null);
  const startMusic = () => {
    if (timeRef.current) {
      clearInterval(timeRef.current);
    }
    const callback = () => {
      refs.current.forEach((element) => {
        if (!element) return;
        element.style.height = `${Math.round(Math.random() * 100)}%`;
      });
    };
    callback();
    timeRef.current = setInterval(callback, 500);
  };
  const pause = () => {
    if (timeRef.current) {
      clearInterval(timeRef.current);
      timeRef.current = null;
    }
  };
  const stop = () => {
    if (timeRef.current) {
      clearInterval(timeRef.current);
      timeRef.current = null;
    }
    refs.current.forEach((element) => {
      if (!element) return;

      element.style.height = "";
    });
  };
  useEffect(() => {
    startMusic();
    return () => {
      if (timeRef.current) {
        clearInterval(timeRef.current);
        timeRef.current = null;
      }
    };
  }, []);
  return (
    <section className="p-4 flex flex-col items-center">
      <div className="w-125 h-62.5 border-2 flex items-end">
        {COLORS.map((color: string, index: number) => (
          <div
            ref={(ref: HTMLDivElement | null) => {
              refs.current[index] = ref;
            }}
            key={"color-" + index}
            style={{
              background: color,
            }}
            className="flex-1 transition-height h-4"
          ></div>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <button
          onClick={startMusic}
          className="bg-blue-600 p-2 px-3 text-white cursor-pointer"
        >
          Start
        </button>
        <button
          onClick={pause}
          className="bg-blue-600 p-2 px-3 text-white cursor-pointer"
        >
          Pause
        </button>
        <button
          onClick={stop}
          className="bg-blue-600 p-2 px-3 text-white cursor-pointer"
        >
          Stop
        </button>
      </div>
    </section>
  );
}

export default MusicBox;
