// import React, { useState, useEffect, useRef, useCallback } from "react";
// import { Header } from "./Header";
// import { Body } from "./Body";
// import { Footer } from "./Footer";
// import { getAiResponse } from "../../service/restApi.js";

// export const AiCharBot = () => {
//   const [chat, setChat] = useState([]);
//   const [inputText, setInputText] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isRegenerating, setIsRegenerating] = useState(null);
//   const chatContainerRef = useRef(null);
//   const CHAT_LIMIT = 30;

//   // Load chat history from local storage
//   useEffect(() => {
//     const savedChatHistory =
//       JSON.parse(localStorage.getItem("chatHistory")) || [];
//     setChat(savedChatHistory);
//   }, []);

//   // Save chat history to local storage
//   useEffect(() => {
//     if (chat.length > CHAT_LIMIT) {
//       setChat([]);
//       localStorage.removeItem("chatHistory");
//     } else if (chat.length > 0) {
//       localStorage.setItem("chatHistory", JSON.stringify(chat));
//     }
//   }, [chat]);

//   // Memoized function to regenerate the response
//   const handleRegenerate = useCallback(
//     async (index) => {
//       setIsRegenerating(index);
//       setIsLoading(true);
//       setChat((prev) =>
//         prev.map((item, i) =>
//           i === index ? { ...item, ai: "AI is regenerating..." } : item
//         )
//       );

//       try {
//         const chatHistory = chat.map((item) => item.user || item.ai).join("\n");
//         const previousMessage = chat[index - 1].user;
//         const updatedChatHistory = chatHistory + "\n" + previousMessage;
//         const response = await getAiResponse(updatedChatHistory);
//         setChat((prev) =>
//           prev.map((item, i) =>
//             i === index ? { ...item, ai: response.data.data } : item
//           )
//         );
//       } catch (error) {
//         console.error("Error fetching AI response:", error);
//         setChat((prev) =>
//           prev.map((item, i) =>
//             i === index
//               ? {
//                   ...item,
//                   ai: "Oops! Something went wrong while regenerating the response.",
//                 }
//               : item
//           )
//         );
//       } finally {
//         setIsLoading(false);
//         setIsRegenerating(null);
//       }
//     },
//     [chat]
//   );

//   // Memoized function to copy code to clipboard
//   const handleCopyCode = useCallback((code) => {
//     navigator.clipboard.writeText(code);
//   }, []);

//   // Function to send the user's message
//   const handleSend = async () => {
//     if (!inputText.trim()) return;
//     const newChat = [...chat, { role: "user", parts: [{ text: inputText }] }];
//     setChat(newChat);
//     setInputText("");
//     setIsLoading(true);

//     try {
//       const chatHistory = newChat
//         .map((item) => item.user || item.ai)
//         .join("\n");
//       const response = await getAiResponse(chatHistory);
//       setChat((prev) => [
//         ...prev,
//         { role: "model", parts: [{ text: response.data.data }] },
//       ]);
//     } catch (error) {
//       console.error("Error fetching AI response:", error);
//       setChat((prev) => [
//         ...prev,
//         { role: "model", parts: [{ text: "Oops! Something went wrong." }] },
//       ]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Handle key press for sending message
//   const handleKeyPress = (event) => {
//     if (event.key === "Enter" && inputText.trim()) {
//       handleSend();
//     }
//   };

//   // Auto-scroll to bottom
//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [chat]);

//   return (
//     <div className="text-white p-6 rounded-lg shadow-lg w-full mx-auto bg-background h-[600px] flex flex-col">
//       <Header />
//       <Body
//         chat={chat}
//         isLoading={isLoading}
//         isRegenerating={isRegenerating}
//         handleRegenerate={handleRegenerate}
//         handleCopyCode={handleCopyCode}
//       />
//       <Footer
//         inputText={inputText}
//         setInputText={setInputText}
//         handleSend={handleSend}
//         handleKeyPress={handleKeyPress}
//         isLoading={isLoading}
//         chat={chat}
//         CHAT_LIMIT={CHAT_LIMIT}
//         setChat={setChat}
//       />
//     </div>
//   );
// };

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Header } from "./Header";
import { Body } from "./Body";
import { Footer } from "./Footer";
import { getAiResponse } from "../../service/restApi.js";

