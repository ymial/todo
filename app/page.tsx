'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Check } from "lucide-react";

type Todo = {
  id: number;
  text: string;
}

const COOKIE_KEY = "todos";

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const cookieData = Cookies.get(COOKIE_KEY);
    if (cookieData) {
      try {
        const parsed = JSON.parse(cookieData);
        setTodos(parsed);
      } catch (err) {
        console.log("Cookie parse error:", err);
      }
    }
  }, []);

  const updateCookie = (updateTodos: Todo[]) => {
    Cookies.set(COOKIE_KEY, JSON.stringify(updateTodos), { expires: 7 });
  };

  const addTodo = () => {
    if (input.trim() === "") return;

    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
    };

    const updatedTodos = [newTodo, ...todos];
    setTodos(updatedTodos);
    updateCookie(updatedTodos);
    setInput("");
  };

  const removeTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    updateCookie(updatedTodos);
  }

  return (
    <div className="flex items-center justify-center flex-col p-4">
      <div className="flex w-full space-x-2 mb-4 md:w-lg">
        <Input
          placeholder="Task"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <Button onClick={addTodo} variant="outline" className="cursor-pointer">
          <span>Add</span>
        </Button>
      </div>

      <ul className="w-full space-y-2 md:w-lg">
        <AnimatePresence>
          {todos.map((todo) => (
            <motion.li
              key={todo.id}
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-start space-x-2"
            >
              <Button variant="secondary" onClick={() => removeTodo(todo.id)} className="w-7 h-7">
                <Check />
              </Button>
              <span>{todo.text}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}