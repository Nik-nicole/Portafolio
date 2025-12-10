"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface Skill {
  name: string
  level: number
  category: string
}

const skills: Skill[] = [
  // Lenguajes de programación
  { name: "Python", level: 90, category: "languages" },
  { name: "JavaScript", level: 85, category: "languages" },
  { name: "TypeScript", level: 75, category: "languages" },
  { name: "Java", level: 65, category: "languages" },

  // Frameworks & Librerías
  { name: "React", level: 85, category: "frameworks" },
  { name: "Astro", level: 80, category: "frameworks" },
  { name: "Flask", level: 75, category: "frameworks" },
  { name: "Spring Boot", level: 65, category: "frameworks" },
  { name: "Next.js", level: 70, category: "frameworks" },

  // AI & ML
  { name: "TensorFlow", level: 80, category: "ai" },
  { name: "YOLO", level: 85, category: "ai" },
  { name: "Matplotlib", level: 90, category: "ai" },
  { name: "NumPy", level: 85, category: "ai" },

  // Herramientas
  { name: "Git", level: 90, category: "tools" },
  { name: "Docker", level: 70, category: "tools" },
  { name: "Google Colab", level: 95, category: "tools" },
  { name: "VS Code", level: 85, category: "tools" },

  // Bases de datos
  { name: "PostgreSQL", level: 75, category: "databases" },
  { name: "MongoDB", level: 70, category: "databases" },
  { name: "SQLite", level: 85, category: "databases" },
  { name: "Firebase", level: 80, category: "databases" },

  // Idiomas
  { name: "Spanish", level: 100, category: "languages-human" },
  { name: "English", level: 65, category: "languages-human" },
  { name: "Sign Language", level: 80, category: "languages-human" },
]

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState("all")

  const categories = [
    { id: "all", name: "All Skills" },
    { id: "languages", name: "Programming" },
    { id: "frameworks", name: "Frameworks" },
    { id: "ai", name: "AI & ML" },
    { id: "tools", name: "Tools" },
    { id: "databases", name: "Databases" },
    { id: "languages-human", name: "Languages" },
  ]

  const filteredSkills = activeCategory === "all" ? skills : skills.filter((skill) => skill.category === activeCategory)

  return (
    <section className="py-20 bg-white" id="skills">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
            Technical <span className="text-pink-500">Skills</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A comprehensive overview of my technical expertise and proficiency levels.
          </p>
        </div>

        {/* Filtros de categoría */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-4">
          <div className="flex space-x-2 p-1 bg-gray-100 rounded-full">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === category.id
                    ? "bg-pink-500 text-white shadow-md"
                    : "bg-transparent text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Visualización de habilidades */}
        <div className="relative">
          {/* Línea central */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>

          <div className="relative z-10">
            {filteredSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`mb-8 flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
              >
                {/* Punto central */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-pink-500"></div>

                {/* Contenido */}
                <div className="w-1/2"></div>
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-12 text-right" : "pl-12 text-left"}`}>
                  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="flex items-center mb-2 justify-between">
                      <h3 className={`text-xl font-bold ${index % 2 === 0 ? "order-1" : "order-2"}`}>{skill.name}</h3>
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          skill.level >= 90
                            ? "bg-green-100 text-green-800"
                            : skill.level >= 75
                              ? "bg-blue-100 text-blue-800"
                              : skill.level >= 60
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                        } ${index % 2 === 0 ? "order-2" : "order-1"}`}
                      >
                        {skill.level}%
                      </div>
                    </div>

                    {/* Barra de progreso estilizada */}
                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-pink-400 to-pink-600"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>

                    {/* Indicador de nivel */}
                    <p className="text-xs text-gray-500 mt-2">
                      {skill.level >= 90
                        ? "Expert"
                        : skill.level >= 75
                          ? "Advanced"
                          : skill.level >= 60
                            ? "Intermediate"
                            : "Beginner"}
                    </p>
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
