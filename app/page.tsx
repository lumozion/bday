"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Gift, Heart, Music, MicOffIcon as MusicOff, Camera } from "lucide-react"
import Image from "next/image"
import Confetti from "@/components/confetti"
import BirthdayMessage from "@/components/birthday-message"
import FloatingHearts from "@/components/floating-hearts"
import BackgroundEffects from "@/components/background-effects"

export default function BirthdayPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showPhoto, setShowPhoto] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 8000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <audio
        ref={audioRef}
        src="/birthday-music.mp3"
        loop
        className="hidden"
        onCanPlay={() => console.log("Audio ready")}
        onError={(e) => console.log("Audio error", e)}
      />

      <BackgroundEffects />
      {showConfetti && <Confetti />}
      <FloatingHearts />

      <div className="fixed top-4 right-4 z-50">
        <motion.button
          onClick={toggleMusic}
          className="bg-white/30 backdrop-blur-md p-3 rounded-full text-pink-600 hover:bg-white/50 transition-all duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? <MusicOff size={20} /> : <Music size={20} />}
        </motion.button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 relative z-10"
      >
        <motion.div
          className="absolute -z-10 inset-0 rounded-full opacity-70 blur-2xl"
          animate={{
            background: [
              "radial-gradient(circle at 50% 50%, #f472b6 0%, transparent 70%)",
              "radial-gradient(circle at 50% 50%, #c084fc 0%, transparent 70%)",
              "radial-gradient(circle at 50% 50%, #f472b6 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
        />
        <h1 className="text-4xl md:text-6xl font-bold text-pink-600 mb-2 drop-shadow-lg">Happy Birthday!</h1>
        <p className="text-xl md:text-2xl text-purple-700 drop-shadow">To my special someone ❤️</p>
      </motion.div>

      <AnimatePresence>
        {showPhoto && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
            onClick={() => setShowPhoto(false)}
          >
            <motion.div
              className="relative max-w-md w-full bg-white rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <div className="aspect-[3/4] relative">
                <Image src="/placeholder.svg?height=600&width=450" alt="Our photo" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-4">
                  <p className="text-white text-lg font-medium">Our special moments ❤️</p>
                </div>
              </div>
              <div className="p-4 text-center">
                <p className="text-gray-700">Add your favorite photo here</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen ? (
          <div className="flex flex-col items-center gap-8 md:gap-12 md:flex-row max-w-4xl mx-auto">
            <motion.div
              className="relative z-10"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0, rotate: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.button
                onClick={() => setIsOpen(true)}
                className="w-64 h-64 md:w-72 md:h-72 bg-gradient-to-br from-pink-500 to-purple-600 rounded-2xl shadow-[0_0_30px_rgba(219,39,119,0.5)] flex flex-col items-center justify-center cursor-pointer relative overflow-hidden"
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(219,39,119,0.7)" }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute top-0 left-0 right-0 h-16 bg-pink-300/50 backdrop-blur-sm rounded-t-2xl"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                />

                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-2xl z-[-1] opacity-75 blur-xl"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                    scale: [0.95, 1.05, 0.95],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                />

                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  className="absolute inset-0 rounded-2xl overflow-hidden opacity-20"
                >
                  <div className="absolute top-0 left-0 w-full h-full bg-[conic-gradient(from_0deg,#f472b6,#c084fc,#f472b6)]" />
                </motion.div>

                <motion.div
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Gift size={80} className="text-white drop-shadow-lg mb-4" />
                </motion.div>

                <p className="text-white text-xl font-medium drop-shadow-md">Click to open</p>

                <motion.div
                  className="absolute w-full h-full"
                  animate={{
                    background: [
                      "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)",
                      "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)",
                      "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                />

                <motion.div
                  className="absolute bottom-2 right-2"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Heart size={24} className="text-pink-300 fill-pink-300" />
                </motion.div>
              </motion.button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              <motion.button
                onClick={() => setShowPhoto(true)}
                className="w-48 h-48 md:w-56 md:h-56 bg-white/30 backdrop-blur-md rounded-2xl shadow-lg flex flex-col items-center justify-center cursor-pointer relative overflow-hidden border-2 border-white/50"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255,255,255,0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-pink-200 to-purple-200 rounded-2xl z-[-1] opacity-50 blur-xl"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.95, 1.05, 0.95],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                />

                <Camera size={60} className="text-pink-600 mb-4" />
                <p className="text-pink-700 text-lg font-medium">Our Photos</p>

                <motion.div
                  className="absolute top-2 left-2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Heart size={16} className="text-pink-400 fill-pink-400" />
                </motion.div>

                <motion.div
                  className="absolute bottom-2 right-2"
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
                >
                  <Heart size={16} className="text-pink-400 fill-pink-400" />
                </motion.div>
              </motion.button>
            </motion.div>
          </div>
        ) : (
          <BirthdayMessage onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </main>
  )
}

