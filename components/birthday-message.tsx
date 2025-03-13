"use client"

import { motion } from "framer-motion"
import { X, Heart } from "lucide-react"
import { useState } from "react"

interface BirthdayMessageProps {
  onClose: () => void
}

export default function BirthdayMessage({ onClose }: BirthdayMessageProps) {
  const [isRevealed, setIsRevealed] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-6 md:p-8 max-w-2xl mx-auto relative z-10 border border-pink-200"
      onAnimationComplete={() => {
        setTimeout(() => setIsRevealed(true), 500)
      }}
    >
      <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
        <X size={24} />
      </button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
        <motion.div
          className="absolute -inset-4 -z-10 rounded-xl opacity-30 blur-2xl"
          animate={{
            background: [
              "radial-gradient(circle at 20% 20%, #f472b6 0%, transparent 70%)",
              "radial-gradient(circle at 80% 80%, #f472b6 0%, transparent 70%)",
              "radial-gradient(circle at 20% 80%, #f472b6 0%, transparent 70%)",
              "radial-gradient(circle at 80% 20%, #f472b6 0%, transparent 70%)",
              "radial-gradient(circle at 20% 20%, #f472b6 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        />

        <h2 className="text-2xl md:text-3xl font-bold text-pink-600 mb-6 text-center drop-shadow-sm">
          Mera Baccha, Happy Birthday, my love!
        </h2>

        <div className="space-y-4 text-gray-700 leading-relaxed relative">
          {isRevealed && (
            <>
              <HeartParticle position="top-0 left-10" delay={0} />
              <HeartParticle position="top-20 right-5" delay={1.5} />
              <HeartParticle position="bottom-10 left-5" delay={3} />
              <HeartParticle position="bottom-40 right-10" delay={4.5} />
            </>
          )}

          <p className="relative">
            On this special day, I just want to remind you how deeply I love you. You are the most beautiful part of my
            life, and every moment with you feels like a dream I never want to wake up from.
          </p>

          <p>
            Your smile melts my heart, your voice soothes my soul, and your love completes me in ways I never imagined.
            I cherish you more than words can express, and I promise to love you endlessly, hold you close, and make you
            feel special every single day.
          </p>

          <p>
            Baccha, you are my heart, my happiness, my everything. I can't wait to celebrate this day with you and
            create more beautiful memories together.
          </p>

          <p>
            Once again Happy Birthday, my love! May this year bring you all the happiness you bring into my life. Enjoy
            your day, mera Baccha! I'll always be here, loving you endlessly.
          </p>

          <motion.div
            className="text-right font-medium text-pink-600 mt-6 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="absolute -right-8 -top-6"
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: [0, 1.2, 1], rotate: [0, 20, 0] }}
              transition={{ delay: 1.5, duration: 0.8 }}
            >
              <Heart size={28} className="text-pink-500 fill-pink-500" />
            </motion.div>
            Forever yours,
            <br />
            PRINCE
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

function HeartParticle({ position, delay }: { position: string; delay: number }) {
  return (
    <motion.div
      className={`absolute ${position} z-10 pointer-events-none`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
        y: [0, -40],
      }}
      transition={{
        delay,
        duration: 3,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 5,
      }}
    >
      <Heart size={16} className="text-pink-400 fill-pink-400" />
    </motion.div>
  )
}

