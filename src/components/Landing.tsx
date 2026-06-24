import { motion } from 'framer-motion'

interface LandingProps {
  onBegin: () => void
}

const BG_ICONS = [
  { emoji: '💛', x: 8,  y: 6,  size: 2.2, dur: 4.1, delay: 0 },
  { emoji: '🌸', x: 88, y: 8,  size: 1.8, dur: 3.6, delay: 0.5 },
  { emoji: '💕', x: 15, y: 22, size: 1.5, dur: 5.0, delay: 1.0 },
  { emoji: '⭐', x: 80, y: 25, size: 1.6, dur: 4.4, delay: 0.3 },
  { emoji: '🌹', x: 5,  y: 50, size: 1.9, dur: 3.8, delay: 0.7 },
  { emoji: '💖', x: 90, y: 48, size: 1.7, dur: 4.8, delay: 0.2 },
  { emoji: '✨', x: 22, y: 72, size: 1.4, dur: 3.3, delay: 1.2 },
  { emoji: '🌺', x: 75, y: 70, size: 1.8, dur: 4.6, delay: 0.9 },
  { emoji: '💝', x: 45, y: 85, size: 1.6, dur: 5.2, delay: 0.4 },
  { emoji: '🌟', x: 60, y: 12, size: 1.5, dur: 3.9, delay: 1.5 },
  { emoji: '🥀', x: 35, y: 90, size: 1.4, dur: 4.2, delay: 0.6 },
  { emoji: '💞', x: 70, y: 88, size: 1.7, dur: 3.7, delay: 0.8 },
]

export default function Landing({ onBegin }: LandingProps) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: 'linear-gradient(160deg, #fff7d6 0%, #ffe8c2 40%, #ffd6e0 80%, #fff0f6 100%)' }}
    >
      {/* Pulsing background rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-sunflower/20 pointer-events-none"
          style={{ width: 220 + i * 120, height: 220 + i * 120 }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.1, 0.3] }}
          transition={{ duration: 3.5 + i * 0.8, repeat: Infinity, delay: i * 0.6 }}
        />
      ))}

      {/* Floating background icons */}
      {BG_ICONS.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute select-none pointer-events-none"
          style={{ left: `${icon.x}%`, top: `${icon.y}%`, fontSize: `${icon.size}rem` }}
          animate={{ y: [0, -18, 0], rotate: [0, 12, -12, 0], opacity: [0.55, 0.95, 0.55] }}
          transition={{ duration: icon.dur, repeat: Infinity, delay: icon.delay, ease: 'easeInOut' }}
        >
          {icon.emoji}
        </motion.div>
      ))}

      {/* Central sunflower — spinning with glow */}
      <motion.div
        className="relative mb-5 select-none"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 120, damping: 10, delay: 0.1 }}
      >
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(255,201,60,0.5) 0%, transparent 70%)' }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
        <motion.div
          className="text-8xl relative z-10"
          animate={{ rotate: 360 }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          🌻
        </motion.div>
      </motion.div>

      {/* Title */}
      <motion.h1
        className="font-display text-6xl md:text-7xl text-center mb-2"
        style={{ color: '#c97a00' }}
        initial={{ opacity: 0, y: 40, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.3, type: 'spring' }}
      >
        Ek Saal
      </motion.h1>

      {/* Names with heart between */}
      <motion.div
        className="flex items-center gap-3 mb-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <span className="font-body text-2xl font-bold text-warmOrange">Angel</span>
        <motion.span
          className="text-2xl"
          animate={{ scale: [1, 1.35, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          💛
        </motion.span>
        <span className="font-body text-2xl font-bold text-warmOrange">Motak</span>
      </motion.div>

      {/* Romantic subtitle */}
      <motion.p
        className="font-body text-sm text-coral/80 font-semibold tracking-widest uppercase mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        1 Year of Pure Love ✨
      </motion.p>

      {/* CTA Button with shimmer */}
      <motion.button
        onClick={onBegin}
        className="relative font-body font-bold text-lg px-12 py-4 rounded-full text-white shadow-xl select-none overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #FFC93C, #FF8C42, #FF6B6B)' }}
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 1.1, type: 'spring' }}
        whileHover={{ scale: 1.08, boxShadow: '0 20px 50px rgba(255,140,66,0.55)' }}
        whileTap={{ scale: 0.94 }}
      >
        {/* Shimmer overlay */}
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{ background: 'linear-gradient(90deg, transparent 0%, white 50%, transparent 100%)' }}
          animate={{ x: ['-100%', '200%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }}
        />
        <motion.span
          animate={{ opacity: [1, 0.8, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
          className="relative z-10"
        >
          Open Our Story 🌹
        </motion.span>
      </motion.button>

      {/* Bottom floating row */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 flex justify-center gap-4 text-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4 }}
      >
        {['🌻', '💕', '🌸', '💛', '🌹', '✨', '🌻'].map((e, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2 + i * 0.15, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' }}
          >
            {e}
          </motion.span>
        ))}
      </motion.div>
    </section>
  )
}
