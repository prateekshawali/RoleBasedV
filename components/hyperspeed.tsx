"use client"

import type React from "react"
import { useEffect, useRef } from "react"

interface HyperspeedProps {
  preset?: string | object
  speed?: number
  density?: number
  color?: string
  className?: string
}

const Hyperspeed: React.FC<HyperspeedProps> = ({
  preset = "default",
  speed = 1,
  density = 100,
  color = "#ffffff",
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<any[]>([])

  // Preset configurations
  const presets = {
    default: { speed: 1, density: 100, color: "#ffffff", particleSize: 2, trailLength: 0.6 },
    warp: { speed: 3, density: 150, color: "#00ffff", particleSize: 3, trailLength: 0.9 },
    lightspeed: { speed: 5, density: 200, color: "#ffffff", particleSize: 1, trailLength: 0.95 },
    matrix: { speed: 2, density: 120, color: "#00ff00", particleSize: 2, trailLength: 0.7 },
    neon: { speed: 2.5, density: 130, color: "#ff0080", particleSize: 2.5, trailLength: 0.8 },
  }

  const config = typeof preset === "string" ? presets[preset as keyof typeof presets] || presets.default : preset
  const finalConfig = {
    speed: speed * config.speed,
    density: density,
    color: color !== "#ffffff" ? color : config.color,
    particleSize: config.particleSize,
    trailLength: config.trailLength,
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    class Particle {
      x: number
      y: number
      z: number
      prevX: number
      prevY: number

      constructor() {
        this.x = 0
        this.y = 0
        this.z = 0
        this.prevX = 0
        this.prevY = 0
        this.reset()
      }

      reset() {
        this.x = Math.random() * width
        this.y = Math.random() * height
        this.z = Math.random() * 1000
        this.prevX = this.x
        this.prevY = this.y
      }

      update() {
        this.prevX = this.x
        this.prevY = this.y
        this.z -= finalConfig.speed * 10

        if (this.z <= 0) {
          this.reset()
          this.z = 1000
        }

        this.x = (this.prevX - width / 2) * (200 / this.z) + width / 2
        this.y = (this.prevY - height / 2) * (200 / this.z) + height / 2
      }

      draw() {
        const opacity = (1000 - this.z) / 1000
        const size = finalConfig.particleSize * opacity

        ctx.strokeStyle =
          finalConfig.color +
          Math.floor(opacity * 255)
            .toString(16)
            .padStart(2, "0")
        ctx.lineWidth = size
        ctx.beginPath()
        ctx.moveTo(this.prevX, this.prevY)
        ctx.lineTo(this.x, this.y)
        ctx.stroke()

        ctx.fillStyle = finalConfig.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, size / 2, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const initParticles = () => {
      particlesRef.current = []
      for (let i = 0; i < finalConfig.density; i++) {
        particlesRef.current.push(new Particle())
      }
    }

    const animate = () => {
      ctx.fillStyle = `rgba(0, 0, 0, ${1 - finalConfig.trailLength})`
      ctx.fillRect(0, 0, width, height)

      particlesRef.current.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      initParticles()
    }

    window.addEventListener("resize", handleResize)
    initParticles()
    animate()

    return () => {
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [preset, speed, density, color])

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "black",
        zIndex: -1,
      }}
    />
  )
}

export default Hyperspeed
