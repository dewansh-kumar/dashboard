import React, { useState } from "react";
import { todoFieldAtomState } from "../../store/todo/todoAtom";
import { X } from "lucide-react"; // Import three-dot icon
import { Dialog } from "@headlessui/react";

import { changeTodoItemStatus, deleteTodoItem } from "../../service/restApi.js";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { todoItemAtomState } from "../../store/todo/todoItemAtom.js";

export const TaskActionDropdown = ({
  _id,
  isDropdownOpen,
  handleOnClickDropdown,
  handleToggleEditItemModal,
}) => {
  const selectedField = useRecoilValue(todoFieldAtomState);
  const setTodoItems = useSetRecoilState(todoItemAtomState);

  // Toggle dropdown
  const toggleDropdown = () => {
    handleOnClickDropdown();
  };

  // Close dropdown when clicking outside
  const handleBackdropClick = () => {
    handleOnClickDropdown();
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTodoItem(_id);
      setTodoItems((previous) => previous.filter((item) => item._id !== _id));
      handleOnClickDropdown();
    } catch (error) {
      console.error(error);
    }
  };

  const handleTodoItemFieldChange = async (event) => {
    const newStatus = event.target.getAttribute("data-value");

    try {
      await changeTodoItemStatus(_id, newStatus);
      setTodoItems((previous) =>
        previous.map((item) =>
          item._id === _id ? { ...item, status: newStatus } : item
        )
      );
      handleOnClickDropdown();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div >
      {/* Backdrop to disable background interactions */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40"
          onClick={handleBackdropClick}
        ></div>
      )}

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div
          className="absolute right-0 mt-2 w-[150px] bg-white rounded-md shadow-lg p-3 z-50 text-black text-sm"
          onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
        >
          {/* Close Button */}
          <div className="flex justify-end mb-2">
            <X
              className="h-5 w-5 text-gray-500 hover:text-red-600 cursor-pointer"
              onClick={toggleDropdown}
            />
          </div>

          {/* Dropdown Options */}
          <div className="space-y-2">
            <h2
              className="cursor-pointer"
              onClick={() => {
                handleOnClickDropdown();
                handleToggleEditItemModal();
              }}
            >
              Edit Task
            </h2>
            <h2 className="cursor-pointer" onClick={handleDeleteTask}>
              Delete Task
            </h2>

            {/* Status Change Options */}
            {selectedField === "Open" && (
              <div className="space-y-1">
                <h2
                  className="cursor-pointer"
                  data-value="On Going"
                  onClick={handleTodoItemFieldChange}
                >
                  On Going
                </h2>
                <h2
                  className="cursor-pointer"
                  data-value="Closed"
                  onClick={handleTodoItemFieldChange}
                >
                  Closed
                </h2>
              </div>
            )}
            {selectedField === "On Going" && (
              <h2
                className="cursor-pointer"
                data-value="Closed"
                onClick={handleTodoItemFieldChange}
              >
                Closed
              </h2>
            )}
            {selectedField === "Closed" && (
              <h2
                className="cursor-pointer"
                data-value="Open"
                onClick={handleTodoItemFieldChange}
              >
                Open
              </h2>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
