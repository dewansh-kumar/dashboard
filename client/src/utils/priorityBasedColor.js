  // Function to return color based on priority
 export const getPriorityBasedColor = (priority) => {
    switch (priority) {
      case "High":
        return "red-600"; // High priority -> red
      case "Medium":
        return "yellow-500"; // Medium priority -> yellow
      case "Low":
        return "green-500"; // Low priority -> green
      default:
        return "gray-500"; // Default color (if priority is unknown)
    }
  };