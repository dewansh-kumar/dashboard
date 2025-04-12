// import React, { memo } from "react";
// import { Send, ListRestart } from "lucide-react";

// export const Footer = memo(
//   ({
//     inputText,
//     setInputText,
//     handleSend,
//     handleKeyPress,
//     isLoading,
//     chat,
//     CHAT_LIMIT,
//     setChat,
//   }) => {
//     console.log("footer");
//     return (
//       <div className="h-16">
//         <div className="flex items-center justify-between border border-lightTextColor rounded-md p-2">
//           <input
//             type="text"
//             value={inputText}
//             className="w-[95%] h-full p-3 border-none rounded-md text-darkTextColor focus:outline-none bg-background"
//             onChange={(e) => setInputText(e.target.value)}
//             placeholder={
//               chat.length >= CHAT_LIMIT
//                 ? "Chat limit exceeded"
//                 : "Ask me anything"
//             }
//             onKeyDown={handleKeyPress}
//             disabled={isLoading || chat.length >= CHAT_LIMIT}
//           />
//           {inputText && (
//             <button
//               className="text-primary"
//               onClick={handleSend}
//               disabled={isLoading || !inputText.trim()}
//             >
//               <Send size={20} />
//             </button>
//           )}

//           {CHAT_LIMIT <= chat.length && (
//             <button
//               className="text-primary"
//               onClick={() => {
//                 console.log("reset huaa kay");
//                 setChat([]);
//                 localStorage.removeItem("chatHistory");
//               }}
//             >
//               <ListRestart size={30} />
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   }
// );

// import React, { memo } from "react";
// import { Send, ListRestart } from "lucide-react";

// export const Footer = memo(
//   ({ inputText, setInputText, handleSend, handleKeyPress, isLoading, chat, CHAT_LIMIT, setChat }) => {
//     return (
//       <div className="h-16">
//         <div className="flex items-center justify-between border border-lightTextColor rounded-md p-2">
//           <input
//             type="text"
//             value={inputText}
//             className="w-[95%] h-full p-3 border-none rounded-md text-darkTextColor focus:outline-none bg-background"
//             onChange={(e) => setInputText(e.target.value)}
//             placeholder={
//               chat.length >= CHAT_LIMIT ? "Chat limit exceeded" : "Ask me anything"
//             }
//             onKeyDown={handleKeyPress}
//             disabled={isLoading}
//           />
//           {inputText && (
//             <button
//               className="hover:text-primary"
//               onClick={handleSend}
//               disabled={isLoading || !inputText.trim()}
//             >
//               <Send size={25} />
//             </button>
//           )}

//           {!inputText && (
//             <button
//               className="hover:text-primary"
//               onClick={() => {
//                 setChat([]);
//                 localStorage.removeItem("chatHistory");
//               }}
//             >
//               <ListRestart size={25} />
//             </button>
//           )}
//         </div>
//       </div>
//     );
//   }
// );

import React, { memo, useEffect, useRef } from "react";
import { Send, ListRestart } from "lucide-react";

export const Footer = memo(
  ({
    inputText,
    setInputText,
    handleSend,
    handleKeyPress,
    isLoading,
    chat,
    CHAT_LIMIT,
    setChat,
  }) => {
    const textareaRef = useRef(null);

    // Auto-resize textarea height
    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        textareaRef.current.style.height = `${Math.min(
          textareaRef.current.scrollHeight,
          150 // Max height before scrolling
        )}px`;
      }
    }, [inputText]);

    const handleTextareaKeyDown = (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleKeyPress(e);
      }
    };

    return (
      <div className="h-auto min-h-16">
        <div className="flex items-center justify-between border border-lightTextColor rounded-md p-2">
          <textarea
            ref={textareaRef}
            value={inputText}
            rows={1}
            className="w-[95%] p-3 border-none rounded-md text-darkTextColor focus:outline-none bg-background resize-none overflow-y-auto scrollbar-none"
            style={{
              minHeight: "3rem",
              maxHeight: "150px",
              transition: "height 0.2s ease-out",
            }}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleTextareaKeyDown}
            placeholder={
              chat.length >= CHAT_LIMIT
                ? "Chat limit exceeded"
                : "Ask me anything..."
            }
            disabled={isLoading}
          />

          <div className="flex flex-col gap-2 ml-2">
            {inputText ? (
              <button
                className="hover:text-primary disabled:opacity-50"
                onClick={handleSend}
                disabled={isLoading || !inputText.trim()}
              >
                <Send size={25} />
              </button>
            ) : (
              <button
                className="hover:text-primary"
                onClick={() => {
                  setChat([]);
                  localStorage.removeItem("chatHistory");
                }}
              >
                <ListRestart size={25} />
              </button>
            )}
          </div>
        </div>
       
       
      </div>
    );
  }
);
