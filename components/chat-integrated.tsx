"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, User, Bot, Maximize, Minimize } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

export default function ChatIntegrated() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "¡Hola! I'm the AI assistant for this portfolio. Ask me anything about the owner's skills, projects, or experience!",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom()
    }
  }, [messages, isOpen, isMinimized])

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, isMinimized])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'm a full-stack developer with expertise in Python, JavaScript, React, and AI technologies like TensorFlow and YOLO.",
        "I've participated in several hackathons and won recognition for my AI projects focused on accessibility and environmental monitoring.",
        "Despite being 18, I have experience working with the Software Factory at SENA and collaborating with the Bolívar Davivienda Foundation.",
        "My technical skills include Python, JavaScript, React, Astro, Flask, Spring Boot, TensorFlow, and more!",
        "I speak Spanish (native), English (A2-B1), and Colombian Sign Language.",
        "I'm passionate about AI, web development, and creating technology that makes a positive impact.",
        "Feel free to explore my portfolio to see my projects and skills in more detail!",
      ]

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  const toggleChat = () => {
    if (!isOpen) {
      setIsOpen(true)
      setIsMinimized(false)
    } else {
      setIsOpen(false)
    }
  }

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-16 mb-8">
      <div className="relative border border-gray-200 rounded-xl shadow-lg overflow-hidden">
        {/* Chat header - always visible */}
        <div
          className="bg-gradient-to-r from-pink-500 to-pink-600 p-4 flex items-center justify-between cursor-pointer"
          onClick={toggleMinimize}
        >
          <div className="flex items-center">
            <div className="w-10 h-10 bg-white rounded-full overflow-hidden mr-3 flex-shrink-0 flex items-center justify-center">
              <Bot className="h-6 w-6 text-pink-500" />
            </div>
            <div>
              <h3 className="font-bold text-white">Chat with my AI Assistant</h3>
              <p className="text-xs text-white/80">Ask me about my skills, projects, or experience</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {isMinimized ? <Maximize className="h-5 w-5 text-white" /> : <Minimize className="h-5 w-5 text-white" />}
          </div>
        </div>

        {/* Chat content */}
        <AnimatePresence>
          {!isMinimized && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Messages area */}
              <div className="h-80 overflow-y-auto p-4 bg-gray-50">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.sender === "ai" && (
                      <div className="w-8 h-8 bg-pink-100 rounded-full overflow-hidden mr-2 flex-shrink-0 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-pink-500" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                        message.sender === "user"
                          ? "bg-pink-500 text-white rounded-tr-none"
                          : "bg-white border border-gray-200 text-gray-800 rounded-tl-none"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    {message.sender === "user" && (
                      <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden ml-2 flex items-center justify-center flex-shrink-0">
                        <User className="h-4 w-4 text-gray-500" />
                      </div>
                    )}
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="w-8 h-8 bg-pink-100 rounded-full overflow-hidden mr-2 flex-shrink-0 flex items-center justify-center">
                      <Bot className="h-5 w-5 text-pink-500" />
                    </div>
                    <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl rounded-tl-none max-w-[80%] px-4 py-2">
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <div className="p-4 border-t border-gray-200 bg-white">
                <div className="flex">
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Ask me anything about my skills, projects, or experience..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 focus-visible:ring-pink-500"
                    disabled={isLoading}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isLoading}
                    className="ml-2 bg-pink-500 hover:bg-pink-600 text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
