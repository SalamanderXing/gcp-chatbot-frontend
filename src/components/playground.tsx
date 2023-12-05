import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { v4 as uuidv4 } from "uuid";
import "./playground.css";
import {
  IMessage,
  useChatInteract,
  useChatMessages,
} from "@chainlit/react-client";
import { useEffect, useRef, useState } from "react";

export function Playground() {
  const [inputValue, setInputValue] = useState("");
  const { sendMessage } = useChatInteract();
  const { messages } = useChatMessages();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    const content = inputValue.trim();
    if (content) {
      const message = {
        id: uuidv4(),
        author: "user",
        content: content,
        authorIsUser: true,
        createdAt: new Date().toISOString(),
      };
      sendMessage(message, []);
      setInputValue("");
    }
  };

  const renderMessage = (message: IMessage) => {
    return (
      <div key={message.id} className="flex items-start space-x-2">
        <div className="w-20 text-sm text-green-500">{message.author}</div>
        <div className="flex-1 border rounded-lg p-2">
          <p className="text-black dark:text-white">{message.content}</p>
        </div>
      </div>
    );
  };
  // <div className="flex-1 overflow-auto p-6">
  //   <div className="space-y-4">
  //     {messages.map((message) => renderMessage(message))}
  //     <div ref={messagesEndRef} />
  //   </div>
  // </div>
  // <div className="border-t p-4 bg-white dark:bg-gray-800 fixed bottom-0 w-full">
  //   <div className="flex items-center space-x-2">
  //     <Input
  //       autoFocus
  //       className="flex-1"
  //       id="message-input"
  //       placeholder="Type a message"
  //       value={inputValue}
  //       onChange={(e) => setInputValue(e.target.value)}
  //       onKeyUp={(e) => {
  //         if (e.key === "Enter") {
  //           handleSendMessage();
  //         }
  //       }}
  //     />
  //     <Button onClick={handleSendMessage} type="submit">
  //       Send
  //     </Button>
  //   </div>
  // </div>
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <div className="space-y-4 chat-container overflow-auto">
        {messages.map((message) => renderMessage(message))}
        <div ref={messagesEndRef} />
      </div>
      <div className="border-t p-4 bg-white dark:bg-gray-800 fixed bottom-0 w-full input-container">
        <div className="flex items-center space-x-2">
          <Input
            autoFocus
            className="flex-1"
            id="message-input"
            placeholder="Type a message"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage} type="submit">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
