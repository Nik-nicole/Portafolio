"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, Code, Brain, Coffee, Music, Book } from "lucide-react"

export default function About() {
  return (
    <section className="py-20 bg-white" id="about">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-pink-200 rounded-full opacity-50"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-pink-200 rounded-full opacity-50"></div>
                <div className="relative z-10 bg-white p-1 border-2 border-black rounded-2xl overflow-hidden">
                  <img src="/placeholder.svg?height=600&width=600" alt="Perfil" className="w-full h-auto rounded-xl" />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white shadow-lg rounded-lg p-4 border border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-5 w-5 text-pink-500" />
                    <span className="text-sm font-medium">Desarrolladora Apasionada</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-black">
                <span className="text-pink-500">¿Quién soy?</span> Una Joven Desarrolladora con Grandes Sueños
              </h2>

              <div className="prose prose-lg text-gray-600 mb-8">
                <p>
                  Con solo 18 años, soy una ingeniera de software full-stack apasionada con un interés particular en la
                  inteligencia artificial y la creación de soluciones tecnológicas significativas.
                </p>
                <p>
                  A pesar de mi corta edad, ya he acumulado conocimientos técnicos significativos y experiencia práctica
                  a través de proyectos, hackathons e iniciativas colaborativas. Creo que la edad es solo un número
                  cuando se trata de innovación y resolución de problemas.
                </p>
                <p>
                  Mi trayectoria en tecnología está impulsada por la curiosidad y el deseo de generar un impacto
                  positivo. Constantemente estoy aprendiendo, experimentando con nuevas tecnologías y superando mis
                  límites.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: <Code className="h-5 w-5 text-pink-500" />, text: "Programación" },
                  { icon: <Brain className="h-5 w-5 text-pink-500" />, text: "IA & ML" },
                  { icon: <Coffee className="h-5 w-5 text-pink-500" />, text: "Café" },
                  { icon: <Music className="h-5 w-5 text-pink-500" />, text: "Música" },
                  { icon: <Book className="h-5 w-5 text-pink-500" />, text: "Aprendizaje" },
                  { icon: <Heart className="h-5 w-5 text-pink-500" />, text: "Crear" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
                    {item.icon}
                    <span className="text-sm font-medium">{item.text}</span>
                  </div>
                ))}
              </div>

              <Button className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full">Conóceme Mejor</Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
