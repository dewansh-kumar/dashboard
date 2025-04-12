import React from "react";
import { X } from "lucide-react";
import { Dialog } from "@headlessui/react";
import {
  getFormattedDueDate,
  isTaskDueDateIsPassed,
} from "../../utils/dateFormatter";
import { getPriorityBasedColor } from "../../utils/priorityBasedColor";

export const TodoItemDetailsModal = ({ isOpen, onClose, todo }) => {
  // const selectedTodoItem
  if (!isOpen || !todo) return null; // Don't render the modal if it's not open or no todo is passed

  return (
    // <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 backdrop-blur-md">
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 backdrop-blur-sm"
    >
      <div className="bg-white p-6 rounded-lg xs:w-[320px] md:w-[600px]  max-w-full text-sm">
        <div className=" flex justify-between items-center text-background ">
          <h1 className=" font-bold text-xl">Task Details</h1>
          <X className=" cursor-pointer hover:text-red-600" onClick={onClose} />
        </div>
        <div className="my-3">
          <hr className="border-lightBackground" />
        </div>
        <div className="mb-4 flex justify-between items-center text-background border border-lightTextColor  p-2 rounded-md">
          <div>
            <p className=" font-bold">Priority</p>
            <p
              className={` rounded-md text-${getPriorityBasedColor(
                todo.priority
              )} font-semibold text-center`}
            >
              {todo.priority}
            </p>
          </div>
          <div>
            <p className=" font-bold">Status</p>
            <p className={` font-semibold text-center`}>{todo.status}</p>
          </div>
          <div>
            <p className=" font-bold">Due Date</p>
            <p
              className={`${
                isTaskDueDateIsPassed(todo.dueDate) == true
                  ? "text-red-600"
                  : "text-primary"
              } font-semibold text-center`}
            >
              {getFormattedDueDate(todo.dueDate)}
            </p>
          </div>
        </div>
        <div className=" text-background border border-lightTextColor p-2 rounded-md space-y-2">
          <div className="">
            <p className=" text-[1.2rem] font-bold">{todo.title}</p>
          </div>
          <div className="">
            <p className=" text-sm font-semibold">{todo.description}</p>
          </div>
        </div>
      </div>
    </Dialog>

    // </div>
  );
};
