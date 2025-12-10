"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, Send, User, Bot, ChevronDown, ChevronUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"

interface Message {
  id: string
  content: string
  sender: "user" | "ai"
  timestamp: Date
}

// Contexto de la IA con información detallada
const aiContext = {
  name: "Tu Nombre",
  role: "Desarrolladora Full Stack con experiencia en IA y Visión por Computadora",
  experience: {
    education: [
      "🎓 Técnico en Programación de Software — SENA",
      "🎓 Tecnólogo en Análisis y Desarrollo de Software — SENA (Fábrica de Software)",
      "🏅 3er puesto en Competencia Nacional Senasoft",
      "🏅 3er puesto en Hackathon MinTIC"
    ],
    work: [
      "💼 1 año en Fábrica de Software (SENA) - Proyecto de IA y visión por computadora",
      "💼 1 año en Fundación Bolívar Davivienda - Prácticas profesionales"
    ],
    skills: {
      ai: ["YOLO", "TensorFlow", "MediaPipe", "OpenCV", "MobileNet", "Visión por Computadora", "Procesamiento de Imágenes"],
      backend: ["Java", "Spring Boot", "PostgreSQL", "DTOs", "Servicios", "Repositorios", "Modelado 3NF"],
      frontend: ["React", "Vite", "Tailwind", "styled-components", "Diseño Responsivo"],
      mobile: ["React Native", "Expo", "Expo Router", "Google Auth"],
      automation: ["Google AppScript", "Automatización de Procesos"],
      uiux: ["Diseño de interfaces", "Prototipado", "Experiencia de usuario", "Diseño Centrado en el Usuario"]
    },
    projects: [
      {
        name: "👐 Reconocimiento de Lengua de Señas Colombiana (LSC)",
        description: "Sistema avanzado de reconocimiento de lengua de señas usando visión por computadora y aprendizaje profundo.",
        technologies: ["YOLO", "TensorFlow", "MediaPipe", "OpenCV", "Python", "Numpy"],
        achievements: [
          "3er puesto en competencia nacional Senasoft",
          "Desarrollo de dataset propio con cientos de secuencias",
          "Implementación en tiempo real con predicción precisa",
          "Aprendizaje de LSC para mejor comprensión del contexto"
        ]
      },
      {
        name: "📱 Turnito - App de Gestión de Turnos",
        description: "Aplicación móvil para gestión de turnos con autenticación de Google y diseño intuitivo.",
        technologies: ["React Native", "Expo", "Google Auth", "UI/UX Design"],
        achievements: [
          "Diseño de interfaz limpia y funcional",
          "Implementación de navegación fluida",
          "Componentes reutilizables y optimizados"
        ]
      },
      {
        name: "🛡️ CiberHero - Plataforma de Aprendizaje en Ciberseguridad",
        description: "Plataforma gamificada para enseñanza de conceptos de ciberseguridad.",
        technologies: ["React", "Node.js", "MongoDB", "Gamificación"],
        achievements: [
          "3er puesto nacional en Hackathon MinTIC",
          "Diseño centrado en la experiencia de aprendizaje",
          "Implementación de mecánicas de juego educativas"
        ]
      }
    ],
    contests: [
      "🥉 3er puesto en competencia nacional Senasoft con un proyecto que ayudaba al medio ambiente reduciendo el desperdicio de comida",
      "🥉 3er puesto nacional en Hackathon MinTIC con CiberHero, una plataforma de aprendizaje en ciberseguridad",
    ],
  },
  level: "Desarrolladora junior con experiencia práctica en proyectos reales",
  salaryRange: "Entre 3'500.000 y 4'000.000 COP mensuales",
  strengths: [
    "Aprendo rápido tecnologías nuevas",
    "Me gusta mucho cuidar los detalles de diseño y experiencia de usuario",
    "Soy constante y no me rindo fácil cuando algo es difícil",
  ],
  weaknesses: [
    "A veces quiero que todo salga perfecto y tardo más de lo esperado",
    "Me cuesta delegar porque me gusta tener control del resultado",
  ],
  softSkills: [
    "Trabajo en equipo y comunicación con personas no técnicas",
    "Empatía y escucha activa",
    "Organización y responsabilidad con los entregables",
  ],
  languages: ["🇪🇸 Español (nativo)", "🇺🇸 Inglés (B1-B2)", "👐 Lengua de Señas Colombiana (LSC)"],
  interests: ["🎨 Pintar acuarela", "🎸 Tocar guitarra", "🎾 Jugar tenis", "💻 Crear interfaces hermosas y funcionales", "🧠 Aprender nuevas tecnologías"]
}

