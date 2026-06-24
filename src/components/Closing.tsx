import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useEffect } from 'react'

interface ClosingProps {
  onReplay: () => void
}

const LOVE_ICONS = [
  { emoji: '🌹', x: 10, y: 12, dur: 4.2, delay: 0 },
  { emoji: '💛', x: 85, y: 10, dur: 3.8, delay: 0.4 },
  { emoji: '💕', x: 5,  y: 45, dur: 5.0, delay: 0.8 },
  { emoji: '🌸', x: 88, y: 42, dur: 4.5, delay: 0.2 },
  { emoji: '✨', x: 15, y: 75, dur: 3.5, delay: 1.0 },
  { emoji: '💖', x: 80, y: 72, dur: 4.8, delay: 0.6 },
  { emoji: '🌺', x: 50, y: 5,  dur: 4.1, delay: 1.2 },
  { emoji: '💝', x: 50, y: 92, dur: 3.9, delay: 0.3 },
]

export default function Closing({ onReplay }: ClosingProps) {
  useEffect(() => {
    const t = setTimeout(() => {
      confetti({ particleCount: 80, spread: 90, origin: { y: 0.4 }, colors: ['#FFC93C', '#FF8C42', '#FF6B6B', '#74C0FC'] })
    }, 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center py-16 px-6 text-center relative overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #fff7d6 0%, #ffeef5 50%, #fff3e0 100%)' }}
    >
      {/* Background love icons */}
      {LOVE_ICONS.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none text-3xl"
          style={{ left: `${icon.x}%`, top: `${icon.y}%`, opacity: 0.25 }}
          animate={{ y: [0, -22, 0], rotate: [0, 18, -18, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: icon.dur, repeat: Infinity, delay: icon.delay, ease: 'easeInOut' }}
        >
          {icon.emoji}
        </motion.div>
      ))}

      <motion.div
        className="max-w-sm w-full relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: 'spring' }}
      >
        {/* Big animated sunflower with glow */}
        <div className="relative inline-block mb-6">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(255,201,60,0.4) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          />
          <motion.div
            className="text-8xl relative z-10 select-none"
            animate={{ rotate: [0, 12, -12, 0], scale: [1, 1.08, 1] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🌻
          </motion.div>
        </div>

        <motion.h2
          className="font-display text-4xl mb-4"
          style={{ color: '#c97a00' }}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Here's to Many More
        </motion.h2>

        <motion.p
          className="font-body text-gray-600 text-base leading-relaxed mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Ek saal ho gaya, meri Angel.
          <br />
          And every single day was worth it.
        </motion.p>

        <motion.p
          className="font-body font-bold text-sm mb-10"
          style={{ color: '#FF8C42' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Love you. Always. Forever. 💛
        </motion.p>

        {/* Floating love icons row */}
        <div className="flex justify-center gap-3 text-2xl mb-10">
          {['🌻', '💕', '🌹', '💖', '🌸', '💛', '🌻'].map((e, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2 + i * 0.2, repeat: Infinity, delay: i * 0.18 }}
            >
              {e}
            </motion.span>
          ))}
        </div>

        {/* Replay button */}
        <motion.button
          onClick={onReplay}
          className="w-full font-body font-bold py-4 rounded-2xl text-white shadow-xl text-base relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #FFC93C, #FF8C42, #FF6B6B)' }}
          whileHover={{ scale: 1.05, boxShadow: '0 20px 50px rgba(255,140,66,0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          {/* shimmer */}
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{ background: 'linear-gradient(90deg, transparent, white, transparent)' }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5, ease: 'linear' }}
          />
          <span className="relative z-10">🎉 Replay the Surprise</span>
        </motion.button>

        {/* Love quote */}
        <motion.p
          className="font-body text-xs text-gray-400 italic mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          "In all the world, there is no heart for me like yours." 🌹
        </motion.p>
      </motion.div>
    </section>
  )
}
