import { useEffect, useRef, useState, type ComponentProps } from "react";
import Button from "../helpers/Button";

const DELAY = 3000;

function AutoCarousel({ children }: ComponentProps<"div">) {
  const [activeIndex, setActiveIndex] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<number | null>(null);
  const startAutoScroll = () => {
    if (!Array.isArray(children) || timeRef.current) return;
    const intervalId = setInterval(() => {
      setActiveIndex((ind) => (ind + 1) % children?.length);
    }, DELAY);
    timeRef.current = intervalId;
  };
  const next = () => {
    if (timeRef.current) {
      clearInterval(timeRef.current);
      timeRef.current = null;
    }
    if (!Array.isArray(children)) return;
    setActiveIndex((ind) => (ind + 1) % children?.length);
  };
  const prev = () => {
    if (timeRef.current) {
      clearInterval(timeRef.current);
      timeRef.current = null;
    }
    if (!Array.isArray(children)) return;
    setActiveIndex((ind) => {
      if (ind <= 0) return children.length - 1;
      return ind - 1;
    });
  };
  useEffect(() => {
    if (mainRef.current !== null) {
      const width = mainRef.current.clientWidth;
      mainRef.current?.scrollTo({
        left: width * activeIndex,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);
  useEffect(() => {
    startAutoScroll();
    return () => {
      if (timeRef.current) clearInterval(timeRef.current);
    };
  }, []);
  if (!Array.isArray(children)) {
    return children;
  }
  return (
    <>
      <div
        ref={mainRef}
        className="w-full min-w-0 flex bg-red-500 overflow-hidden scroll-smooth"
      >
        {children.map((child, index) => (
          <div key={"child-" + index} className="shrink-0 w-full">
            {child}
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-3 gap-3">
        <Button onClick={prev}>Previous</Button>
        <Button onClick={next}>Next</Button>
        <Button onClick={startAutoScroll}>Auto Scroll</Button>
      </div>
    </>
  );
}

const CARDS = [
  {
    id: 0,
    title: "Card 0",
  },
  {
    id: 1,
    title: "Card 1",
  },
  {
    id: 2,
    title: "Card 2",
  },
  {
    id: 3,
    title: "Card 3",
  },
  {
    id: 4,
    title: "Card 4",
  },
];

function AutoCarouselTest() {
  return (
    <section className="flex flex-col items-center">
      <h2 className="text-4xl font-semibold mb-2">Auto Carousel</h2>
      <div className="w-[400px] h-30">
        <AutoCarousel>
          {CARDS.map((card) => (
            <div
              key={card.id}
              className="h-50 flex justify-center items-center border-2"
            >
              {card.title}
            </div>
          ))}
        </AutoCarousel>
      </div>
    </section>
  );
}

export default AutoCarouselTest;
