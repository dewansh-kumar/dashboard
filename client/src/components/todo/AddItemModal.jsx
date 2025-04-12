// import React, { useState } from "react";

// export const AddItemModal = ({ isOpen, onClose, onSubmit }) => {
//   // State for task fields
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [priority, setPriority] = useState("Low");
//   const [dueDate, setDueDate] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(title, description, priority, dueDate); // Pass new fields to the parent
//     setTitle("");
//     setDescription("");
//     setDueDate("");
//     onClose(); // Close the modal after submitting
//   };

//   if (!isOpen) return null; // Don't render modal if it's not open

//   return (
//     <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50 backdrop-blur-md">
//       <div className=" bg-lightTextColor p-6 rounded-lg xs:w-[22rem] md:w-96">
//         <h2 className="text-xl font-bold mb-4">Add To-Do Task</h2>
//         <form onSubmit={handleSubmit}>
//           {/* Title Input */}
//           <div className="mb-4">
//             <label htmlFor="title" className="block text-sm font-medium mb-2">
//               Title:
//             </label>
//             <input
//               id="title"
//               type="text"
//               className="w-full p-2 border rounded bg-lightBackground focus:outline-none"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>

//           {/* Description Input */}
//           <div className="mb-4">
//             <label
//               htmlFor="description"
//               className="block text-sm font-medium mb-2"
//             >
//               Description:
//             </label>
//             <textarea
//               id="description"
//               className="w-full p-2 border bg-lightBackground focus:outline-none rounded"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               rows="3"
//               required
//             />
//           </div>

//           {/* Priority Select */}
//           <div className="mb-4">
//             <label
//               htmlFor="priority"
//               className="block text-sm font-medium mb-2"
//             >
//               Priority:
//             </label>
//             <select
//               id="priority"
//               className="w-full p-2 border bg-lightBackground focus:outline-none rounded"
//               value={priority}
//               onChange={(e) => setPriority(e.target.value)}
//             >
//               <option value="Low">Low</option>
//               <option value="Medium">Medium</option>
//               <option value="High">High</option>
//             </select>
//           </div>

//           {/* End Date Input */}
//           <div className="mb-4">
//             <label htmlFor="dueDate" className="block text-sm font-medium mb-2">
//               Due Date:
//             </label>
//             <input
//               id="dueDate"
//               type="date"
//               className="w-full p-2 border bg-lightBackground focus:outline-none rounded text-textColor"
//               value={dueDate}
//               onChange={(e) => setDueDate(e.target.value)}
//               required
//             />
//           </div>

//           {/* Buttons */}
//           <div className="flex justify-end space-x-2">
//             <button
//               type="button"
//               className="px-4 py-2 bg-red-600  hover:bg-red-700 rounded text-sm font-semibold"
//               onClick={onClose}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-green-600 rounded hover:bg-green-700 text-white text-sm font-semibold"
//             >
//               Add Task
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

import React, { useState } from "react";
import { X } from "lucide-react";
import { Dialog } from "@headlessui/react";

export const AddItemModal = ({ isOpen, onClose, onSubmit }) => {
  // State for task fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(title, description, priority, dueDate); // Pass new fields to the parent
    setTitle("");
    setDescription("");
    setDueDate("");
    onClose(); // Close the modal after submitting
  };

  // if (!isOpen) return null; // Don't render modal if it's not open

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20 backdrop-blur-sm"
    >
      <div className="bg-white p-6 rounded-lg xs:w-[320px] md:w-[600px] max-w-full text-sm">
        <div className=" flex justify-between items-center  text-background ">
          <h2 className="text-xl font-bold">Add To-Do Task</h2>
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
              className="block text-sm  mb-2 font-bold "
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
                className="w-full p-2 border border-lightTextColor bg-textColor focus:outline-none rounded"
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
                className="w-full p-2 border bg-textColor focus:outline-none rounded  border-lightTextColor"
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
              Add Task
            </button>
          </div>
        </form>
      </div>
    </Dialog>
  );
};
