"use client"

import { motion } from "framer-motion"

export default function BackgroundEffects() {
  return (
    <>
      {/* Gradient orbs with blur */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-pink-400/20 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-purple-400/20 blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.div
          className="absolute -bottom-40 left-1/3 w-[30rem] h-[30rem] rounded-full bg-pink-300/20 blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* Subtle sparkles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => {
          const size = Math.random() * 3 + 1
          const delay = Math.random() * 5
          const duration = Math.random() * 2 + 1
          const x = Math.random() * 100
          const y = Math.random() * 100

          return (
            <motion.div
              key={i}
              className="absolute bg-white rounded-full"
              style={{
                width: size,
                height: size,
                left: `${x}%`,
                top: `${y}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration,
                repeat: Number.POSITIVE_INFINITY,
                delay,
                repeatDelay: Math.random() * 7 + 3,
              }}
            />
          )
        })}
      </div>

      {/* Subtle animated gradient background */}
      <motion.div
        className="fixed inset-0 opacity-30 pointer-events-none z-[-1]"
        animate={{
          background: [
            "linear-gradient(45deg, rgba(244,114,182,0.1) 0%, rgba(192,132,252,0.1) 100%)",
            "linear-gradient(45deg, rgba(192,132,252,0.1) 0%, rgba(244,114,182,0.1) 100%)",
            "linear-gradient(45deg, rgba(244,114,182,0.1) 0%, rgba(192,132,252,0.1) 100%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </>
  )
}

