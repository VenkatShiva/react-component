import { useEffect, useRef, useState, type ChangeEvent } from "react";
import Input from "../helpers/Input";

const DELAY = 500;

interface Product {
  id: number;
  title: string;
}

function DebouncedSearch() {
  const [text, setText] = useState("");
  const [products, setProducts] = useState<Array<Product>>([]);
  const timeoutRef = useRef<number | null>(null);
  const controllerRef = useRef<AbortController | null>(null);

  const callApi = (value: string) => {
    if (!value) return;
    if (controllerRef.current !== null) {
      controllerRef.current.abort();
    }

    const controller = new AbortController();
    controllerRef.current = controller;
    const query = encodeURIComponent(value);
    fetch(`https://dummyjson.com/products?title=${query}`, {
      signal: controllerRef.current.signal,
    })
      .then((resp) => resp.json())
      .then((resp) => {
        const prdList = resp.products.map((prd: Product) => ({
          id: prd.id,
          title: prd.title,
        }));
        setProducts(prdList);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
        console.error(err);
      })
      .finally(() => {
        if (controllerRef.current === controller) controllerRef.current = null;
      });
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (!value) {
      setProducts([]);
      return;
    }
    timeoutRef.current = setTimeout(() => {
      callApi(value);
    }, DELAY);
  };
  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (controllerRef.current !== null) {
        controllerRef.current.abort();
      }
    };
  }, []);
  return (
    <section className="flex flex-col items-center">
      <h2 className="text-4xl font-semibold mb-2">Debounced Search</h2>
      <div className="w-75">
        <Input
          value={text}
          onChange={onChange}
          type="search"
          placeholder="Enter text"
        />
        {products.length ? (
          <ul>
            {products.map((prd) => (
              <li key={prd.id}>{prd.title}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

export default DebouncedSearch;
