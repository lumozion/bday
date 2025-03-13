"use client"

import { motion } from "framer-motion"
import { Heart } from "lucide-react"

export default function FloatingHearts() {
  // Create an array of 15 hearts with different properties
  const hearts = Array.from({ length: 15 }).map((_, i) => {
    const size = Math.floor(Math.random() * 20) + 10
    const duration = Math.floor(Math.random() * 20) + 15
    const initialX = Math.random() * 100
    const initialDelay = Math.random() * 10

    return { size, duration, initialX, initialDelay, id: i }
  })

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-0 text-pink-400"
          initial={{
            x: `${heart.initialX}vw`,
            y: "100vh",
            opacity: 0,
            filter: "blur(0px)",
            scale: 0,
          }}
          animate={{
            y: "-20vh",
            opacity: [0, 0.5, 0],
            filter: ["blur(0px)", "blur(1px)", "blur(0px)"],
            scale: [0, 1, 0.5],
          }}
          transition={{
            duration: heart.duration,
            repeat: Number.POSITIVE_INFINITY,
            delay: heart.initialDelay,
            ease: "easeInOut",
          }}
          style={{
            x: `${heart.initialX}vw`,
          }}
        >
          <Heart size={heart.size} className="fill-pink-400/40" />
        </motion.div>
      ))}
    </div>
  )
}

