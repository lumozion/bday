"use client"

import { useEffect, useRef } from "react"

export default function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const confettiColors = [
      "#f472b6", // pink-400
      "#db2777", // pink-600
      "#a855f7", // purple-500
      "#7e22ce", // purple-700
      "#fcd34d", // yellow-300
      "#60a5fa", // blue-400
      "#ffffff", // white
      "#f9a8d4", // pink-300
    ]

    const confettiCount = 300
    const gravity = 0.5
    const terminalVelocity = 5
    const drag = 0.075

    const particles: {
      color: string
      dimensions: { x: number; y: number }
      position: { x: number; y: number }
      rotation: number
      scale: { x: number; y: number }
      velocity: { x: number; y: number }
      shape: "rect" | "heart"
    }[] = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const randomRange = (min: number, max: number) => Math.random() * (max - min) + min

    const drawHeart = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => {
      ctx.beginPath()
      const topCurveHeight = height * 0.3
      ctx.moveTo(x, y + topCurveHeight)
      // Left curve
      ctx.bezierCurveTo(x, y, x - width / 2, y, x - width / 2, y + topCurveHeight)
      // Bottom left curve
      ctx.bezierCurveTo(x - width / 2, y + (height + topCurveHeight) / 2, x, y + height, x, y + height)
      // Bottom right curve
      ctx.bezierCurveTo(
        x,
        y + height,
        x + width / 2,
        y + (height + topCurveHeight) / 2,
        x + width / 2,
        y + topCurveHeight,
      )
      // Right curve
      ctx.bezierCurveTo(x + width / 2, y, x, y, x, y + topCurveHeight)
      ctx.closePath()
      ctx.fill()
    }

    const initConfetti = () => {
      for (let i = 0; i < confettiCount; i++) {
        particles.push({
          color: confettiColors[Math.floor(randomRange(0, confettiColors.length))],
          dimensions: {
            x: randomRange(5, 15),
            y: randomRange(5, 15),
          },
          position: {
            x: randomRange(0, canvas.width),
            y: randomRange(-canvas.height, 0),
          },
          rotation: randomRange(0, 2 * Math.PI),
          scale: {
            x: 1,
            y: 1,
          },
          velocity: {
            x: randomRange(-3, 3),
            y: randomRange(0, 2),
          },
          shape: Math.random() > 0.7 ? "heart" : "rect",
        })
      }
    }

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle, index) => {
        // Update
        particle.velocity.x -= particle.velocity.x * drag
        particle.velocity.y = Math.min(particle.velocity.y + gravity, terminalVelocity)
        particle.velocity.y -= particle.velocity.y * drag

        particle.position.x += particle.velocity.x
        particle.position.y += particle.velocity.y

        particle.rotation += 0.01

        // Offscreen check
        if (
          particle.position.y > canvas.height ||
          particle.position.x < -100 ||
          particle.position.x > canvas.width + 100
        ) {
          // Reset particle
          if (index % 5 > 0) {
            // 80% of particles will reset
            particles[index] = {
              ...particle,
              position: {
                x: randomRange(0, canvas.width),
                y: randomRange(-100, 0),
              },
              velocity: {
                x: randomRange(-3, 3),
                y: randomRange(0, 2),
              },
            }
          }
        }

        // Draw
        ctx.save()
        ctx.translate(particle.position.x, particle.position.y)
        ctx.rotate(particle.rotation)
        ctx.scale(particle.scale.x, particle.scale.y)

        ctx.fillStyle = particle.color

        if (particle.shape === "heart") {
          drawHeart(ctx, 0, 0, particle.dimensions.x, particle.dimensions.y)
        } else {
          ctx.fillRect(
            -particle.dimensions.x / 2,
            -particle.dimensions.y / 2,
            particle.dimensions.x,
            particle.dimensions.y,
          )
        }

        ctx.restore()
      })

      requestAnimationFrame(render)
    }

    initConfetti()
    render()

    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-50" />
}

