"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Send, Bot, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
}

export default function FloatingAIBar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isDetached, setIsDetached] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const aboutSectionRef = useRef<HTMLElement | null>(null)
  const detachedBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Encontrar la sección "¿Quién soy?"
    aboutSectionRef.current = document.getElementById("about")

    const handleScroll = () => {
      if (aboutSectionRef.current && barRef.current) {
        const aboutRect = aboutSectionRef.current.getBoundingClientRect()
        const aboutTop = aboutRect.top
        const aboutBottom = aboutRect.bottom

        // Si la sección "¿Quién soy?" está entrando en la vista
        if (aboutTop <= 100 && aboutBottom >= 300) {
          setIsDetached(true)
          setIsVisible(true)
        }
        // Si la sección "¿Quién soy?" está por encima de la vista (ya pasamos)
        else if (aboutTop < -300) {
          setIsVisible(false)
        }
        // Si la sección "¿Quién soy?" está por debajo de la vista (aún no llegamos)
        else {
          setIsDetached(false)
          setIsVisible(true)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isExpanded) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
      inputRef.current?.focus()
    }
  }, [isExpanded, messages])

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

  const renderBar = () => (
    <div
      className={`relative bg-white rounded-full border border-gray-200 shadow-sm transition-all duration-300 ${
        isExpanded ? "rounded-2xl" : ""
      }`}
    >
      {/* Barra de búsqueda */}
      <div
        className={`flex items-center px-4 py-3 ${isExpanded ? "border-b border-gray-100" : ""}`}
        onClick={() => !isExpanded && setIsExpanded(true)}
      >
        <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mr-3">
          <span className="text-white text-xs font-bold">AI</span>
        </div>

        {!isExpanded ? (
          <>
            <span className="text-gray-500 flex-1">Interactúa con AI para más preguntas</span>
            <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
              <ArrowRight className="h-4 w-4 text-white" />
            </div>
          </>
        ) : (
          <>
            <span className="text-gray-800 font-medium flex-1">Pregúntame lo que quieras saber</span>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700 p-1 h-auto"
              onClick={(e) => {
                e.stopPropagation()
                setIsExpanded(false)
                setMessages([])
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>

      {/* Área expandida */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {/* Mensajes */}
            {messages.length > 0 && (
              <div className="max-h-64 overflow-y-auto p-4">
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
                      className={`max-w-[80%] rounded-xl px-3 py-2 text-sm ${
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
                    <div className="bg-gray-100 rounded-xl px-3 py-2">
                      <div className="flex space-x-1">
                        <div
                          className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></div>
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
            )}

            {/* Input */}
            <div className="p-3">
              <div className="flex">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Escribe tu pregunta profesional aquí..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 focus-visible:ring-pink-500 border-gray-200"
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
  )

  return (
    <>
      {/* Barra en el header (visible cuando no está desprendida) */}
      {!isDetached && (
        <div ref={barRef} className="w-full max-w-3xl mx-auto transition-all duration-500">
          {renderBar()}
        </div>
      )}

      {/* Barra desprendida (visible cuando está desprendida) */}
      <AnimatePresence>
        {isDetached && isVisible && (
          <motion.div
            ref={detachedBarRef}
            className="fixed top-4 left-0 right-0 z-50 px-4 transition-all duration-500"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
          >
            <div className="w-full max-w-3xl mx-auto">{renderBar()}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
