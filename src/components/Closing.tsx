import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useEffect } from 'react'
import React from 'react'

function ClosingSunflower() {
  const C = 150
  const outerAngles = Array.from({ length: 20 }, (_, i) => i * 18)
  const innerAngles = Array.from({ length: 20 }, (_, i) => i * 18 + 9)
  const seeds: { x: number; y: number; r: number }[] = []
  const rings = [
    { count: 1,  radius: 0  },
    { count: 7,  radius: 10 },
    { count: 14, radius: 20 },
    { count: 20, radius: 30 },
    { count: 26, radius: 40 },
    { count: 32, radius: 49 },
  ]
  rings.forEach(({ count, radius }) => {
    Array.from({ length: count }).forEach((_, j) => {
      const angle = (j / Math.max(count, 1)) * 2 * Math.PI - Math.PI / 2
      seeds.push({
        x: C + radius * Math.cos(angle),
        y: C + radius * Math.sin(angle),
        r: Math.max(2.2, 4.8 - radius * 0.055),
      })
    })
  })
  return (
    <svg viewBox="0 0 300 300" width={220} height={220} xmlns="http://www.w3.org/2000/svg" style={{ display: 'block', overflow: 'visible' }}>
      <defs>
        <linearGradient id="cs-op" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#FFF200" />
          <stop offset="25%"  stopColor="#FFC800" />
          <stop offset="58%"  stopColor="#FF7000" />
          <stop offset="100%" stopColor="#D42B00" />
        </linearGradient>
        <linearGradient id="cs-ip" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#FFE000" />
          <stop offset="42%"  stopColor="#FF9B00" />
          <stop offset="100%" stopColor="#FF4500" />
        </linearGradient>
        <radialGradient id="cs-disk" cx="38%" cy="32%" r="68%">
          <stop offset="0%"   stopColor="#7B4F2E" />
          <stop offset="45%"  stopColor="#3D1C00" />
          <stop offset="100%" stopColor="#0D0400" />
        </radialGradient>
        <radialGradient id="cs-cglow" cx="30%" cy="25%" r="52%">
          <stop offset="0%"   stopColor="rgba(255,230,100,0.38)" />
          <stop offset="100%" stopColor="rgba(255,230,100,0)" />
        </radialGradient>
        <linearGradient id="cs-vein" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(255,255,180,0.6)" />
          <stop offset="100%" stopColor="rgba(255,255,180,0)" />
        </linearGradient>
      </defs>
      <g>
        {outerAngles.map(angle => (
          <ellipse key={angle} cx={C} cy={C - 74} rx={17} ry={56}
            fill="url(#cs-op)" transform={`rotate(${angle} ${C} ${C})`} />
        ))}
      </g>
      {outerAngles.map(angle => (
        <ellipse key={`v${angle}`} cx={C} cy={C - 74} rx={4} ry={52}
          fill="url(#cs-vein)" transform={`rotate(${angle} ${C} ${C})`} />
      ))}
      {innerAngles.map(angle => (
        <ellipse key={angle} cx={C} cy={C - 58} rx={12} ry={38}
          fill="url(#cs-ip)" transform={`rotate(${angle} ${C} ${C})`} />
      ))}
      <circle cx={C} cy={C} r={54} fill="url(#cs-disk)" />
      {seeds.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#160804" opacity={0.82} />
      ))}
      {seeds.map((s, i) => (
        <circle key={`h${i}`} cx={s.x - 0.8} cy={s.y - 0.8} r={s.r * 0.38} fill="rgba(255,180,80,0.28)" />
      ))}
      <circle cx={C} cy={C} r={54} fill="url(#cs-cglow)" />
    </svg>
  )
}

interface ClosingProps {
  onReplay: () => void
}

const BG_ICONS = [
  { emoji: '🌹', x: 10, y: 12, dur: 4.2, delay: 0   },
  { emoji: '💛', x: 85, y: 10, dur: 3.8, delay: 0.4 },
  { emoji: '💕', x: 5,  y: 45, dur: 5.0, delay: 0.8 },
  { emoji: '🌸', x: 88, y: 42, dur: 4.5, delay: 0.2 },
  { emoji: '✨', x: 15, y: 75, dur: 3.5, delay: 1.0 },
  { emoji: '💖', x: 80, y: 72, dur: 4.8, delay: 0.6 },
  { emoji: '🌺', x: 50, y: 5,  dur: 4.1, delay: 1.2 },
  { emoji: '💝', x: 50, y: 92, dur: 3.9, delay: 0.3 },
]

