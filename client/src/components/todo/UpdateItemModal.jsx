import React, { useState } from "react";
import { X } from "lucide-react";
import { Dialog } from "@headlessui/react";

export const UpdateItemModal = ({ isOpen, onClose, onSubmit, todo }) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const [priority, setPriority] = useState(todo.priority);
  const [dueDate, setDueDate] = useState(todo.dueDate);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(title, description, priority, dueDate); // Pass new fields to the parent
    setTitle("");
    setDescription("");
    setDueDate("");
    onClose(); // Close the modal after submitting
  };

  if (!isOpen) return null; // Don't render modal if it's not open

  return (
    // <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 backdrop-blur-md">
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 backdrop-blur-sm"
    >
      <div className="bg-white shadow-lg p-6 rounded-lg  xs:w-[320px] md:w-[600px] max-w-full text-sm">
        <div className=" flex justify-between items-center  text-background ">
          <h2 className="text-xl font-bold">Update To-Do Task</h2>
          <X className=" cursor-pointer hover:text-red-600" onClick={onClose} />
        </div>
        <div className="my-3">
          <hr className="border-lightBackground" />
        </div>

        <form onSubmit={handleSubmit} className="text-background ">
          {/* Title Input */}
          <div className="mb-4 text-background">
            <label htmlFor="title" className="block text-sm  mb-2 font-bold">
              Title:
            </label>
            <input
              id="title"
              type="text"
              className="w-full p-2 border border-lightTextColor rounded bg-textColor focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description Input */}
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm  mb-2 font-bold"
            >
              Description:
            </label>
            <textarea
              id="description"
              className="w-full p-2 border border-lightTextColor bg-textColor focus:outline-none rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              required
            />
          </div>

          <div className=" flex justify-between items-center mb-6 text-background">
            {/* Priority Select */}
            <div className="">
              <label
                htmlFor="priority"
                className="block text-sm font-bold mb-2 "
              >
                Priority:
              </label>
              <select
                id="priority"
                className="w-full p-2 bg-textColor focus:outline-none rounded border border-lightTextColor"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* End Date Input */}
            <div className="">
              <label htmlFor="dueDate" className="block text-sm font-bold mb-2">
                Due Date:
              </label>
              <input
                id="dueDate"
                type="date"
                className="w-full p-2  bg-textColor focus:outline-none rounded border border-lightTextColor"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 text-white text-sm font-semibold"
            >
              Update Task
            </button>
          </div>
        </form>
      </div>
    </Dialog>

    // </div>
  );
};
