"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X, Github, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProjectModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
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
  } | null
}

export default function ProjectModal({ isOpen, onClose, project }: ProjectModalProps) {
  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl max-w-2xl max-h-[90vh] overflow-y-auto w-full">
              {/* Header con imagen */}
              <div className="relative h-64 md:h-80 bg-gradient-to-b from-gray-100 to-gray-50 overflow-hidden">
                {project.image && (
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                )}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition"
                >
                  <X className="h-5 w-5 text-gray-900" />
                </button>
              </div>

              {/* Contenido */}
              <div className="p-6 md:p-8">
                {/* Título y descripción */}
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-gray-900">{project.title}</h2>
                <p className="text-gray-600 mb-6 text-lg leading-relaxed">{project.description}</p>

                {/* Video o galería */}
                {project.video && (
                  <div className="mb-6 rounded-lg overflow-hidden">
                    <iframe
                      width="100%"
                      height="315"
                      src={project.video}
                      title={project.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    />
                  </div>
                )}

                {/* Galería de imágenes */}
                {project.gallery && project.gallery.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-gray-900">Galería</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {project.gallery.map((img, idx) => (
                        <img
                          key={idx}
                          src={img || "/placeholder.svg"}
                          alt={`${project.title} - Imagen ${idx + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Tecnologías */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Tecnologías Utilizadas</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="bg-pink-100 text-pink-700 px-3 py-1 rounded-full text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Logros */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 text-gray-900">Logros Destacados</h3>
                  <ul className="space-y-2">
                    {project.achievements.map((achievement, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-pink-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Enlaces */}
                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  {project.github && (
                    <Button asChild className="flex-1 bg-black hover:bg-gray-800 text-white rounded-lg">
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" /> GitHub
                      </a>
                    </Button>
                  )}
                  {project.demo && (
                    <Button asChild className="flex-1 bg-pink-500 hover:bg-pink-600 text-white rounded-lg">
                      <a href={project.demo} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" /> Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