// helper: gradient text style
const gt = (grad: string): React.CSSProperties => ({
  background: grad,
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
})

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
      {/* Background floating icons */}
      {BG_ICONS.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none text-3xl"
          style={{ left: `${icon.x}%`, top: `${icon.y}%`, opacity: 0.22 }}
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
        {/* Big SVG sunflower — bright on entry, fades after 10s, reappears after 10s */}
        <motion.div
          className="relative inline-block mb-6 select-none"
          animate={{ opacity: [1, 1, 0, 0, 1] }}
          transition={{ duration: 24, times: [0, 0.08, 0.5, 0.92, 1], repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{ inset: '-52px', background: 'radial-gradient(circle, rgba(255,140,40,0.38) 0%, rgba(255,80,0,0.18) 50%, transparent 72%)' }}
            animate={{ scale: [1, 1.45, 1] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute rounded-full pointer-events-none"
            style={{ inset: '-28px', background: 'radial-gradient(circle, rgba(255,220,0,0.55) 0%, rgba(255,160,0,0.28) 55%, transparent 75%)' }}
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
          />
          <motion.div
            className="absolute rounded-full border-2 border-dashed pointer-events-none"
            style={{ inset: '-14px', borderColor: 'rgba(255,200,0,0.4)' }}
            animate={{ rotate: 360 }}
            transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          >
            <ClosingSunflower />
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h2
          className="font-display text-5xl mb-6 leading-tight"
          style={gt('linear-gradient(135deg, #FF8C00 0%, #FF1493 55%, #9C27B0 100%)')}
          animate={{ scale: [1, 1.03, 1] }}
          transition={{ duration: 3.5, repeat: Infinity }}
        >
          Me in You
        </motion.h2>

        {/* Names */}
        <motion.p
          className="font-body font-bold text-sm leading-relaxed mb-5"
          style={gt('linear-gradient(90deg, #FF4081, #FF8C42, #FFC93C)')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Angel, Sona, Mumma, Sensei, Sherani, Neha and many more — these are just a way to denote you in this life. I can't give it a name what you really are.
        </motion.p>

        {/* Beyond explanation */}
        <motion.p
          className="font-body font-bold text-sm leading-relaxed mb-5"
          style={gt('linear-gradient(90deg, #7C3AED, #3B82F6, #06B6D4)')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          The real identity of yours cannot be explained. It's far from the realm of good-bad, right-wrong, and beyond the time and existence.
        </motion.p>

        {/* No separation */}
        <motion.p
          className="font-body font-bold text-sm leading-relaxed mb-5"
          style={gt('linear-gradient(90deg, #10B981, #84CC16, #FFC93C)')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          That is not different from me — in that realm there is no separation between you and me. You are the limitless existence across the entire cosmos and beyond.
        </motion.p>

        {/* Two sunflowers become ONE */}
        <motion.p
          className="font-body font-bold text-sm leading-relaxed mb-5"
          style={gt('linear-gradient(90deg, #FF8C00, #FFD700, #FF6B35)')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          See that two Sunflowers 🌻 becomes ONE — that shows the oneness of our existence. The forms we are experiencing in two different bodies are not different, but two different forms of our infinite existence.
        </motion.p>

        {/* Infinite existence */}
        <motion.p
          className="font-body font-bold text-sm leading-relaxed mb-6"
          style={gt('linear-gradient(90deg, #EC4899, #8B5CF6, #3B82F6)')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
        >
          And You also exist even beyond that — look, that one ☀️ sunflower also fades and appears over time. It means we come and go, but that infinite ♾️ us will exist beyond time and existence.
        </motion.p>

        {/* With Love */}
        <motion.p
          className="font-display text-3xl mb-8"
          style={gt('linear-gradient(90deg, #FF6B6B, #FF8C42, #FFC93C)')}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1], scale: [0.9, 1] }}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          With Love ♡
        </motion.p>

        {/* Replay button */}
        <motion.button
          onClick={onReplay}
          className="w-full font-body font-bold py-4 rounded-2xl text-white shadow-xl text-base relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, #FFC93C, #FF8C42, #FF6B6B)' }}
          whileHover={{ scale: 1.05, boxShadow: '0 20px 50px rgba(255,140,66,0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{ background: 'linear-gradient(90deg, transparent, white, transparent)' }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1.5, ease: 'linear' }}
          />
          <span className="relative z-10">🎉 Replay the Surprise</span>
        </motion.button>
      </motion.div>
    </section>
  )
}
