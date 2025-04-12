import React from "react";
import { todoFieldAtomState } from "../../store/todo/todoAtom";
import { useRecoilState } from "recoil";
import { motion } from "framer-motion";

export const TodoOptions = ({ data, name }) => {
  const [selectedField, setSelectedField] = useRecoilState(todoFieldAtomState);
  const isSelected = selectedField === name;

  // Handle tab click
  const handleClick = () => {
    setSelectedField(name); // ✅ Updating Recoil State
  };

  return (
    <div className="relative px-3 py-1 cursor-pointer xs:text-sm " onClick={handleClick}>
      {/* Background Highlight (Animated) */}
      {isSelected && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-yellow-400 rounded-md"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      {/* Tab Text (Ensuring it's visible) */}
      <h2
        className={`relative z-10 whitespace-nowrap font-semibold transition ${
          isSelected ? "text-black" : "text-white"
        }`}
      >
        {data}
      </h2>
    </div>
  );
};
