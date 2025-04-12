import React, { useState } from "react";
import { TodoOptions } from "./TodoOptions";
import { todoFieldAtomState } from "../../store/todo/todoAtom";
import { useSetRecoilState } from "recoil";

export const TodoHeader = () => {
  const setSelectedFiled = useSetRecoilState(todoFieldAtomState);

  const handleTaskFieldClick = (event) => {
    // console.log(event.target.getAttribute("name"));
    setSelectedFiled(event.target.getAttribute("name"));
  };

  return (
    <div
      className="flex justify-between items-center p-2 box-border overflow-scroll w-full scrollbar-none text-center rounded-lg border-b border-gray-700"
    >
      <TodoOptions
        data="Open"
        handleClick={handleTaskFieldClick}
        name="Open"
        key={1}
      />
      <TodoOptions
        data="On Going"
        handleClick={handleTaskFieldClick}
        name="On Going"
        key={2}
      />
      <TodoOptions
        data="Closed"
        handleClick={handleTaskFieldClick}
        name="Closed"
        key={3}
      />
    </div>
  );
};
