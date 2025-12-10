"use client"

import { Button } from "@/components/ui/button"
import { Download, ArrowRight } from "lucide-react"
import { useEffect, useRef } from "react"

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    // Configuración de la red neuronal
    const nodes: Node[] = []
    const connections: Connection[] = []
    const nodeCount = 15
    const connectionRadius = 150

    class Node {
      x: number
      y: number
      radius: number
      speedX: number
      speedY: number
      color: string

      constructor(canvas: HTMLCanvasElement) {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.radius = Math.random() * 2 + 2
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.color = "rgba(255, 105, 180, 0.8)"
      }

      update(canvas: HTMLCanvasElement) {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    class Connection {
      nodeA: Node
      nodeB: Node
      distance: number
      maxDistance: number

      constructor(nodeA: Node, nodeB: Node, maxDistance: number) {
        this.nodeA = nodeA
        this.nodeB = nodeB
        this.distance = Math.hypot(nodeA.x - nodeB.x, nodeA.y - nodeB.y)
        this.maxDistance = maxDistance
      }

      update() {
        this.distance = Math.hypot(this.nodeA.x - this.nodeB.x, this.nodeA.y - this.nodeB.y)
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.distance < this.maxDistance) {
          const opacity = 1 - this.distance / this.maxDistance
          ctx.strokeStyle = `rgba(255, 105, 180, ${opacity * 0.5})`
          ctx.lineWidth = opacity * 1.5
          ctx.beginPath()
          ctx.moveTo(this.nodeA.x, this.nodeA.y)
          ctx.lineTo(this.nodeB.x, this.nodeB.y)
          ctx.stroke()
        }
      }
    }

    const init = () => {
      for (let i = 0; i < nodeCount; i++) {
        nodes.push(new Node(canvas))
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          connections.push(new Connection(nodes[i], nodes[j], connectionRadius))
        }
      }
    }

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const connection of connections) {
        connection.update()
        connection.draw(ctx)
      }

      for (const node of nodes) {
        node.update(canvas)
        node.draw(ctx)
      }

      requestAnimationFrame(animate)
    }

    init()
    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-20">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="container relative z-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center md:ml-10">
          <div className="order-2 md:order-1">
            <div className="mb-6 inline-block">
              <span className="relative inline-block px-3 py-1 text-sm font-medium text-white bg-pink-500 rounded-full">
                Ingeniera de Software Full Stack
              </span>
            </div>
            <h1 className="text-4xl md:text-[3.2rem] lg:text-[3.8rem] font-bold mb-6 leading-[1.1] bg-clip-text text-transparent bg-gradient-to-r from-black to-pink-500">
              <span className="block">Convirtiendo Ideas</span>
              <span className="block mb-7 p-2">en Realidad Digital</span>
            </h1>
            <p className="text-base md:text-xl text-gray-700 mb-8 leading-relaxed">
              Joven desarrolladora apasionada con experiencia en IA, desarrollo web y hambre de innovación.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-black hover:bg-gray-800 text-white px-6 py-2 rounded-full font-medium">
                Ver Mis Proyectos <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                className="border-pink-500 text-pink-500 hover:bg-pink-50 px-6 py-2 rounded-full font-medium bg-transparent"
              >
                Descargar CV <Download className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center mt-6 md:mt-10">
            <div className="relative">
              {/* Círculo rosa en la esquina superior izquierda */}
              <div className="absolute -top-6 -left-6 w-96 h-96 bg-pink-500 rounded-full  z-0"></div>
              
              {/* Efecto de resplandor */}
              <div className="absolute inset-0  from-pink-500/20 via-pink-400/10 to-pink-500/20 blur-[96px] animate-pulse" style={{
                WebkitMaskImage: 'url(/perfil.png)',
                WebkitMaskSize: '100%',
                WebkitMaskRepeat: 'no-repeat',
                WebkitMaskPosition: 'center',
                maskImage: 'url(/perfil.png)',
                maskSize: '100%',
                maskRepeat: 'no-repeat',
                maskPosition: 'center',
                transform: 'scale(1.05)'
              }}></div>

              {/* Contenedor de la imagen más grande */}
              <div className="relative z-10 w-80 h-80 md:w-[32rem] md:h-[32rem] overflow-hidden" style={{
                filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.4))'
              }}>
                <img 
                  src="/perfil.png" 
                  alt="Perfil" 
                  className="w-full h-full object-contain transform transition-transform duration-300 hover:scale-105"
                  loading="eager"
                  style={{
                    maxWidth: '100%',
                    height: 'auto',
                    display: 'block'
                  }}
                />
              </div>

              {/* Ícono en la esquina inferior derecha */}
              <div className="absolute -bottom-2 -right-2 bg-white shadow-lg rounded-full p-2 md:p-3 z-20">
                <div className="bg-pink-500 text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center">
                  <code className="text-xs font-bold">{"</ >"}</code>
                </div>
              </div>

              <div className="absolute -top-6 -left-6 bg-white shadow-md rounded-full p-2 z-20 animate-float">
                <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-xs font-bold">IA</span>
                </div>
              </div>

              <div
                className="absolute top-1/2 -right-8 bg-white shadow-md rounded-full p-2 z-20 animate-float"
                style={{ animationDelay: "1s" }}
              >
                <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-xs font-bold">JS</span>
                </div>
              </div>

              <div
                className="absolute -bottom-8 left-1/4 bg-white shadow-md rounded-full p-2 z-20 animate-float"
                style={{ animationDelay: "2s" }}
              >
                <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-xs font-bold">PY</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
