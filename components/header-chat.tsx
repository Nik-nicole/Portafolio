// Este componente ya no se usa, pero lo mantenemos por si se necesita en el futuro
"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X, Bot } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
}

export default function HeaderChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "¡Hola! Pregúntame lo que quieras saber sobre mí, mis proyectos o habilidades.",
      sender: "ai",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      inputRef.current?.focus()
    }
  }, [isOpen, messages])

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Soy una desarrolladora full-stack con experiencia en Python, JavaScript, React y tecnologías de IA como TensorFlow y YOLO.",
        "He participado en varios hackathons y he recibido reconocimiento por mis proyectos de IA enfocados en accesibilidad y monitoreo ambiental.",
        "A pesar de tener 18 años, tengo experiencia trabajando en la Fábrica de Software del SENA y colaborando con la Fundación Bolívar Davivienda.",
        "Mis habilidades técnicas incluyen Python, JavaScript, React, Astro, Flask, Spring Boot, TensorFlow y más.",
        "Hablo español (nativo), inglés (A2-B1) y lengua de señas colombiana.",
        "Me apasiona la IA, el desarrollo web y crear tecnología que genere un impacto positivo.",
        "¡Explora mi portafolio para ver mis proyectos y habilidades en detalle!",
      ]

      const aiMessage: Message = {
        id: Date.now().toString(),
        content: responses[Math.floor(Math.random() * responses.length)],
        sender: "ai",
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

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Barra de chat */}
      <div className={`w-full bg-white shadow-md transition-all duration-300 ${isOpen ? "shadow-lg" : ""}`}>
        <div className="container mx-auto px-4">
          <div className={`flex items-center justify-between py-3 transition-all duration-300 ${isOpen ? "pb-4" : ""}`}>
            {/* Botón de chat */}
            <div className="flex items-center cursor-pointer" onClick={() => !isOpen && setIsOpen(true)}>
              <div className="relative mr-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                  IA
                </div>

                {/* Efecto de brillo */}
                <div className="absolute -inset-0.5 bg-pink-500 rounded-full blur-sm opacity-50 animate-pulse"></div>
                <div
                  className="absolute -inset-1 bg-pink-300 rounded-full blur-md opacity-30 animate-pulse"
                  style={{ animationDelay: "300ms" }}
                ></div>
                <div
                  className="absolute -inset-1.5 bg-pink-200 rounded-full blur-lg opacity-20 animate-pulse"
                  style={{ animationDelay: "600ms" }}
                ></div>

                {/* Puntos de brillo */}
                <div className="absolute top-0 right-0 w-2 h-2 bg-white rounded-full opacity-80 animate-ping"></div>
                <div
                  className="absolute bottom-1 left-0 w-1.5 h-1.5 bg-white rounded-full opacity-60 animate-ping"
                  style={{ animationDelay: "1s" }}
                ></div>
              </div>

              <div>
                <p className="text-sm font-medium">{isOpen ? "Chatea con mi IA" : "Pregúntame lo que quieras saber"}</p>
                <p className="text-xs text-gray-500">
                  {isOpen ? "Escribe tu pregunta abajo" : "Haz clic para chatear"}
                </p>
              </div>
            </div>

            {/* Botón de cerrar */}
            {isOpen && (
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            )}
          </div>

          {/* Área de chat expandida */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                {/* Mensajes */}
                <div className="bg-gray-50 rounded-t-lg p-4 h-64 overflow-y-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`mb-3 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "ai" && (
                        <div className="w-8 h-8 bg-pink-100 rounded-full mr-2 flex items-center justify-center flex-shrink-0">
                          <Bot className="h-4 w-4 text-pink-500" />
                        </div>
                      )}
                      <div
                        className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                          message.sender === "user"
                            ? "bg-pink-500 text-white"
                            : "bg-white border border-gray-200 text-gray-800"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start mb-3">
                      <div className="w-8 h-8 bg-pink-100 rounded-full mr-2 flex items-center justify-center flex-shrink-0">
                        <Bot className="h-4 w-4 text-pink-500" />
                      </div>
                      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-2">
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

                {/* Input */}
                <div className="p-3 bg-white border-t border-gray-200 rounded-b-lg">
                  <div className="flex">
                    <Input
                      ref={inputRef}
                      type="text"
                      placeholder="Escribe qué quieres saber de mí..."
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

      {/* Espacio para compensar la barra fija */}
      <div className={`h-16 ${isOpen ? "h-24" : ""}`}></div>
    </div>
  )
}
