import {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type SubmitEvent,
} from "react";
import Input from "../helpers/Input";
import Button from "../helpers/Button";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

const TodoItem = memo(function TodoItem({
  todo,
  onComplete,
  deleteTodo,
}: {
  todo: Todo;
  onComplete: (id: string, value: boolean) => void;
  deleteTodo: (id: string) => void;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const timerRef = useRef<number | null>(null);
  const startDeleteTodo = () => {
    setIsDeleting(true);
    timerRef.current = setTimeout(() => {
      deleteTodo(todo.id);
    }, 5000);
  };
  const undoDelete = () => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setIsDeleting(false);
  };
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);
  return (
    <div className="flex border-b p-2 items-center">
      <input
        onChange={(e) => onComplete(todo.id, e.target.checked)}
        type="checkbox"
        disabled={isDeleting}
        checked={todo.completed}
      />
      <span className="flex-1 ml-2 text-xl font-bold">{todo.title}</span>
      {isDeleting ? (
        <button
          onClick={undoDelete}
          className="bg-blue-600 rounded-md text-white p-1 px-2 cursor-pointer"
        >
          Undo
        </button>
      ) : (
        <button
          onClick={startDeleteTodo}
          className="bg-red-600 rounded-md text-white p-1 px-2 cursor-pointer"
        >
          Delete
        </button>
      )}
    </div>
  );
});

function UndoTodoList() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Array<Todo>>([]);
  const addTodo = () => {
    if (!text) return;
    const title = text;
    setTodos((prev) => {
      return [{ id: crypto.randomUUID(), title, completed: false }, ...prev];
    });
    setText("");
  };
  const onSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    addTodo();
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setText(value);
  };
  const onComplete = useCallback((id: string, value: boolean) => {
    setTodos((prev) => {
      return prev.map((tod) => {
        if (tod.id === id) {
          return {
            ...tod,
            completed: value,
          };
        }
        return tod;
      });
    });
  }, []);
  const deleteTodo = useCallback((id: string) => {
    setTodos((prev) => {
      return prev.filter((tod) => tod.id !== id);
    });
  }, []);
  return (
    <section className="flex flex-col items-center">
      <h2 className="text-4xl font-semibold mb-2">Undo Todo List</h2>
      <div className="w-100 flex flex-col">
        <form className="flex gap-2" onSubmit={onSubmit}>
          <Input value={text} onChange={onChange} placeholder="Enter todo" />
          <Button type="submit" disabled={!text} className="shrink-0">
            Add Todo
          </Button>
        </form>
        <div className="mt-5">
          {todos.map((tod) => (
            <TodoItem
              deleteTodo={deleteTodo}
              onComplete={onComplete}
              key={tod.id}
              todo={tod}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default UndoTodoList;
