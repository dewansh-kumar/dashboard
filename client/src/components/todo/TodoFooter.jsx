import React from "react";
import { BadgePlus } from "lucide-react";

export const TodoFooter = ({className}) => {
  return (
    <button>
      <BadgePlus className={className}/>
    </button>
  );
};
