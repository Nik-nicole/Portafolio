"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Send, Bot, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
}

export default function StickyHeaderAIBar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const scrollDirection = currentScrollY > lastScrollY.current ? "down" : "up"

      // Show header when scrolling up, hide when scrolling down
      if (scrollDirection === "up" || currentScrollY < 100) {
        setIsVisible(true)
      } else if (currentScrollY > 300) {
        setIsVisible(false)
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isExpanded) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      inputRef.current?.focus()
    }
  }, [isExpanded, messages])

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: inputValue }),
      })

      if (!response.ok) throw new Error("Failed to get response")

      const data = await response.json()

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response,
        sender: "ai",
      }

      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Disculpa, ocurrió un error. Por favor intenta de nuevo.",
        sender: "ai",
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isLoading) {
      handleSendMessage()
    }
  }

  return (
    <motion.div
      initial={{ y: 0, opacity: 1 }}
      animate={{ y: isVisible ? 0 : -100, opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 py-4"
      data-ai-header
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">AI</span>
            </div>
            <span className="font-semibold text-gray-900 hidden sm:inline">Portafolio</span>
          </div>

          {/* AI Bar - Desktop */}
          <div className="hidden md:flex flex-1 mx-4 max-w-md">
            <div
              className={`relative bg-gray-50 rounded-full border border-gray-200 shadow-sm transition-all duration-300 w-full ${
                isExpanded ? "rounded-2xl" : ""
              }`}
            >
              <div
                className={`flex items-center px-4 py-2 ${isExpanded ? "border-b border-gray-100" : ""}`}
                onClick={() => !isExpanded && setIsExpanded(true)}
              >
                {!isExpanded ? (
                  <>
                    <span className="text-gray-500 text-sm flex-1">Interactúa con AI</span>
                    <ArrowRight className="h-4 w-4 text-gray-500" />
                  </>
                ) : (
                  <>
                    <span className="text-gray-800 font-medium text-sm flex-1">Pregúntame</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-500 hover:text-gray-700 p-1 h-auto"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsExpanded(false)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="max-h-64 overflow-y-auto p-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`mb-3 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                          {message.sender === "ai" && (
                            <div className="w-5 h-5 bg-pink-100 rounded-full mr-2 flex items-center justify-center flex-shrink-0">
                              <Bot className="h-3 w-3 text-pink-500" />
                            </div>
                          )}
                          <div
                            className={`max-w-[70%] rounded-lg px-3 py-2 text-sm ${
                              message.sender === "user" ? "bg-pink-500 text-white" : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            <p>{message.content}</p>
                          </div>
                        </div>
                      ))}

                      {isLoading && (
                        <div className="flex justify-start mb-3">
                          <div className="w-5 h-5 bg-pink-100 rounded-full mr-2 flex items-center justify-center flex-shrink-0">
                            <Bot className="h-3 w-3 text-pink-500" />
                          </div>
                          <div className="bg-gray-100 rounded-lg px-3 py-2">
                            <div className="flex space-x-1">
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                              <div
                                className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "150ms" }}
                              ></div>
                              <div
                                className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                                style={{ animationDelay: "300ms" }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>

                    <div className="p-3 border-t border-gray-100">
                      <div className="flex gap-2">
                        <Input
                          ref={inputRef}
                          type="text"
                          placeholder="Escribe tu pregunta..."
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          onKeyPress={handleKeyPress}
                          className="text-sm focus-visible:ring-pink-500 border-gray-200"
                          disabled={isLoading}
                        />
                        <Button
                          onClick={handleSendMessage}
                          disabled={!inputValue.trim() || isLoading}
                          size="sm"
                          className="bg-pink-500 hover:bg-pink-600 text-white"
                        >
                          <Send className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile AI Button */}
          <div className="md:hidden">
            <Button
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-pink-500 hover:bg-pink-600 text-white rounded-full"
              size="sm"
            >
              <Bot className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Chat Drawer */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden fixed inset-0 top-16 bg-white z-40 flex flex-col"
              >
                <div className="flex-1 overflow-y-auto p-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-3 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "ai" && (
                        <div className="w-6 h-6 bg-pink-100 rounded-full mr-2 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-3 w-3 text-pink-500" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                          message.sender === "user" ? "bg-pink-500 text-white" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        <p>{message.content}</p>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start mb-3">
                      <div className="w-6 h-6 bg-pink-100 rounded-full mr-2 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-3 w-3 text-pink-500" />
                      </div>
                      <div className="bg-gray-100 rounded-lg px-3 py-2">
                        <div className="flex space-x-1">
                          <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-gray-100">
                  <div className="flex gap-2">
                    <Input
                      ref={inputRef}
                      type="text"
                      placeholder="Escribe tu pregunta..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="flex-1 focus-visible:ring-pink-500 border-gray-200"
                      disabled={isLoading}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      className="bg-pink-500 hover:bg-pink-600 text-white"
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
    </motion.div>
  )
}
