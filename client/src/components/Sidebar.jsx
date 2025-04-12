import { useState } from "react";

function Sidebar() {
  const [selectedField, setSelectedFiled] = useState("dashboard");

  const handleFieldChange = (event) => {
    setSelectedFiled(event.target.name);
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full text-white transform transition-transform w-[15rem]`}
    >
      <nav className="flex flex-col p-4  space-y-2">
        <a
          href="#dashboard"
          className={`py-2 ${
            selectedField !== "dashboard" ? "hover:bg-lightTextColor" : ""
          }  px-2 rounded-md ${
            selectedField == "dashboard" ? "bg-primary" : ""
          }`}
          name="dashboard"
          onClick={handleFieldChange}
        >
          Dashboard
        </a>
        <a
          href="#music"
          className={`py-2 ${
            selectedField !== "music" ? "hover:bg-lightTextColor" : ""
          }  px-2 rounded-md ${selectedField == "music" ? "bg-primary" : ""}`}
          name="music"
          onClick={handleFieldChange}
        >
          Music
        </a>
      </nav>
    </div>
  );
}

export default Sidebar;
