import React, { useEffect, useState } from "react";
import { ListTodo } from "lucide-react";
import { TodoHeader } from "./TodoHeader";
import { TodoBody } from "./TodoBody";
import { TodoFooter } from "./TodoFooter";
import { AddItemModal } from "./AddItemModal";
import { useSetRecoilState } from "recoil";
import { todoItemAtomState } from "../../store/todo/todoItemAtom";
import { addNewTodoItem, getAllTodoItems } from "../../service/restApi.js";

export const Todo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOnclickAddButton = () => {
    // console.log("Add button modal close ho gya");
    setIsOpen(!isOpen);
  };
  const setTodoItems = useSetRecoilState(todoItemAtomState);

  useEffect(() => {
    try {
      handleTodoItemFetchApi();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleTodoItemFetchApi = async () => {
    const response = await getAllTodoItems();
    const data = response.data.data;
    setTodoItems(data);
  };

  const handleSubmit = async (title, description, priority, dueDate) => {
    const newTodoItem = {
      title,
      description,
      priority,
      dueDate,
      status: "Open",
    };

    try {
      const response = await addNewTodoItem(newTodoItem);
      const data = response.data.data;

      setTodoItems((previous) => {
        return [...previous, data];
      });
    } catch (error) {
      console.log("Getting error while adding todo item", error);
      return;
    }
  };

  return (
    <div className="text-white p-6 rounded-lg shadow-lg mx-auto bg-background  font-semibold text-lg w-full">
      <div className=" space-y-2">
        <div className="text-center flex justify-between">
          <h2 className=" font-semibold">Todo</h2>
          <ListTodo className=" text-lightTextColor" />
        </div>
        <div className="">
          <hr className=" border-lightTextColor" />
        </div>
      </div>

      <div className=" mt-2 h-[480px] flex flex-col justify-between gap-2">
        <div className=" flex rounded-lg shadow-2xl">
          <TodoHeader />
        </div>

        <div className=" h-[80%]">
          <TodoBody />
        </div>
        <div
          className=" text-center flex justify-center"
          onClick={handleOnclickAddButton}
        >
          <TodoFooter className=" h-[35px] w-[35px] text-lightTextColor hover:text-textColor" />
        </div>
        <div>
          {isOpen && (
            <AddItemModal
              isOpen={isOpen}
              onClose={handleOnclickAddButton}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};
