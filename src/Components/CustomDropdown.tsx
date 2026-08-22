import { useEffect, useMemo, useRef, useState } from "react";

const NAMES = [
  {
    id: 0,
    name: "Shiva",
  },
  {
    id: 1,
    name: "Poorvi",
  },
  {
    id: 2,
    name: "DJ",
  },
  {
    id: 3,
    name: "Swathi",
  },
  {
    id: 4,
    name: "Venky",
  },
];

function CustomDropdown() {
  const [show, setShow] = useState(false);
  const [selectedId, setSelectedId] = useState(-1);
  const [hoverId, setHoverId] = useState(-1);
  const hoverIdRef = useRef(hoverId);
  const selectedItem = useMemo(() => {
    return NAMES.find((item) => item.id === selectedId);
  }, [selectedId]);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const toggleDropdown = () => {
    setShow((show) => !show);
  };
  const onSelect = (id: number) => {
    setSelectedId(id);
    setShow(false);
    setHoverId(-1);
  };
  useEffect(() => {
    hoverIdRef.current = hoverId;
  }, [hoverId]);
  useEffect(() => {
    setHoverId(-1);
  }, [show]);
  useEffect(() => {
    const clickListener = (e: PointerEvent) => {
      if (
        dropdownRef.current === null ||
        dropdownRef.current.contains(e?.target as Node)
      ) {
        return;
      }
      setShow(false);
    };
    document.addEventListener("click", clickListener);
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          setHoverId((id) => {
            return (id + 1) % NAMES.length;
          });

          break;
        case "ArrowUp":
          setHoverId((id) => {
            if (id <= 0) return NAMES.length - 1;
            return id - 1;
          });
          break;
        case "Enter":
          if (hoverIdRef.current >= 0 && hoverIdRef.current < NAMES.length) {
            onSelect(hoverIdRef.current);
          }
          break;
        case "Escape":
          setShow(false);
          break;
        default:
          break;
      }
    };
    dropdownRef.current?.addEventListener("keyup", handleKeyUp);
    return () => {
      document.removeEventListener("click", clickListener);
      dropdownRef.current?.removeEventListener("keyup", handleKeyUp);
    };
  }, []);
  return (
    <section className="flex flex-col items-center">
      <h2 className="text-4xl font-semibold mb-2">Custom Dropdown</h2>
      <div ref={dropdownRef} className="w-75 h-12.5 relative">
        <button
          onClick={toggleDropdown}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); // Prevents Enter from simulating a click
            }
          }}
          className="w-full h-full text-left p-2 border rounded-md cursor-pointer bg-cyan-300"
        >
          {selectedItem?.name}
          <span
            className={`absolute top-4 right-3 ${show ? "rotate-180" : ""}`}
          >
            ▼
          </span>
        </button>
        {show && (
          <div className="absolute top-12.5 w-full border border-t-0">
            <ul>
              {NAMES.map((name) => (
                <li
                  onClick={() => onSelect(name.id)}
                  key={name.id}
                  className={`p-2 hover:bg-gray-300 border-b cursor-pointer last:border-0
                      ${selectedId === name.id ? "bg-blue-700 text-white" : ""}
                     ${hoverId === name.id ? "bg-amber-200" : ""}`}
                >
                  {name.name}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}

export default CustomDropdown;
