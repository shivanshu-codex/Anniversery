import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { CONTENT } from '../content'
import { Sunflower } from './Sunflower'

interface RevealProps {
  audioSrc?: string
  onReplay: () => void
}

const PETAL_EMOJIS  = ['🌸', '💛', '✨', '🌼', '💕', '🌺', '💫', '🌷']
const BALLOON_EMOJIS = ['🎈', '🎊', '🎉', '💛', '🌟', '🎀', '🎈', '🎊']

const BG_ICONS = [
  { emoji: '💛', x: 6,  y: 8,  size: 2.0, dur: 4.2, delay: 0.0, dx:  8,  dy: -16 },
  { emoji: '🌸', x: 87, y: 6,  size: 1.8, dur: 3.7, delay: 0.4, dx: -8,  dy: -14 },
  { emoji: '💕', x: 12, y: 25, size: 1.5, dur: 5.1, delay: 0.9, dx:  10, dy: -20 },
  { emoji: '⭐', x: 82, y: 22, size: 1.6, dur: 4.5, delay: 0.2, dx: -10, dy: -18 },
  { emoji: '🌹', x: 4,  y: 52, size: 1.9, dur: 3.9, delay: 0.6, dx:  12, dy: -14 },
  { emoji: '💖', x: 91, y: 50, size: 1.7, dur: 4.9, delay: 0.3, dx: -12, dy: -16 },
  { emoji: '✨', x: 20, y: 74, size: 1.5, dur: 3.4, delay: 1.1, dx:  6,  dy: -12 },
  { emoji: '🌺', x: 76, y: 72, size: 1.8, dur: 4.7, delay: 0.8, dx: -6,  dy: -14 },
  { emoji: '🎊', x: 44, y: 88, size: 1.6, dur: 5.3, delay: 0.5, dx:  0,  dy: -10 },
  { emoji: '🌟', x: 58, y: 10, size: 1.5, dur: 4.0, delay: 1.4, dx: -4,  dy: -18 },
  { emoji: '💝', x: 33, y: 92, size: 1.4, dur: 4.3, delay: 0.7, dx:  8,  dy: -8  },
  { emoji: '🎉', x: 68, y: 90, size: 1.7, dur: 3.8, delay: 1.0, dx: -8,  dy: -10 },
  { emoji: '🦋', x: 28, y: 16, size: 1.7, dur: 4.6, delay: 0.3, dx:  14, dy: -22 },
  { emoji: '🌈', x: 50, y: 3,  size: 1.4, dur: 5.6, delay: 1.2, dx:  0,  dy: -8  },
  { emoji: '🎀', x: 94, y: 68, size: 1.5, dur: 3.6, delay: 0.5, dx: -14, dy: -14 },
  { emoji: '🌷', x: 2,  y: 78, size: 1.8, dur: 4.4, delay: 1.3, dx:  12, dy: -12 },
  { emoji: '💫', x: 54, y: 80, size: 1.6, dur: 3.9, delay: 0.6, dx:  4,  dy: -18 },
  { emoji: '🌼', x: 84, y: 40, size: 1.7, dur: 5.2, delay: 0.4, dx: -10, dy: -12 },
  { emoji: '🍃', x: 16, y: 60, size: 1.3, dur: 3.5, delay: 0.2, dx:  10, dy: -16 },
  { emoji: '💐', x: 40, y: 5,  size: 1.5, dur: 4.8, delay: 1.5, dx: -4,  dy: -10 },
  { emoji: '🎶', x: 72, y: 30, size: 1.4, dur: 4.1, delay: 0.8, dx: -8,  dy: -14 },
  { emoji: '🥰', x: 22, y: 44, size: 1.6, dur: 3.3, delay: 1.0, dx:  8,  dy: -18 },
  { emoji: '🌙', x: 62, y: 65, size: 1.5, dur: 5.0, delay: 0.3, dx: -6,  dy: -16 },
  { emoji: '💎', x: 10, y: 36, size: 1.4, dur: 4.4, delay: 1.4, dx:  10, dy: -20 },
]

interface Particle {
  id: number; emoji: string; left: number
  delay: number; duration: number; size: number
}

