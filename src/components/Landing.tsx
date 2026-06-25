import { motion } from 'framer-motion'

interface LandingProps {
  onBegin: () => void
}

const BG_ICONS = [
  { emoji: '💛', x: 8,  y: 6,  size: 2.2, dur: 4.1, delay: 0.0, dx:  0,   dy: -18 },
  { emoji: '🌸', x: 88, y: 8,  size: 1.8, dur: 3.6, delay: 0.5, dx:  0,   dy: -14 },
  { emoji: '💕', x: 15, y: 22, size: 1.5, dur: 5.0, delay: 1.0, dx:  8,   dy: -20 },
  { emoji: '⭐', x: 80, y: 25, size: 1.6, dur: 4.4, delay: 0.3, dx: -6,   dy: -16 },
  { emoji: '🌹', x: 5,  y: 50, size: 1.9, dur: 3.8, delay: 0.7, dx:  10,  dy: -15 },
  { emoji: '💖', x: 90, y: 48, size: 1.7, dur: 4.8, delay: 0.2, dx: -10,  dy: -18 },
  { emoji: '✨', x: 22, y: 72, size: 1.4, dur: 3.3, delay: 1.2, dx:  6,   dy: -12 },
  { emoji: '🌺', x: 75, y: 70, size: 1.8, dur: 4.6, delay: 0.9, dx: -8,   dy: -16 },
  { emoji: '💝', x: 45, y: 85, size: 1.6, dur: 5.2, delay: 0.4, dx:  4,   dy: -14 },
  { emoji: '🌟', x: 60, y: 12, size: 1.5, dur: 3.9, delay: 1.5, dx: -4,   dy: -18 },
  { emoji: '🥀', x: 35, y: 90, size: 1.4, dur: 4.2, delay: 0.6, dx:  8,   dy: -10 },
  { emoji: '💞', x: 70, y: 88, size: 1.7, dur: 3.7, delay: 0.8, dx: -6,   dy: -15 },
  { emoji: '🦋', x: 30, y: 14, size: 1.7, dur: 4.5, delay: 0.3, dx:  12,  dy: -22 },
  { emoji: '🌈', x: 50, y: 4,  size: 1.5, dur: 5.5, delay: 1.1, dx:  0,   dy: -10 },
  { emoji: '🎀', x: 93, y: 65, size: 1.5, dur: 3.5, delay: 0.5, dx: -12,  dy: -16 },
  { emoji: '🌷', x: 3,  y: 75, size: 1.8, dur: 4.3, delay: 1.3, dx:  10,  dy: -14 },
  { emoji: '💫', x: 55, y: 78, size: 1.6, dur: 3.8, delay: 0.7, dx:  6,   dy: -20 },
  { emoji: '🎊', x: 18, y: 40, size: 1.4, dur: 4.7, delay: 0.9, dx:  8,   dy: -15 },
  { emoji: '🌼', x: 83, y: 38, size: 1.7, dur: 5.1, delay: 0.4, dx: -10,  dy: -12 },
  { emoji: '🍃', x: 65, y: 55, size: 1.3, dur: 3.4, delay: 0.2, dx: -14,  dy: -18 },
  { emoji: '🎉', x: 25, y: 55, size: 1.5, dur: 4.9, delay: 1.0, dx:  10,  dy: -16 },
  { emoji: '🌙', x: 48, y: 93, size: 1.4, dur: 4.0, delay: 1.6, dx:  0,   dy: -8  },
  { emoji: '🏵️', x: 10, y: 88, size: 1.5, dur: 5.3, delay: 0.8, dx:  8,   dy: -12 },
  { emoji: '💐', x: 78, y: 92, size: 1.6, dur: 4.6, delay: 1.2, dx: -8,   dy: -10 },
]

