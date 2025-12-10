"use client"

import { useState } from "react"
import { motion } from "framer-motion"

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
  { name: "Español", level: 100, category: "languages-human" },
  { name: "Inglés", level: 65, category: "languages-human" },
  { name: "Lengua de Señas", level: 80, category: "languages-human" },
]

// Colores por categoría
const categoryColors: Record<string, string> = {
  languages: "#3B82F6", // blue-500
  frameworks: "#10B981", // emerald-500
  ai: "#8B5CF6", // violet-500
  tools: "#F59E0B", // amber-500
  databases: "#EF4444", // red-500
  "languages-human": "#EC4899", // pink-500
}

export default function SkillsHexagon() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const categories = [
    { id: "all", name: "Todas" },
    { id: "languages", name: "Programación" },
    { id: "frameworks", name: "Frameworks" },
    { id: "ai", name: "IA & ML" },
    { id: "tools", name: "Herramientas" },
    { id: "databases", name: "Bases de Datos" },
    { id: "languages-human", name: "Idiomas" },
  ]

  const filteredSkills = activeCategory === "all" ? skills : skills.filter((skill) => skill.category === activeCategory)

  return (
    <section className="py-20 bg-white" id="skills">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black">
            Habilidades <span className="text-pink-500">Técnicas</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Una visión completa de mi experiencia técnica y niveles de competencia.
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

        {/* Visualización de habilidades en hexágonos */}
        <div className="flex flex-wrap justify-center gap-4">
          {filteredSkills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className="relative"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Hexágono */}
              <div
                className="hexagon relative w-32 h-32 flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
                style={{
                  background: categoryColors[skill.category] || "#EC4899",
                  clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                <div className="text-white text-center p-2">
                  <div className="font-bold">{skill.name}</div>
                  <div className="text-xs mt-1">{skill.level}%</div>
                </div>

                {/* Borde brillante */}
                <div
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `linear-gradient(45deg, transparent 0%, white 50%, transparent 100%)`,
                    clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                    animation: "rotate 3s linear infinite",
                  }}
                ></div>
              </div>

              {/* Tooltip */}
              {hoveredSkill === skill.name && (
                <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded-lg shadow-lg z-10 w-48">
                  <div className="text-center">
                    <div className="font-bold">{skill.name}</div>
                    <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${skill.level}%`,
                          backgroundColor: categoryColors[skill.category] || "#EC4899",
                        }}
                      ></div>
                    </div>
                    <div className="text-xs mt-1 text-gray-600">
                      {skill.level >= 90
                        ? "Experto"
                        : skill.level >= 75
                          ? "Avanzado"
                          : skill.level >= 60
                            ? "Intermedio"
                            : "Principiante"}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-white"></div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Leyenda de categorías */}
        <div className="mt-16 flex flex-wrap justify-center gap-4">
          {categories
            .filter((c) => c.id !== "all")
            .map((category) => (
              <div key={category.id} className="flex items-center">
                <div
                  className="w-4 h-4 rounded-full mr-2"
                  style={{ backgroundColor: categoryColors[category.id] || "#EC4899" }}
                ></div>
                <span className="text-sm text-gray-600">{category.name}</span>
              </div>
            ))}
        </div>
      </div>

      {/* Estilos para la animación */}
      <style jsx>{`
        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  )
}