const SUGGESTED_QUESTIONS = [
  "¿Cuál es tu experiencia laboral?",
  "Háblame sobre tus proyectos",
  "¿Qué tecnologías manejas?",
  "¿Dónde has estudiado?",
  "¿Cuáles son tus intereses?"
]

export default function ChatWidget() {
  // El historial comienza oculto; solo se ve la barra hasta que el usuario expande el chat
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: `¡Hola! Soy el asistente de ${aiContext.name}. ¿En qué puedo ayudarte hoy? 😊\n\nPuedes preguntarme sobre mi experiencia, proyectos o habilidades técnicas.`,
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showSuggestedQuestions, setShowSuggestedQuestions] = useState(true)
  const { toast } = useToast()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    // Solo desplazamos el contenedor interno, nunca la página completa
    if (messagesContainerRef.current) {
      const container = messagesContainerRef.current
      container.scrollTo({
        top: container.scrollHeight,
        behavior,
      })
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior, block: "end" })
    }
  }, [])

  useEffect(() => {
    if (!messagesContainerRef.current) return

    const container = messagesContainerRef.current
    const isScrolledToBottom =
      container.scrollHeight - container.scrollTop <= container.clientHeight + 60

    // Solo auto-scroll si el usuario ya estaba cerca del final
    if (isScrolledToBottom) {
      const timer = setTimeout(() => {
        scrollToBottom("smooth")
      }, 80)
      return () => clearTimeout(timer)
    }
  }, [messages, scrollToBottom])

  // Normaliza texto: minúsculas, sin tildes, sin espacios extra
  const normalizeText = (text: string) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()

  const generateAIResponse = (rawInput: string): string => {
    const input = normalizeText(rawInput)

    const unrelatedKeywords = [
      "como estas",
      "que haces",
      "que tal",
      "clima",
      "tiempo",
      "noticias",
      "chiste",
      "cuenta un chiste",
      "cual es tu edad",
      "cuantos anos tienes",
      "de donde eres",
      "quien te creo",
      "eres real",
      "eres un bot",
      "eres humano"
    ]

    if (unrelatedKeywords.some((keyword) => input.includes(keyword))) {
      return "Solo puedo responder preguntas relacionadas con el portafolio, la experiencia, los proyectos, las habilidades y la formación de la desarrolladora. Si quieres, puedo contarte sobre sus proyectos o experiencia profesional."
    }

    if (input.includes("hola") || input.includes("buenos dias") || input.includes("buenas tardes") || input.includes("buenas noches") || input.includes("saludos")) {
      return `Hola, soy el asistente del portafolio de ${aiContext.name}. ¿En qué puedo ayudarte hoy? �\n\nPuedes preguntarme sobre:\n• Experiencia profesional\n• Proyectos\n• Habilidades técnicas\n• Formación académica\n• Intereses personales`;
    }

    if (input.includes("nombre") || input.includes("como te llamas") || input.includes("cual es tu nombre") || input.includes("quien eres")) {
      return `Soy el asistente del portafolio de ${aiContext.name}. Estoy aquí para ayudarte a conocer mejor su experiencia, proyectos y habilidades.`
    }

    if (input.includes("proyecto") || input.includes("proyectos") || input.includes("portafolio")) {
      return (
        "Proyectos destacados:\n\n" +
        "1. Reconocimiento de Lengua de Señas Colombiana (LSC). Sistema de reconocimiento usando visión por computadora.\n\n" +
        "2. Turnito, aplicación móvil para gestión de turnos con autenticación de Google.\n\n" +
        "3. CiberHero, plataforma gamificada para aprendizaje en ciberseguridad.\n\n" +
        "¿Sobre cuál de estos proyectos te gustaría saber más?"
      )
    }

    if (input.includes("habilidad") || input.includes("habilidades") || input.includes("tecnolog") || input.includes("stack") || input.includes("sabes")) {
      return (
        "Habilidades técnicas principales:\n\n" +
        "• IA y visión por computadora: YOLO, TensorFlow, OpenCV, MediaPipe, MobileNet.\n" +
        "• Desarrollo web: React, Next.js, Tailwind CSS, Vite.\n" +
        "• Desarrollo móvil: React Native, Expo.\n" +
        "• Backend: Node.js, Spring Boot, PostgreSQL.\n\n" +
        "Si quieres, puedo explicarte con más detalle alguna de estas áreas."
      )
    }

    if (input.includes("experiencia") || input.includes("trabajo") || input.includes("laboral") || input.includes("trayectoria")) {
      return (
        "Experiencia profesional:\n\n" +
        "1. Fábrica de Software - SENA. Un año de trabajo en proyectos de IA y visión por computadora, en un entorno con metodologías ágiles.\n\n" +
        "2. Fundación Bolívar Davivienda. Un año de prácticas profesionales desarrollando herramientas de automatización con AppScript y colaborando con equipos multidisciplinarios.\n\n" +
        "Puedo darte más detalles sobre cualquiera de estas experiencias si lo necesitas."
      )
    }

    if (input.includes("estudio") || input.includes("estudios") || input.includes("formacion") || input.includes("formacion academica") || input.includes("educacion")) {
      return (
        "Formación académica:\n\n" +
        "• Técnico en Programación de Software — SENA.\n" +
        "• Tecnólogo en Análisis y Desarrollo de Software — SENA (Fábrica de Software).\n" +
        "• Reconocimientos en competencias y hackathones nacionales.\n\n" +
        "Si quieres, puedo contarte más sobre esta trayectoria académica."
      )
    }

    if (input.includes("interes") || input.includes("intereses") || input.includes("gusta") || input.includes("gustos") || input.includes("hobby") || input.includes("hobbies")) {
      return (
        "Algunos intereses personales son:\n\n" +
        "• Pintar acuarela.\n" +
        "• Tocar guitarra.\n" +
        "• Jugar tenis.\n" +
        "• Crear interfaces cuidadas y funcionales.\n" +
        "• Aprender nuevas tecnologías.\n\n" +
        "¿Hay algún interés del que quieras que hablemos más?"
      )
    }

    if (input.includes("concurso") || input.includes("competencia") || input.includes("senasoft") || input.includes("hackathon") || input.includes("mintic")) {
      return (
        "Concursos y logros destacados:\n\n" +
        "• " + aiContext.experience.contests[0] + ".\n" +
        "  Era una app web para ayudar a que no se desperdiciara tanta comida. Permitía a negocios vender comida a menor precio, donarla o usarla para ayudar a personas, e incluía la idea de beneficios para las empresas (como reducir impuestos) si aprovechaban mejor esos alimentos.\n\n" +
        "• " + aiContext.experience.contests[1] + ".\n" +
        "  CiberHero es un juego de aprendizaje en ciberseguridad que se adapta a ti: si respondes mal, las preguntas y explicaciones cambian para ayudarte a entender mejor y que el aprendizaje se ajuste a ti, no tú a él.\n\n" +
        "Si quieres, puedo contarte con más detalle sobre Senasoft o sobre la Hackathon MinTIC."
      )
    }

    if (input.includes("fortaleza") || input.includes("fortalezas") || input.includes("debilidad") || input.includes("debilidades")) {
      return (
        "Fortalezas y debilidades:\n\n" +
        "Fortalezas:\n" +
        "• " + aiContext.strengths.join(".\n• ") + ".\n\n" +
        "Debilidades (en las que estoy trabajando):\n" +
        "• " + aiContext.weaknesses.join(".\n• ") + ".\n\n" +
        "Me gusta ser honesta con estas cosas porque también muestran cómo estoy creciendo como desarrolladora."
      )
    }

    if (input.includes("softskill") || input.includes("soft skill") || input.includes("habilidades blandas") || input.includes("habilidad blanda")) {
      return (
        "Algunas de mis soft skills más importantes son:\n\n" +
        "• " + aiContext.softSkills.join(".\n• ") + ".\n\n" +
        "Estas habilidades me han ayudado mucho en equipos de trabajo, hackathons y proyectos con personas de diferentes perfiles."
      )
    }

    if (input.includes("junior") || input.includes("nivel") || input.includes("experiencia") && input.includes("anos")) {
      return (
        aiContext.level + ".\n\n" +
        "He trabajado en proyectos reales en Fábrica de Software, en la Fundación Bolívar Davivienda y en competencias como Senasoft y la Hackathon MinTIC.\n" +
        "Mi enfoque es seguir creciendo rápido, pero siendo honesta con mi nivel actual."
      )
    }

    if (input.includes("salario") || input.includes("sueldo") || input.includes("aspiracion salarial") || input.includes("cuanto quieres ganar") || input.includes("salario minimo")) {
      return (
        "Mi expectativa salarial actual es: " + aiContext.salaryRange + ".\n" +
        "Estoy abierta a conversar según el rol, el tipo de proyecto y las oportunidades de crecimiento que ofrezca la empresa."
      )
    }

    if (input.includes("python") || input.includes("pyton")) {
      return (
        "Sí, manejo Python, especialmente en contextos de inteligencia artificial y visión por computadora.\n\n" +
        "Por ejemplo, en el proyecto de reconocimiento de lengua de señas colombiana usé Python junto con TensorFlow, OpenCV y otras librerías para entrenar y probar los modelos.\n" +
        "En la página del portafolio puedes ver más detalles en la sección de proyectos de IA."
      )
    }

    if (input.includes("mejor experiencia") || input.includes("mejor experie") || input.includes("experiencia favorita") || input.includes("experiencia que mas te gusto")) {
      return (
        "Una de mis mejores experiencias fue la competencia nacional Senasoft.\n\n" +
        "Trabajamos en un sistema de reconocimiento de lengua de señas colombiana usando IA y visión por computadora. Fue retador por la parte técnica y también por el trabajo en equipo bajo presión.\n" +
        "Aprendí a organizar mejor las tareas, a comunicarme con el equipo y a confiar en mis habilidades, y además obtuvimos el 3er puesto nacional."
      )
    }

    if (input.includes("idioma") || input.includes("idiomas") || input.includes("lengua") || input.includes("lenguajes")) {
      return (
        "Idiomas que manejo:\n\n" +
        aiContext.languages.join("\n") +
        "\n\nPuedo comentarte cómo he aplicado estos idiomas en proyectos o estudios si lo necesitas."
      )
    }

    return (
      "No estoy seguro de haber entendido bien tu pregunta.\n\n" +
      "Puedo ayudarte con información sobre:\n" +
      "• Experiencia laboral.\n" +
      "• Proyectos técnicos.\n" +
      "• Habilidades en programación.\n" +
      "• Formación académica.\n\n" +
      "Si quieres, reformula tu pregunta o dime directamente sobre qué aspecto te gustaría saber más."
    )
  }

  const handleSendMessage = async () => {
    const trimmedInput = inputValue.trim()
    if (!trimmedInput || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: trimmedInput,
      sender: "user",
      timestamp: new Date(),
    }

    // Mantener solo los últimos mensajes para que el chat no haga crecer mucho la página
    setMessages((prev) => [...prev.slice(-4), userMessage])
    // Desplazar al final después de agregar el mensaje del usuario
    scrollToBottom("smooth")
    setInputValue("")
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 600))

      const aiResponse = generateAIResponse(trimmedInput)

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: "ai",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev.slice(-4), aiMessage])
      // Desplazar al final después de agregar la respuesta de la IA
      scrollToBottom("smooth")
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
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
        content: `¡Hola! Soy el asistente de ${aiContext.name}. ¿En qué puedo ayudarte hoy? 😊\n\nPuedes preguntarme sobre mi experiencia, proyectos o habilidades técnicas.`,
        sender: "ai",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <motion.div
      className="w-full max-w-4xl mx-auto mb-10"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="relative">
        {/* Botón de cerrar chat, visible solo cuando está abierto */}
        {isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="absolute -top-3 right-0 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-3 py-1 text-[11px] md:text-xs text-gray-600 shadow-sm border border-gray-200 hover:bg-white transition-colors"
          >
            <X className="h-3 w-3" />
            <span className="hidden sm:inline">Cerrar chat</span>
          </button>
        )}

        {/* Fondo suave tipo hero detrás del chat */}
        <div className="pointer-events-none absolute -inset-x-8 -top-6 h-32 bg-gradient-to-r from-pink-100/60 via-white to-pink-50/60 blur-2xl opacity-80" />

        <div className="relative">
          {/* Historial de mensajes dentro de un contenedor con altura limitada */}
          {isOpen && (
            <div
              ref={messagesContainerRef}
              className="chat-scroll mb-4 max-h-80 md:max-h-96 overflow-y-auto pr-1 space-y-3"
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.22, ease: "easeOut" }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex max-w-[90%] items-end gap-2">
                    {message.sender === "ai" && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-white shadow-sm">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-2 text-sm md:text-[0.9rem] leading-relaxed whitespace-pre-wrap shadow-sm ${
                        message.sender === "user"
                          ? "bg-pink-500 text-white rounded-br-none"
                          : "bg-gray-50 text-gray-900 border border-pink-100/60 rounded-tl-none"
                      }`}
                    >
                      {message.content}
                    </div>
                    {message.sender === "user" && (
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-900 text-white shadow-sm">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-white shadow-sm mr-2">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="rounded-2xl bg-gray-50 border border-pink-100 px-4 py-2 text-sm text-gray-700 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Barra principal tipo input, sin caja alrededor */}
          <div
            className="relative flex items-center w-full rounded-full border border-gray-200 bg-white shadow-sm px-4 py-2 md:py-3 cursor-text"
            onClick={() => {
              if (!isOpen) setIsOpen(true)
            }}
          >
        {/* Icono robot lado izquierdo (limpiar) */}
        <button
          type="button"
          onClick={clearChat}
          className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-white shadow-sm hover:bg-pink-600 transition-colors"
          title="Limpiar conversación"
        >
          <Bot className="h-4 w-4" />
        </button>

        <input
          type="text"
          placeholder="Interactúa con la IA para conocer mejor a la desarrolladora..."
          className="flex-1 bg-transparent text-sm md:text-base text-gray-800 placeholder:text-gray-400 focus:outline-none"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              handleSendMessage()
            }
          }}
          disabled={isLoading}
        />

        {/* Botón para plegar/desplegar historial */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="ml-2 flex h-7 w-7 items-center justify-center rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
          title={isOpen ? "Cerrar chat" : "Abrir chat"}
        >
          {isOpen ? <X className="h-3 w-3" /> : <ChevronUp className="h-3 w-3" />}
        </button>

        <button
          type="button"
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isLoading}
          className={`ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 text-white shadow-sm transition-colors ${
            !inputValue.trim() || isLoading ? "opacity-60 cursor-not-allowed" : "hover:bg-pink-600"
          }`}
        >
          {isLoading ? (
            <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Preguntas sugeridas como chips debajo de la barra */}
      {isOpen && SUGGESTED_QUESTIONS.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {SUGGESTED_QUESTIONS.map((question, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSuggestedQuestion(question)}
              className="text-xs md:text-sm px-3 py-1 rounded-full border border-pink-200 text-pink-600 bg-pink-50 hover:bg-pink-100 transition-colors"
            >
              {question}
            </button>
          ))}
        </div>
      )}
        </div>
      </div>
    </motion.div>
  )
}
