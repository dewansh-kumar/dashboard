import React, { useEffect, useState } from "react";
import { TodoItem } from "./TodoItem";
import { useRecoilValue } from "recoil";
import { todoItemAtomState } from "../../store/todo/todoItemAtom";
import { todoFieldAtomState } from "../../store/todo/todoAtom";

export const TodoBody = () => {
  const todoItems = useRecoilValue(todoItemAtomState);
  const [selectedFiledTodoItems, setSelectedFieldTodoItems] = useState([]);
  const selectedTodoField = useRecoilValue(todoFieldAtomState);

  useEffect(() => {
    const items = todoItems.filter((item) => item.status === selectedTodoField);
    setSelectedFieldTodoItems(items);
  }, [selectedTodoField, todoItems]);

  return (
    <div className="border border-lightTextColor h-full rounded-md overflow-auto scrollbar-none">
      {selectedFiledTodoItems.map((item) => {
        return (
          <div key={item._id}>
            <TodoItem
              priority={item.priority}
              title={item.title}
              description={item.description}
              dueDate={item.dueDate}
              key={item._id}
              status={item.status}
              _id={item._id}
            />
            <div className=" rounded-t-md">
              <hr className=" border-lightTextColor"/>
            </div>
          </div>
        );
      })}
 
    </div>
  );
};
