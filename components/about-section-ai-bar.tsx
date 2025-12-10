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

export default function AboutSectionAIBar() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "¡Hola! Tengo 18 años y soy una ingeniera de software full-stack apasionada con experiencia en IA, desarrollo web y hambre de innovación. Pregúntame lo que quieras saber sobre mí.",
      sender: "ai",
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const aboutSectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    // Encontrar la sección "¿Quién soy?"
    aboutSectionRef.current = document.getElementById("about")

    const handleScroll = () => {
      if (aboutSectionRef.current) {
        const aboutRect = aboutSectionRef.current.getBoundingClientRect()
        const aboutTop = aboutRect.top
        const aboutBottom = aboutRect.bottom

        // Si la sección "¿Quién soy?" está en la vista
        if (aboutTop <= 100 && aboutBottom >= 300) {
          setIsVisible(true)
        } else {
          setIsVisible(false)
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    // Verificar la posición inicial
    handleScroll()

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
        "Con solo 18 años, soy una ingeniera de software full-stack apasionada con un interés particular en la inteligencia artificial y la creación de soluciones tecnológicas significativas.",
        "A pesar de mi corta edad, ya he acumulado conocimientos técnicos significativos y experiencia práctica a través de proyectos, hackathons e iniciativas colaborativas.",
        "He participado en varios hackathons y he recibido reconocimiento por mis proyectos de IA enfocados en accesibilidad y monitoreo ambiental.",
        "Tengo experiencia trabajando en la Fábrica de Software del SENA y colaborando con la Fundación Bolívar Davivienda.",
        "Mis habilidades técnicas incluyen Python, JavaScript, React, Astro, Flask, Spring Boot, TensorFlow y más.",
        "Hablo español (nativo), inglés (A2-B1) y lengua de señas colombiana.",
        "Me apasiona la IA, el desarrollo web y crear tecnología que genere un impacto positivo.",
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

  if (!isVisible) return null

  return (
    <div className="sticky top-4 z-30 w-full max-w-3xl mx-auto my-8">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`relative bg-white rounded-full border border-gray-200 shadow-md transition-all duration-300 ${
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
              <span className="text-gray-500 flex-1">Pregúntame sobre mí y mi experiencia</span>
              <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-white" />
              </div>
            </>
          ) : (
            <>
              <span className="text-gray-800 font-medium flex-1">Chatea conmigo para conocerme mejor</span>
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

              {/* Input */}
              <div className="p-3">
                <div className="flex">
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Pregúntame sobre mi experiencia, habilidades o proyectos..."
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
      </motion.div>
    </div>
  )
}
