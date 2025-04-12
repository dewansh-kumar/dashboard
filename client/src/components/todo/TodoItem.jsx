import React, { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { TaskActionDropdown } from "./TaskActionDropdown";
import { TodoItemDetailsModal } from "./TodoItemDetailsModal";
import { getFormattedDueDate } from "../../utils/dateFormatter";
import { isTaskDueDateIsPassed } from "../../utils/dateFormatter";
import { getPriorityBasedColor } from "../../utils/priorityBasedColor";
import { UpdateItemModal } from "./UpdateItemModal.jsx";
import { updateTodoItem } from "../../service/restApi";
import { todoItemAtomState } from "../../store/todo/todoItemAtom";
import { useRecoilState } from "recoil";

// The TodoItem component now accepts `priority` as a prop
export const TodoItem = ({
  priority,
  title,
  dueDate,
  _id,
  status,
  description,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isTodoItemModalOpen, setIsTodoItemModalOpen] = useState(false);
  const [todoItems, setTodoItems] = useRecoilState(todoItemAtomState);
  const [isEditItemModalOpen, setIsEditItemModalOpen] = useState(false);
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleOnClickDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); // Open the modal
  };

  const handleTodoItemOpenModal = () => {
    setIsTodoItemModalOpen(true);
  };

  const handleTodoItemCloseModal = () => {
    setIsTodoItemModalOpen(false);
  };

  const handleToggleEditItemModal = () => {
    setIsEditItemModalOpen(!isEditItemModalOpen);
  };

  const handleOnClickEditTodoItem = async (
    title,
    description,
    priority,
    dueDate
  ) => {
    try {
      await updateTodoItem(_id, title, description, priority, dueDate);
      setTodoItems((previous) =>
        previous.map((item) =>
          item._id === _id
            ? { ...item, title, description, priority, dueDate }
            : item
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const getTodoItemDetails = (_id) =>
    todoItems.find((item) => item._id === _id);

  // Get the first character of the priority
  const priorityChar = priority.charAt(0).toUpperCase();

  return (
    <div className=" flex justify-center items-center w-full hover:bg-gray-900">
      <div
        className={`cursor-pointer py-3 px-2  items-center space-x-2 w-[93%]  `}
        onMouseEnter={handleMouseEnter} // Trigger when mouse enters
        onMouseLeave={handleMouseLeave}
        onClick={handleTodoItemOpenModal}
      >
        <div className={`truncate flex justify-between space-x-2`}>
          <h2 className={`font-bold truncate text-sm text-textColor`}>
            {title}
          </h2>

          <div className="flex justify-between text-xs space-x-2">
            <div
              className={`flex items-center justify-center w-5 h-5 rounded-full bg-${getPriorityBasedColor(
                priority
              )} text-white text-xs font-bold`}
            >
              {priorityChar}
            </div>
            <h4
              className={`${
                isTaskDueDateIsPassed(dueDate) == true
                  ? "text-red-600"
                  : "text-primary"
              } font-semibold`}
            >
              {getFormattedDueDate(dueDate)}
            </h4>
          </div>
        </div>
      </div>

      <div>
        {isTodoItemModalOpen && (
          <div>
            <TodoItemDetailsModal
              isOpen={isTodoItemModalOpen}
              onClose={handleTodoItemCloseModal}
              todo={{ title, description, priority, dueDate, status }}
              _id={_id}
            />
          </div>
        )}
      </div>

      {/* three dot button */}
      <div className=" relative w-[7%]">
        <div>
          <div>
            <EllipsisVertical
              className=" text-lightTextColor hover:text-textColor cursor-pointer"
              onClick={handleOnClickDropdown}
            ></EllipsisVertical>
          </div>
        </div>

        <div>
          {isDropdownOpen && (
            <TaskActionDropdown
              isDropdownOpen={isDropdownOpen}
              handleOnClickDropdown={handleOnClickDropdown}
              handleToggleEditItemModal={handleToggleEditItemModal}
              _id={_id}
            />
          )}
        </div>
        <div>
          {isEditItemModalOpen && (
            <UpdateItemModal
              isOpen={isEditItemModalOpen}
              onClose={handleToggleEditItemModal}
              todo={getTodoItemDetails(_id)}
              onSubmit={handleOnClickEditTodoItem}
            />
          )}
        </div>
      </div>
    </div>
  );
};
