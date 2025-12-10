"use client"

import { useState } from "react"
import { ExternalLink, Github, Trophy } from "lucide-react"
import { motion } from "framer-motion"
import ProjectModal from "./project-modal"

interface Project {
  id: number
  title: string
  description: string
  image: string
  technologies: string[]
  achievements: string[]
  github?: string
  demo?: string
  video?: string
  gallery?: string[]
}

const projects: Project[] = [
  {
    id: 1,
    title: "Sistema de Reconocimiento de Imágenes con IA",
    description:
      "Desarrollé un sistema personalizado de reconocimiento de imágenes utilizando YOLO y TensorFlow para detección de objetos en tiempo real.",
    image: "/ai-recognition-system.jpg",
    technologies: ["Python", "TensorFlow", "YOLO", "OpenCV"],
    achievements: [
      "99.2% de precisión en dataset de prueba",
      "Optimizado para dispositivos edge",
      "Presentado en hackathon local",
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    gallery: ["/placeholder-zitpj.png", "/ai-detection-2.jpg", "/ai-detection-3.jpg", "/placeholder-mo00n.png"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    id: 2,
    title: "Plataforma E-commerce",
    description: "Construí una plataforma e-commerce full-stack con frontend en React y backend en Spring Boot.",
    image: "/ecommerce-platform.jpg",
    technologies: ["React", "Spring Boot", "PostgreSQL", "Docker"],
    achievements: [
      "Implementación de pasarela de pago segura",
      "Reducción del tiempo de carga en un 40%",
      "Diseño responsive",
    ],
    gallery: ["/ecommerce-1.jpg", "/ecommerce-2.jpg", "/ecommerce-3.jpg", "/ecommerce-4.jpg"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
  {
    id: 3,
    title: "Dashboard de Visualización de Datos",
    description:
      "Creé un dashboard interactivo para visualizar conjuntos de datos complejos usando Python y JavaScript.",
    image: "/data-dashboard.jpg",
    technologies: ["Python", "Flask", "JavaScript", "D3.js", "Matplotlib"],
    achievements: [
      "Procesamiento de más de 1M de datos",
      "Actualizaciones en tiempo real",
      "Sistema de filtrado personalizado",
    ],
    gallery: ["/dashboard-1.jpg", "/dashboard-2.jpg", "/dashboard-3.jpg", "/dashboard-4.jpg"],
    github: "https://github.com",
    demo: "https://demo.com",
  },
]

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  return (
    <section className="py-16 md:py-20 bg-gray-50" id="projects">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black text-balance">
            Proyectos <span className="text-pink-500">Destacados</span>
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Una muestra de mis habilidades técnicas y capacidad para resolver problemas a través de aplicaciones del
            mundo real.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={item}>
              <div
                className="group relative h-80 md:h-[400px] bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer"
                onClick={() => handleProjectClick(project)}
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0 transition-all duration-500 group-hover:scale-110">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="absolute inset-0 z-20 p-4 md:p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <span className="bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                        {project.technologies[0]}
                      </span>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
                        {project.github && (
                          <a
                            href={project.github}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                          >
                            <Github className="h-4 w-4 text-black" />
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors"
                          >
                            <ExternalLink className="h-4 w-4 text-black" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-white/80 text-sm mb-4 line-clamp-2 group-hover:line-clamp-none">
                      {project.description}
                    </p>

                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 mt-2">
                      <h4 className="text-xs font-semibold text-white/90 mb-2">Tecnologías</h4>
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="text-xs bg-white/20 text-white px-2 py-1 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/20">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center flex-shrink-0">
                          <Trophy className="h-4 w-4 text-white" />
                        </div>
                        <div className="ml-2">
                          <p className="text-xs text-white/70">Logro destacado</p>
                          <p className="text-sm text-white font-medium">{project.achievements[0]}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <ProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} project={selectedProject} />
    </section>
  )
}