export default function Landing({ onBegin }: LandingProps) {
  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6"
      style={{ background: 'linear-gradient(160deg, #fff7d6 0%, #ffe8c2 40%, #ffd6e0 80%, #fff0f6 100%)' }}
    >
      {/* Pulsing background rings */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-sunflower/20 pointer-events-none"
          style={{ width: 180 + i * 130, height: 180 + i * 130 }}
          animate={{ scale: [1, 1.14, 1], opacity: [0.35, 0.08, 0.35] }}
          transition={{ duration: 3.5 + i * 0.8, repeat: Infinity, delay: i * 0.7 }}
        />
      ))}

      {/* Flying background icons */}
      {BG_ICONS.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute select-none pointer-events-none"
          style={{ left: `${icon.x}%`, top: `${icon.y}%`, fontSize: `${icon.size}rem` }}
          animate={{
            x: [0, icon.dx, 0],
            y: [0, icon.dy, 0],
            rotate: [0, 15, -15, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{ duration: icon.dur, repeat: Infinity, delay: icon.delay, ease: 'easeInOut' }}
        >
          {icon.emoji}
        </motion.div>
      ))}

      {/* Twin sunflowers */}
      <motion.div
        className="relative flex items-end gap-3 mb-6 select-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        {/* Left sunflower */}
        <motion.div
          className="relative"
          initial={{ scale: 0, x: -80, rotate: -180 }}
          animate={{ scale: 1, x: 0, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 12, delay: 0.15 }}
        >
          {/* Glow — golden */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: '-18px',
              background: 'radial-gradient(circle, rgba(255,201,60,0.55) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.2, 0.8] }}
            transition={{ duration: 2.4, repeat: Infinity }}
          />
          {/* Outer spin ring */}
          <motion.div
            className="absolute rounded-full border-2 border-dashed border-sunflower/30 pointer-events-none"
            style={{ inset: '-10px' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
          />
          {/* Bounce wrapper */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Rotating sunflower */}
            <motion.span
              className="text-7xl block"
              animate={{ rotate: 360 }}
              transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
            >
              🌻
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Centre sparkle */}
        <motion.div
          className="text-2xl mb-2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.8, 1, 0.8], rotate: [0, 20, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
        >
          💕
        </motion.div>

        {/* Right sunflower */}
        <motion.div
          className="relative"
          initial={{ scale: 0, x: 80, rotate: 180 }}
          animate={{ scale: 1, x: 0, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 90, damping: 12, delay: 0.25 }}
        >
          {/* Glow — warm orange */}
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{
              inset: '-18px',
              background: 'radial-gradient(circle, rgba(255,140,66,0.5) 0%, transparent 70%)',
            }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.2, 0.8] }}
            transition={{ duration: 3.0, repeat: Infinity, delay: 0.9 }}
          />
          {/* Outer spin ring — counter */}
          <motion.div
            className="absolute rounded-full border-2 border-dashed border-warmOrange/30 pointer-events-none"
            style={{ inset: '-10px' }}
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
          />
          {/* Bounce wrapper — offset phase */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          >
            {/* Counter-rotating sunflower */}
            <motion.span
              className="text-7xl block"
              animate={{ rotate: -360 }}
              transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
            >
              🌻
            </motion.span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Title */}
      <motion.h1
        className="font-display text-6xl md:text-7xl text-center mb-2"
        style={{ color: '#c97a00' }}
        initial={{ opacity: 0, y: 40, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.9, delay: 0.4, type: 'spring' }}
      >
        Ek Saal
      </motion.h1>

      {/* Names with heart */}
      <motion.div
        className="flex items-center gap-3 mb-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.65 }}
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

      {/* Subtitle */}
      <motion.p
        className="font-body text-sm text-coral/80 font-semibold tracking-widest uppercase mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        1 Year of Pure Love ✨
      </motion.p>

      {/* CTA Button */}
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
        {['🌻', '💕', '🌸', '💛', '🌹', '✨', '🌼', '💫', '🌻'].map((e, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -10, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 2 + i * 0.15, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
          >
            {e}
          </motion.span>
        ))}
      </motion.div>
    </section>
  )
}
