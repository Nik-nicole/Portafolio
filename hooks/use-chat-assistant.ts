"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

export interface ChatMessage {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

interface UseChatAssistantResult {
  messages: ChatMessage[]
  inputValue: string
  isLoading: boolean
  setInputValue: (value: string) => void
  handleSendMessage: () => Promise<void>
  handleSuggestedQuestion: (question: string) => void
  clearChat: () => void
}

export function useChatAssistant(): UseChatAssistantResult {
  const { toast } = useToast()

  const [messages, setMessages] = useState<ChatMessage[]>([{
    id: "welcome",
    content:
      "¡Hola! Soy Nicole (bueno, mi versión asistente IA ✨). Estoy aquí para que puedas conocer rápido mi experiencia, mis proyectos y en qué te puedo aportar. ¿Por dónde te gustaría empezar?",
    sender: "ai",
    timestamp: new Date(),
  }])

  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim()
    if (!trimmedInput || isLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: trimmedInput,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev.slice(-4), userMessage])
    setInputValue("")
    setIsLoading(true)

    try {
      const payload = {
        messages: [...messages, userMessage].map((m) => ({
          role: m.sender === "ai" ? "assistant" : "user",
          content: m.content,
        })),
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        throw new Error("Error al comunicarse con el asistente IA")
      }

      const data = await res.json()

      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content:
          typeof data.response === "string" && data.response.trim().length > 0
            ? data.response
            : "Por ahora no pude responderte bien desde la IA, pero si quieres puedes preguntarme sobre mi experiencia, proyectos o habilidades técnicas.",
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev.slice(-4), aiMessage])
    } catch (error) {
      console.error("Error al enviar mensaje:", error)
      toast({
        title: "Error",
        description: "No se pudo enviar el mensaje. Intenta de nuevo.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question)
    setTimeout(() => {
      handleSendMessage()
    }, 100)
  }

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        content:
          "¡Hola! Soy Nicole (mi versión asistente IA ✨). Si quieres, te cuento de mis proyectos de IA con visión por computador, mis experiencias en hackathons o mi trabajo en Fundación Bolívar Davivienda.",
        sender: "ai",
        timestamp: new Date(),
      },
    ])
    setInputValue("")
  }

  return {
    messages,
    inputValue,
    isLoading,
    setInputValue,
    handleSendMessage,
    handleSuggestedQuestion,
    clearChat,
  }
}
