import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { CONTENT } from '../content'

interface RevealProps {
  audioSrc?: string
  onReplay: () => void
}

const PETAL_EMOJIS = ['🌻', '🌸', '💛', '✨', '🌼', '💕']
const BALLOON_EMOJIS = ['🎈', '🎊', '🎉', '🎈', '🎊']

interface Particle {
  id: number
  emoji: string
  left: number
  delay: number
  duration: number
  size: number
}

export default function Reveal({ audioSrc, onReplay }: RevealProps) {
  const [phase, setPhase] = useState<'burst' | 'headline' | 'poem'>('burst')
  const [petals, setPetals] = useState<Particle[]>([])
  const [balloons, setBalloons] = useState<Particle[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Confetti burst
    const fire = (particleRatio: number, opts: confetti.Options) => {
      confetti({
        ...opts,
        origin: { y: 0.6 },
        particleCount: Math.floor(200 * particleRatio),
      })
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#FFC93C', '#FF8C42', '#FF6B6B'] })
    fire(0.2, { spread: 60, colors: ['#74C0FC', '#FFC93C', '#ffffff'] })
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#FFC93C', '#FF6B6B', '#74C0FC'] })
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
    fire(0.1, { spread: 120, startVelocity: 45 })

    // Generate petals
    const newPetals: Particle[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      emoji: PETAL_EMOJIS[i % PETAL_EMOJIS.length],
      left: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 4,
      size: 1 + Math.random() * 1.5,
    }))
    setPetals(newPetals)

    // Generate balloons
    const newBalloons: Particle[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      emoji: BALLOON_EMOJIS[i % BALLOON_EMOJIS.length],
      left: 5 + i * 12,
      delay: i * 0.4,
      duration: 5 + Math.random() * 3,
      size: 2 + Math.random() * 1,
    }))
    setBalloons(newBalloons)

    // Audio
    if (audioSrc && audioRef.current) {
      audioRef.current.volume = 0.5
      audioRef.current.play().catch(() => {})
    }

    // Phase transitions
    const t1 = setTimeout(() => setPhase('headline'), 800)
    const t2 = setTimeout(() => setPhase('poem'), 2500)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [audioSrc])

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-sunflower/30 via-warmOrange/10 to-cream overflow-hidden flex flex-col items-center justify-center py-16 px-6">
      {/* Audio element */}
      {audioSrc && <audio ref={audioRef} src={audioSrc} loop />}

      {/* Falling petals */}
      {petals.map((p) => (
        <div
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}rem`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.emoji}
        </div>
      ))}

      {/* Rising balloons */}
      {balloons.map((b) => (
        <div
          key={b.id}
          className="balloon"
          style={{
            left: `${b.left}%`,
            fontSize: `${b.size}rem`,
            animationDuration: `${b.duration}s`,
            animationDelay: `${b.delay}s`,
          }}
        >
          {b.emoji}
        </div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-md w-full text-center">
        {/* Big sunflower */}
        <motion.div
          className="text-8xl mb-4 select-none"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 10 }}
        >
          🌻
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
                Happy 1st Anniversary
              </h1>
              <p className="font-display text-3xl text-warmOrange">
                Angel & Motak 💛
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
              <p className="poem-text font-body text-gray-700 text-sm md:text-base leading-loose">
                {CONTENT.poem}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Audio controls */}
        {audioSrc && phase === 'poem' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <button
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.paused
                    ? audioRef.current.play()
                    : audioRef.current.pause()
                }
              }}
              className="font-body text-sm text-sunflowerDark font-semibold bg-sunflower/20 px-4 py-2 rounded-full border border-sunflower/40 hover:bg-sunflower/30 transition-colors"
            >
              🎵 Our Song
            </button>
          </motion.div>
        )}

        {/* No audio — open song externally */}
        {!audioSrc && phase === 'poem' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-6"
          >
            <p className="font-body text-xs text-gray-400 mb-2">
              Play our song 🎵
            </p>
          </motion.div>
        )}

        {/* Replay button */}
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