export const AiCharBot = () => {
  const [chat, setChat] = useState([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(null);
  const chatContainerRef = useRef(null);
  const CHAT_LIMIT = 20;
  const MAX_HISTORY = 15;
  const CHAT_FLUSH_LIMIT = 30

  // Load chat history from local storage
  useEffect(() => {
    const savedChatHistory =
      JSON.parse(localStorage.getItem("chatHistory")) || [];
    // console.log(savedChatHistory);
    setChat(savedChatHistory);
  }, []);

  // Save chat history to local storage
  useEffect(() => {
    if (chat.length >= CHAT_FLUSH_LIMIT) {
      setChat([...chat.slice(-CHAT_LIMIT)]);
      console.log("Ye chala")
      localStorage.removeItem("chatHistory");
      localStorage.setItem("chatHistory", JSON.stringify(chat.slice(-CHAT_LIMIT)))
    } else if (chat.length > 0) {
      localStorage.setItem("chatHistory", JSON.stringify(chat));
    }
  }, [chat]);

  const normalizeResponse = (response) => {
    if (Array.isArray(response)) {
      // console.log("response", response)
      // If the response is an array, use the first item
      return response[0];
    } else if (typeof response === "string") {
      // If the response is a string, wrap it in the expected format
      // console.log("String")
      return { role: "model", parts: [{ text: response }] };
    } else if (response && response.role && response.parts) {
      // If the response is already in the correct format, return it as-is
      return response;
    } else {
      // Handle unexpected formats
      return {
        role: "model",
        parts: [{ text: "Oops! Something went wrong." }],
      };
    }
  };

  // Memoized function to regenerate the response
  const handleRegenerate = useCallback(
    async (index) => {
      setIsRegenerating(index);
      setIsLoading(true);
      setChat((prev) =>
        prev.map((item, i) =>
          i === index
            ? { ...item, parts: [{ text: "AI is regenerating..." }] }
            : item
        )
      );

      try {
        const chatHistory = chat.slice(0, chat.length - 1);

        const trimmedHistory =
          chatHistory.length > MAX_HISTORY
            ? chatHistory.slice(-MAX_HISTORY)
            : chatHistory;

        const response = await getAiResponse(trimmedHistory);
        let normalizedResponse;
        try {
          // Try to parse the response as JSON
          normalizedResponse = normalizeResponse(
            JSON.parse(response.data.data)
          );
        } catch (error) {
          // If parsing fails, assume it's a plain string
          normalizedResponse = normalizeResponse(response.data.data);
        }
        setChat((prev) =>
          prev.map((item, i) => (i === index ? normalizedResponse : item))
        );
      } catch (error) {
        console.error("Error fetching AI response:", error);
        setChat((prev) =>
          prev.map((item, i) =>
            i === index
              ? {
                  ...item,
                  parts: [
                    {
                      text: "Oops! Something went wrong while regenerating the response.",
                    },
                  ],
                }
              : item
          )
        );
      } finally {
        setIsLoading(false);
        setIsRegenerating(null);
      }
    },
    [chat]
  );

  // Memoized function to copy code to clipboard
  const handleCopyCode = useCallback((code) => {
    navigator.clipboard.writeText(code);
  }, []);

  // Function to send the user's message
  const handleSend = async () => {
    if (!inputText.trim()) return;
    const newChat = [...chat, { role: "user", parts: [{ text: inputText }] }];
    setChat(newChat);
    setInputText("");
    setIsLoading(true);

    try {
      // console.log(newChat)
      const trimmedHistory =
        newChat.length > MAX_HISTORY ? newChat.slice(-MAX_HISTORY) : newChat;
      const response = await getAiResponse(trimmedHistory);
      let normalizedResponse;
      try {
        // Try to parse the response as JSON
        normalizedResponse = normalizeResponse(JSON.parse(response.data.data));
      } catch (error) {
        // If parsing fails, assume it's a plain string
        normalizedResponse = normalizeResponse(response.data.data);
      }

      setChat((prev) => [...prev, normalizedResponse]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setChat((prev) => [
        ...prev,
        { role: "model", parts: [{ text: "Oops! Something went wrong." }] },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle key press for sending message
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && inputText.trim()) {
      handleSend();
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div className="text-white p-6 rounded-lg shadow-lg w-full mx-auto bg-background h-[600px] flex flex-col">
      <Header />
      <Body
        chat={chat}
        isLoading={isLoading}
        isRegenerating={isRegenerating}
        handleRegenerate={handleRegenerate}
        handleCopyCode={handleCopyCode}
      />
      <Footer
        inputText={inputText}
        setInputText={setInputText}
        handleSend={handleSend}
        handleKeyPress={handleKeyPress}
        isLoading={isLoading}
        chat={chat}
        CHAT_LIMIT={CHAT_LIMIT}
        setChat={setChat}
      />
    </div>
  );
};



