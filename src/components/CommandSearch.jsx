import React, { useState, useEffect, useRef } from "react";
import { X, Search, ArrowRight, Loader, AlertTriangle } from "lucide-react"; // Added AlertTriangle for warning icon
import { v4 as uuidv4 } from "uuid";

const MessageBubble = ({ message, isAi }) => (
  <div
    className={`flex ${
      isAi ? "justify-start" : "justify-end"
    } mb-4 animate-in fade-in slide-in-from-bottom-2`}
  >
    <div
      className={`max-w-[80%] p-4 rounded-xl backdrop-blur-sm ${
        isAi ? "bg-transparent text-gray-200" : "text-white"
      }`}
    >
      <p className="text-sm">{message}</p>
    </div>
  </div>
);

const CommandSearch = ({ isOpen, onClose, darkMode }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const [sessionId, setSessionId] = useState(null);

  const suggestions = [
    "What projects have you worked on at SUTD?",
    "Who is your girlfriend?",
    "How did you get into AI and development?",
    "What are your hobbies outside of tech?",
    "Are you open to work opportunities?",
  ];

  const predefinedResponses = {
    "What projects have you worked on at SUTD?":
      "I've worked on various projects including AI-driven applications and full-stack development. Let me know if you'd like more details!",
    "Who is your girlfriend?":
      "That's a bit personal, but I appreciate the interest! Her name starts with an M :)",
    "How did you get into AI and development?":
      "When I was younger, I was fascinated by the autocomplete feature and the magic filter that enhanced images on the first iPhone my dad got. It felt like magic and made me fall in love with AI. Now, I'm also passionate about building applications because I want to create something useful and impactful.",
    "What are your hobbies outside of tech?":
      "I enjoy playing basketball, exploring new places, making music and constantly trying to learn new things.",
    "Are you open to work opportunities?":
      "Yes, I'm currently looking for a full-time position in Singapore!",
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setMessages([]);
      setSearchQuery("");
      setSelectedIndex(0);
      setIsLoading(false);
      setSessionId(uuidv4());
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (!isOpen) onClose(false);
      } else if (e.key === "Escape") {
        onClose(false);
      } else if (e.key === "Enter" && searchQuery.trim()) {
        handleSendMessage(searchQuery.trim());
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, searchQuery]);

  const handleSendMessage = (message) => {
    setSearchQuery("");
    setIsLoading(true);

    setMessages((prev) => [...prev, { text: message, isAi: false }]);

    setTimeout(() => {
      if (predefinedResponses[message]) {
        setMessages((prev) => [
          ...prev,
          { text: predefinedResponses[message], isAi: true },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            text: "Sorry, this feature is still not done yet.",
            isAi: true,
          },
        ]);
      }
      setIsLoading(false);
      scrollToBottom();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4 bg-black bg-opacity-50 backdrop-blur-xl"
      onClick={() => onClose(false)}
    >
      <div
        className={`w-full max-w-2xl rounded-3xl shadow-2xl flex flex-col ${
          darkMode
            ? "bg-black bg-opacity-70 border border-gray-500"
            : "bg-black bg-opacity-70 border border-gray-300"
        } `}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar */}
        <div className={`flex items-center p-4 ${darkMode? "border-b border-gray-500": "border-b border-gray-300"} `}>
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Ask me anything..."
            className="flex-1 bg-transparent text-gray-200 placeholder-gray-400 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                setSelectedIndex((prev) => (prev + 1) % suggestions.length);
              } else if (e.key === "ArrowUp") {
                setSelectedIndex(
                  (prev) => (prev - 1 + suggestions.length) % suggestions.length
                );
              }
            }}
          />
          <button
            onClick={() => onClose(false)}
            className="p-1 hover:bg-gray-800 rounded-md"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Chat/Suggestions Area */}
        <div className="p-4 flex-1 overflow-y-auto">
          {messages.length === 0 && (
            <>
              <div
                className={`flex items-center px-3 py-2 mb-2 text-sm rounded-md ${
                  darkMode ? "text-yellow-500" : "text-yellow-100"
                }`}
              >
                <AlertTriangle className="w-5 h-5 mr-2" />
                <span>This feature is still under development 🚧</span>
              </div>

              <div className="px-3 py-2 text-sm text-gray-400 mb-2">
                Suggested questions
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  className={`w-full px-7 py-3 text-left text-sm flex items-center justify-between group transition-colors mb-2`}
                  onClick={() => handleSendMessage(suggestion)}
                >
                  <span className="text-gray-200">{suggestion}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </>
          )}

          {messages.length > 0 && (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <MessageBubble
                  key={index}
                  message={message.text}
                  isAi={message.isAi}
                />
              ))}
              {isLoading && (
                <div className="flex justify-start mb-4">
                  <div className="p-4 rounded-2xl flex items-center">
                    <Loader className="w-5 h-5 text-gray-400 animate-spin" />
                    <span className="ml-1 text-gray-400 text-xs">
                      Typing...
                    </span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className={`px-4 py-3 ${darkMode? "border-t border-gray-500": "border-t border-gray-300"} text-xs text-gray-400 flex items-center justify-between`}>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-md ${darkMode? "bg-gray-800": "bg-gray-200 text-black"} `}>↵</span>
            <span>to send</span>
            <span className={`px-2 py-1 rounded-md ${darkMode? "bg-gray-800": "bg-gray-200 text-black"} `}>esc</span>
            <span>to close</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandSearch;