export default function Reveal({ audioSrc, onReplay }: RevealProps) {
  const [phase, setPhase]       = useState<'burst' | 'headline' | 'poem'>('burst')
  const [petals, setPetals]     = useState<Particle[]>([])
  const [balloons, setBalloons] = useState<Particle[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const fire = (ratio: number, opts: confetti.Options) =>
      confetti({ ...opts, origin: { y: 0.6 }, particleCount: Math.floor(200 * ratio) })

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#FFC93C', '#FF8C42', '#FF6B6B'] })
    fire(0.2,  { spread: 60, colors: ['#74C0FC', '#FFC93C', '#ffffff'] })
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#FFC93C', '#FF6B6B', '#74C0FC'] })
    fire(0.1,  { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
    fire(0.1,  { spread: 120, startVelocity: 45 })

    setPetals(Array.from({ length: 24 }, (_, i) => ({
      id: i,
      emoji: PETAL_EMOJIS[i % PETAL_EMOJIS.length],
      left: Math.random() * 100,
      delay: Math.random() * 3.5,
      duration: 4 + Math.random() * 4,
      size: 1 + Math.random() * 1.6,
    })))

    setBalloons(Array.from({ length: 10 }, (_, i) => ({
      id: i,
      emoji: BALLOON_EMOJIS[i % BALLOON_EMOJIS.length],
      left: 3 + i * 10,
      delay: i * 0.35,
      duration: 5 + Math.random() * 3,
      size: 1.8 + Math.random() * 1,
    })))

    if (audioSrc && audioRef.current) {
      audioRef.current.volume = 0.5
      audioRef.current.play().catch(() => {})
    }

    const t1 = setTimeout(() => setPhase('headline'), 800)
    const t2 = setTimeout(() => setPhase('poem'),     2500)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [audioSrc])

  return (
    <section className="relative min-h-screen overflow-hidden flex flex-col items-center justify-center py-16 px-6"
      style={{ background: 'linear-gradient(160deg, #fff7d6 0%, #ffe4f0 45%, #fff0e0 80%, #fffde7 100%)' }}
    >
      {audioSrc && <audio ref={audioRef} src={audioSrc} loop />}

      {/* ── Background floating icons ── */}
      {BG_ICONS.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute select-none pointer-events-none"
          style={{ left: `${icon.x}%`, top: `${icon.y}%`, fontSize: `${icon.size}rem` }}
          animate={{ x: [0, icon.dx, 0], y: [0, icon.dy, 0], rotate: [0, 18, -18, 0], opacity: [0.45, 0.95, 0.45] }}
          transition={{ duration: icon.dur, repeat: Infinity, delay: icon.delay, ease: 'easeInOut' }}
        >
          {icon.emoji}
        </motion.div>
      ))}

      {/* ── Pulsing rings ── */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-sunflower/20 pointer-events-none"
          style={{ width: 200 + i * 140, height: 200 + i * 140 }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.07, 0.3] }}
          transition={{ duration: 4 + i * 0.8, repeat: Infinity, delay: i * 0.7 }}
        />
      ))}

      {/* ── Falling petals ── */}
      {petals.map((p) => (
        <div key={p.id} className="petal"
          style={{ left: `${p.left}%`, fontSize: `${p.size}rem`, animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s` }}
        >
          {p.emoji}
        </div>
      ))}

      {/* ── Rising balloons ── */}
      {balloons.map((b) => (
        <div key={b.id} className="balloon"
          style={{ left: `${b.left}%`, fontSize: `${b.size}rem`, animationDuration: `${b.duration}s`, animationDelay: `${b.delay}s` }}
        >
          {b.emoji}
        </div>
      ))}

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-md w-full text-center">

        {/* Twin SVG sunflowers — identical to Landing page */}
        <motion.div
          className="relative flex items-end justify-center gap-3 mb-6 select-none"
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
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{ inset: '-18px', background: 'radial-gradient(circle, rgba(255,201,60,0.55) 0%, transparent 70%)' }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.2, 0.8] }}
              transition={{ duration: 2.4, repeat: Infinity }}
            />
            <motion.div
              className="absolute rounded-full border-2 border-dashed border-sunflower/30 pointer-events-none"
              style={{ inset: '-10px' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}>
                <Sunflower size={128} id="rv-sf-left" />
              </motion.div>
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
            <motion.div
              className="absolute rounded-full pointer-events-none"
              style={{ inset: '-18px', background: 'radial-gradient(circle, rgba(255,140,66,0.5) 0%, transparent 70%)' }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.2, 0.8] }}
              transition={{ duration: 3.0, repeat: Infinity, delay: 0.9 }}
            />
            <motion.div
              className="absolute rounded-full border-2 border-dashed border-warmOrange/30 pointer-events-none"
              style={{ inset: '-10px' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}>
                <Sunflower size={128} id="rv-sf-right" />
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Headline */}
        <AnimatePresence>
          {(phase === 'headline' || phase === 'poem') && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 150, damping: 12 }}
              className="mb-6"
            >
              <h1 className="font-display shimmer-text text-4xl md:text-5xl leading-tight mb-2">
                Happy 1st Anniversery Angel 💛
              </h1>
              <p className="font-display text-2xl text-warmOrange">
                Dear Girlfriend 🌹
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Poem */}
        <AnimatePresence>
          {phase === 'poem' && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-sunflower/30 mb-8"
            >
              <p className="poem-text font-body text-sm md:text-base leading-loose" style={{ whiteSpace: 'pre-line', color: '#92400E' }}>
                {CONTENT.poem}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Audio controls */}
        {audioSrc && phase === 'poem' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mb-6">
            <button
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.paused ? audioRef.current.play() : audioRef.current.pause()
                }
              }}
              className="font-body text-sm text-sunflowerDark font-semibold bg-sunflower/20 px-4 py-2 rounded-full border border-sunflower/40 hover:bg-sunflower/30 transition-colors"
            >
              🎵 Our Song
            </button>
          </motion.div>
        )}

        {/* Replay */}
        {phase === 'poem' && (
          <motion.button
            onClick={onReplay}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="font-body font-bold text-sm px-8 py-3 rounded-full bg-gradient-to-r from-sunflower to-warmOrange text-white shadow-lg shadow-sunflower/30"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🌻 Replay the Magic
          </motion.button>
        )}
      </div>
    </section>
  )
}
