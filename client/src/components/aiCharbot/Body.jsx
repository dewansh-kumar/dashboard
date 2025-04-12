import React, { memo, useEffect, useRef, useState } from "react";
import { Copy, RefreshCw, Check, ArrowDown } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";
import { marked } from "marked";

export const Body = memo(
  ({ chat, isLoading, isRegenerating, handleRegenerate }) => {
    const chatContainerRef = useRef(null);
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    // Auto-scroll when chat updates
    useEffect(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }, [chat]);

    // Track scroll position to show/hide scroll button
    const handleScroll = () => {
      if (chatContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } =
          chatContainerRef.current;
        setShowScrollButton(scrollTop + clientHeight < scrollHeight - 50);
      }
    };

    // Scroll to bottom smoothly
    const scrollToBottom = () => {
      chatContainerRef.current?.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    };

    // Attach scroll event listener
    useEffect(() => {
      const container = chatContainerRef.current;
      if (container) {
        container.addEventListener("scroll", handleScroll);
        return () => container.removeEventListener("scroll", handleScroll);
      }
    }, []);

    // Copy code function with temporary check icon
    const handleCopyCode = async (code, index) => {
      try {
        await navigator.clipboard.writeText(code);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
      } catch (error) {
        console.error("Failed to copy code:", error);
      }
    };

    const parseResponse = (response) => {
      if (!response) return [];
      const parts = response.split("```");
      const parsedResponse = [];

      parts.forEach((part, index) => {
        if (index % 2 === 0) {
          if (part.trim()) {
            parsedResponse.push({ type: "text", content: part.trim() });
          }
        } else {
          const lines = part.trim().split("\n");
          let language = "plaintext";
          if (
            lines[0].match(
              /^\s*(javascript|python|cpp|java|html|css|bash)\s*$/i
            )
          ) {
            language = lines.shift().trim();
          }
          parsedResponse.push({
            type: "code",
            content: lines.join("\n"),
            language,
          });
        }
      });
      return parsedResponse;
    };

    return (
      <div
        className="relative flex-1 overflow-auto scrollbar-none py-3 w-full"
        ref={chatContainerRef}
      >
        <div className="mx-auto space-y-6">
          {chat.map((item, index) => (
            <div key={index} className="space-y-6">
              {item.role === "user" && (
                <div className="flex justify-end">
                  <div className="bg-gradient-to-br from-gray-300 to-blue-500 text-white px-4 py-3 rounded-2xl max-w-[90%] shadow-sm">
                    <p className="text-sm md:text-base leading-relaxed">
                      {item.parts[0].text}
                    </p>
                  </div>
                </div>
              )}

              {item.role === "model" && (
                <div className="flex items-start w-full">
                  <div className="bg-gradient-to-br to-yellow-300 from-gray-300 p-5 rounded-2xl shadow-sm border border-gray-100 w-full">
                    {parseResponse(item.parts[0].text).map((part, partIndex) =>
                      part.type === "text" ? (
                        <div
                          key={partIndex}
                          className="prose text-gray-800 text-sm md:text-base leading-7 mb-4"
                          dangerouslySetInnerHTML={{
                            __html: marked(part.content),
                          }}
                        />
                      ) : (
                        <div key={partIndex} className="my-4 relative group">
                          <div className="absolute inset-0 bg-gray-900 rounded-lg opacity-5"></div>
                          <div className="relative">
                            <button
                              onClick={() =>
                                handleCopyCode(part.content, partIndex)
                              }
                              className="absolute top-3 right-3 opacity-80 hover:opacity-100 transition-opacity bg-white backdrop-blur-sm p-1.5 rounded-lg"
                            >
                              {copiedIndex === partIndex ? (
                                <Check className="text-green-600" size={18} />
                              ) : (
                                <Copy className="text-gray-500" size={18} />
                              )}
                            </button>
                            <SyntaxHighlighter
                              language={part.language}
                              style={dracula}
                              className="rounded-lg overflow-auto text-sm md:text-[13px] bg-gray-900/5   border border-gray-100"
                            >
                              {part.content}
                            </SyntaxHighlighter>
                          </div>
                        </div>
                      )
                    )}
                    {index === chat.length - 1 && !isRegenerating && (
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => handleRegenerate(index)}
                          className="flex items-center text-gray-600 hover:text-gray-800 text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                        >
                          <RefreshCw className="mr-2" size={16} />
                          Regenerate
                        </button>
                      </div>
                    )}
                    {isRegenerating === index && (
                      <div className="mt-4 flex justify-end">
                        <div className="flex items-center text-gray-500 text-sm">
                          <span className="animate-pulse">Regenerating...</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {isLoading && index === chat.length - 1 && !isRegenerating && (
                <div className="flex items-start w-full">
                  <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 w-full">
                    <div className="flex items-center text-gray-500 text-sm">
                      <span className="animate-pulse">
                        Generating response...
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
);
