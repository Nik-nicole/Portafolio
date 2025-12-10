"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Award, Calendar, Briefcase, Code, Trophy } from "lucide-react"

interface TimelineEvent {
  id: number
  title: string
  date: string
  description: string
  icon: React.ReactNode
  category: "education" | "experience" | "achievement"
}

const timelineEvents: TimelineEvent[] = [
  {
    id: 1,
    title: "Fábrica de Software en SENA",
    date: "2023 - Presente",
    description:
      "Participé en el programa de Fábrica de Software del SENA, trabajando en proyectos reales y adquiriendo experiencia práctica en desarrollo de software.",
    icon: <Code className="h-5 w-5" />,
    category: "experience",
  },
  {
    id: 2,
    title: "Fundación Bolívar Davivienda",
    date: "2022 - 2023",
    description:
      "Colaboré con la Fundación Bolívar Davivienda en iniciativas tecnológicas orientadas al impacto social.",
    icon: <Briefcase className="h-5 w-5" />,
    category: "experience",
  },
  {
    id: 3,
    title: "Ganadora de Hackathon Nacional",
    date: "2022",
    description:
      "Obtuve el primer lugar en un hackathon nacional con una solución basada en IA para monitoreo ambiental.",
    icon: <Trophy className="h-5 w-5" />,
    category: "achievement",
  },
  {
    id: 4,
    title: "Reconocimiento por Proyecto de IA",
    date: "2021",
    description:
      "Recibí reconocimiento por desarrollar un proyecto innovador de IA que abordaba desafíos de accesibilidad.",
    icon: <Award className="h-5 w-5" />,
    category: "achievement",
  },
  {
    id: 5,
    title: "Educación Técnica en Desarrollo de Software",
    date: "2020 - 2023",
    description:
      "Completé educación técnica en desarrollo de software con enfoque en tecnologías full-stack y aplicaciones de IA.",
    icon: <Calendar className="h-5 w-5" />,
    category: "education",
  },
]

export default function Timeline() {
  return (
    <section className="py-20 bg-gray-50" id="experience">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
            Experiencia y <span className="text-pink-500">Logros</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Mi trayectoria en tecnología y los hitos que he alcanzado en el camino.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gray-200"></div>

            {/* Timeline events */}
            {timelineEvents.map((event, index) => (
              <motion.div
                key={event.id}
                className={`mb-12 flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="md:w-1/2"></div>
                <div className="relative flex items-center justify-center z-10">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center z-10 
                    ${
                      event.category === "education"
                        ? "bg-blue-100 text-blue-600"
                        : event.category === "experience"
                          ? "bg-pink-100 text-pink-600"
                          : "bg-purple-100 text-purple-600"
                    }`}
                  >
                    {event.icon}
                  </div>
                </div>
                <div className="md:w-1/2 pt-4 md:pt-0 md:px-6">
                  <div
                    className={`bg-white p-6 rounded-xl shadow-md border-l-4 
                    ${
                      event.category === "education"
                        ? "border-blue-500"
                        : event.category === "experience"
                          ? "border-pink-500"
                          : "border-purple-500"
                    }`}
                  >
                    <span
                      className={`text-sm font-semibold px-3 py-1 rounded-full 
                      ${
                        event.category === "education"
                          ? "bg-blue-100 text-blue-700"
                          : event.category === "experience"
                            ? "bg-pink-100 text-pink-700"
                            : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {event.date}
                    </span>
                    <h3 className="text-xl font-bold mt-3 text-black">{event.title}</h3>
                    <p className="mt-2 text-gray-600">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
