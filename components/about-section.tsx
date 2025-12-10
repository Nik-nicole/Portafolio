"use client"

import { useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Heart, Code, Brain, Coffee, Music, Book, ArrowRight } from "lucide-react"
import ChatWidget from "./chat-widget"

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)

  const handleKnowMeBetter = () => {
    // Smooth scroll to top where the AI header is
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })

    // Expand the chat after a brief delay
    setTimeout(() => {
      const chatButton = document.querySelector("[data-ai-header] button")
      if (chatButton && window.innerWidth < 768) {
        ;(chatButton as HTMLButtonElement).click()
      }
    }, 500)
  }

  return (
    <section ref={sectionRef} className="pt-12 md:pt-16 pb-20 bg-white" id="about">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-black text-balance">
              <span className="text-pink-500">¿Quién soy?</span>
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-2">
              Una joven desarrolladora con grandes sueños y habilidades técnicas sólidas
            </p>
          </div>

          {/* Chat AI justo debajo del título */}
          <div className="mb-10">
            <ChatWidget />
          </div>

          <div className="my-10 h-px bg-gradient-to-r from-transparent via-pink-200 to-transparent" />

          {/* Main About Content */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 items-start mt-8">
            {/* Profile Image - Ocupa 5 columnas en pantallas medianas y grandes */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="md:col-span-5 flex justify-center md:justify-end"
            >
              <div className="relative w-full max-w-xs">
                <div className="absolute -top-4 -left-4 w-20 h-20 md:w-24 md:h-24 bg-pink-200 rounded-full opacity-50"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 md:w-32 md:h-32 bg-pink-200 rounded-full opacity-50"></div>
                <div className="relative z-10 bg-white p-1 border-2 border-black rounded-2xl overflow-hidden">
                  <img 
                    src="/profile-photo.jpg" 
                    alt="Perfil" 
                    className="w-full h-auto rounded-xl object-cover"
                    style={{
                      aspectRatio: '1/1.2',
                      objectPosition: 'top center'
                    }}
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white shadow-lg rounded-lg p-3 md:p-4 border border-gray-100">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-4 w-4 md:h-5 md:w-5 text-pink-500 flex-shrink-0" />
                    <span className="text-xs md:text-sm font-medium whitespace-nowrap">Desarrolladora Apasionada</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Text Content - Ocupa 7 columnas en pantallas medianas y grandes */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="md:col-span-7"
            >
              <div className="space-y-4 text-gray-600 mb-8">
                <p className="text-base md:text-lg leading-relaxed">
                  Con solo 19 años, soy una ingeniera de software full-stack apasionada con un interés particular en la
                  inteligencia artificial y la creación de soluciones tecnológicas significativas.
                </p>
                <p className="text-base md:text-lg leading-relaxed">
                  A pesar de mi corta edad, ya he acumulado conocimientos técnicos significativos y experiencia práctica
                  a través de proyectos, hackathons e iniciativas colaborativas. Creo que la edad es solo un número
                  cuando se trata de innovación y resolución de problemas.
                </p>
                <p className="text-base md:text-lg leading-relaxed">
                  Mi trayectoria en tecnología está impulsada por la curiosidad y el deseo de generar un impacto
                  positivo. Constantemente estoy aprendiendo, experimentando con nuevas tecnologías y superando mis
                  límites.
                </p>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8">
                {[
                  { icon: <Code className="h-4 w-4 md:h-5 md:w-5 text-pink-500" />, text: "Programación" },
                  { icon: <Brain className="h-4 w-4 md:h-5 md:w-5 text-pink-500" />, text: "IA & ML" },
                  { icon: <Coffee className="h-4 w-4 md:h-5 md:w-5 text-pink-500" />, text: "Café" },
                  { icon: <Music className="h-4 w-4 md:h-5 md:w-5 text-pink-500" />, text: "Música" },
                  { icon: <Book className="h-4 w-4 md:h-5 md:w-5 text-pink-500" />, text: "Aprendizaje" },
                  { icon: <Heart className="h-4 w-4 md:h-5 md:w-5 text-pink-500" />, text: "Crear" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-2 bg-gray-50 hover:bg-pink-50 transition-colors p-3 rounded-lg"
                  >
                    {item.icon}
                    <span className="text-xs md:text-sm font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                onClick={handleKnowMeBetter}
                className="w-full md:w-auto bg-black hover:bg-gray-800 text-white px-6 md:px-8 py-2 md:py-2 rounded-full font-medium transition-all duration-300 flex items-center justify-center gap-2"
              >
                Conóceme Mejor
                <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  )
}
