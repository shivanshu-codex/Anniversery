import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import confetti from 'canvas-confetti'
import { CONTENT } from '../content'

const PLACEHOLDER_COLORS = [
  'from-sunflower/50 to-warmOrange/40',
  'from-coral/40 to-pink-300/50',
  'from-sky/40 to-blue-200/50',
  'from-sunflower/40 to-yellow-200/50',
  'from-warmOrange/40 to-coral/40',
  'from-pink-200/50 to-coral/30',
  'from-sky/30 to-sunflower/30',
  'from-sunflower/60 to-cream',
  'from-coral/30 to-warmOrange/30',
  'from-sky/40 to-pink-100/50',
]

const PLACEHOLDER_EMOJIS = ['🌻', '💛', '🌸', '✨', '🥰', '💕', '🌟', '🎉', '🌈', '💖']

const CELEBRATION_MSGS = [
  '💛 What a moment!',
  '🌸 So beautiful!',
  '✨ Pure love!',
  '🥰 Look at you two!',
  '💕 Forever & ever!',
  '🌻 Sunflower vibes!',
  '🎊 Memories made!',
  '💖 My heart!',
  '🌹 Always & forever!',
  '🎉 This one hits!',
]

const BURST_EMOJIS = ['💛', '🌸', '✨', '🌻', '💕', '🌹', '💖', '⭐', '🌺', '🎊']

interface BurstParticle {
  id: number
  emoji: string
  x: number
  y: number
  angle: number
  distance: number
}

interface GalleryProps {
  photos?: Array<{ src: string | null; caption: string; message?: string; song?: string | null }>
  onDone: () => void
  onSongChange?: (song: string | null) => void
}

export default function Gallery({ photos = CONTENT.photos, onDone, onSongChange }: GalleryProps) {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(1)
  const [burst, setBurst] = useState<BurstParticle[]>([])
  const [showMsg, setShowMsg] = useState(false)
  const [celebrating, setCelebrating] = useState(false)
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({})

  const photo = photos[current]
  const imgFailed = imgErrors[current]
  const isLast = current === photos.length - 1

  const celebrate = () => {
    setCelebrating(true)
    setShowMsg(true)

    // Confetti
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.5 },
      colors: ['#FFC93C', '#FF8C42', '#FF6B6B', '#74C0FC', '#ffffff'],
    })

    // Emoji burst particles
    const particles: BurstParticle[] = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      emoji: BURST_EMOJIS[Math.floor(Math.random() * BURST_EMOJIS.length)],
      x: 40 + Math.random() * 20,
      y: 40 + Math.random() * 20,
      angle: (i / 10) * 360,
      distance: 80 + Math.random() * 60,
    }))
    setBurst(particles)

    setTimeout(() => {
      setBurst([])
      setShowMsg(false)
      setCelebrating(false)
    }, 1800)
  }

  const goNext = () => {
    celebrate()
    setTimeout(() => {
      setDirection(1)
      setCurrent((c) => {
        const next = Math.min(c + 1, photos.length - 1)
        onSongChange?.(photos[next]?.song ?? null)
        return next
      })
    }, 400)
  }

  const goPrev = () => {
    setDirection(-1)
    setCurrent((c) => {
      const prev = Math.max(c - 1, 0)
      onSongChange?.(photos[prev]?.song ?? null)
      return prev
    })
  }

  // Auto-celebrate on mount and trigger song for first photo
  useEffect(() => {
    const t = setTimeout(() => celebrate(), 600)
    onSongChange?.(photos[0]?.song ?? null)
    return () => clearTimeout(t)
  }, [])

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0, scale: 0.85 }),
    center: { x: 0, opacity: 1, scale: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0, scale: 0.85 }),
  }

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden"
      style={{ background: 'linear-gradient(150deg, #fff7d6 0%, #ffe8f5 50%, #fff3e0 100%)' }}
    >
      {/* Background floating icons */}
      {['💛', '🌸', '💕', '✨', '🌹'].map((e, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none text-2xl opacity-20"
          style={{ left: `${5 + i * 22}%`, top: `${8 + (i % 3) * 28}%` }}
          animate={{ y: [0, -18, 0], rotate: [0, 20, -20, 0] }}
          transition={{ duration: 4 + i * 0.6, repeat: Infinity, delay: i * 0.5 }}
        >
          {e}
        </motion.div>
      ))}

      {/* Emoji burst particles */}
      {burst.map((p) => (
        <motion.div
          key={p.id}
          className="fixed pointer-events-none select-none text-2xl z-50"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
          animate={{
            opacity: 0,
            scale: 1.5,
            x: Math.cos((p.angle * Math.PI) / 180) * p.distance,
            y: Math.sin((p.angle * Math.PI) / 180) * p.distance,
          }}
          transition={{ duration: 1.4, ease: 'easeOut' }}
        >
          {p.emoji}
        </motion.div>
      ))}

      {/* Celebration message */}
      <AnimatePresence>
        {showMsg && (
          <motion.div
            className="fixed top-20 left-0 right-0 flex justify-center z-50 pointer-events-none"
            initial={{ opacity: 0, y: -30, scale: 0.7 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-xl border border-sunflower/30">
              <p className="font-body font-bold text-sunflowerDark text-base">
                {CELEBRATION_MSGS[current % CELEBRATION_MSGS.length]}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        className="text-center mb-8 relative z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-5xl mb-2"
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          📸
        </motion.div>
        <h2 className="font-display text-4xl" style={{ color: '#c97a00' }}>
          Our Moments
        </h2>
        <p className="font-body text-gray-400 text-sm mt-1">
          {current + 1} of {photos.length} 🌻
        </p>
      </motion.div>

      {/* Photo card */}
      <div className="relative w-full max-w-xs z-10 mb-6">
        {/* Glow ring when celebrating */}
        <AnimatePresence>
          {celebrating && (
            <motion.div
              className="absolute inset-0 rounded-3xl z-0 pointer-events-none"
              style={{ boxShadow: '0 0 40px 10px rgba(255,201,60,0.5)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.2 }}
            />
          )}
        </AnimatePresence>

        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.45, type: 'spring', stiffness: 200, damping: 20 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white"
          >
            {photo.src && !imgFailed ? (
              <img
                src={photo.src}
                alt={photo.caption}
                className="w-full aspect-[3/4] object-cover"
                onError={() => setImgErrors(prev => ({ ...prev, [current]: true }))}
              />
            ) : (
              <div
                className={`w-full aspect-[3/4] bg-gradient-to-br ${PLACEHOLDER_COLORS[current % PLACEHOLDER_COLORS.length]} flex flex-col items-center justify-center gap-3`}
              >
                <motion.span
                  className="text-7xl"
                  animate={{ scale: [1, 1.1, 1], rotate: [0, 8, -8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                >
                  {PLACEHOLDER_EMOJIS[current % PLACEHOLDER_EMOJIS.length]}
                </motion.span>
                <span className="text-base font-body text-gray-500 font-semibold">
                  Photo {current + 1}
                </span>
              </div>
            )}

            {/* Caption overlay */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-4"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)' }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-white font-body font-bold text-sm text-center leading-snug">
                {photo.caption}
              </p>
            </motion.div>

            {/* Photo number badge */}
            <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full px-2 py-0.5">
              <span className="text-xs font-bold text-sunflowerDark font-body">
                {current + 1}/{photos.length}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Message card */}
      <AnimatePresence mode="wait">
        {photo.message && (
          <motion.div
            key={current}
            className="w-full max-w-xs z-10 mb-5"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.4, delay: 0.25 }}
          >
            <div
              className="rounded-2xl px-5 py-4 shadow-md border border-sunflower/20 relative"
              style={{ background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(10px)' }}
            >
              <motion.span
                className="absolute -top-3 left-4 text-xl"
                animate={{ rotate: [0, 12, -12, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                💌
              </motion.span>
              <p className="font-body text-sm text-gray-600 leading-relaxed text-center pt-1">
                {photo.message}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress dots */}
      <div className="flex gap-2 mb-6 z-10">
        {photos.map((_, i) => (
          <motion.div
            key={i}
            className="rounded-full"
            style={{
              width: i === current ? 20 : 8,
              height: 8,
              background: i === current ? '#FFC93C' : i < current ? '#FF8C42' : '#e5e7eb',
            }}
            animate={{ width: i === current ? 20 : 8 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="flex gap-4 z-10">
        <motion.button
          onClick={goPrev}
          disabled={current === 0}
          className="w-14 h-14 rounded-full bg-white shadow-lg border border-sunflower/30 flex items-center justify-center text-2xl disabled:opacity-30"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ←
        </motion.button>

        {!isLast ? (
          <motion.button
            onClick={goNext}
            className="px-8 h-14 rounded-full text-white font-body font-bold text-sm shadow-xl flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg, #FFC93C, #FF8C42)' }}
            whileHover={{ scale: 1.07, boxShadow: '0 15px 35px rgba(255,140,66,0.45)' }}
            whileTap={{ scale: 0.93 }}
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Next 💛
          </motion.button>
        ) : (
          <motion.button
            onClick={() => { celebrate(); setTimeout(onDone, 700) }}
            className="px-8 h-14 rounded-full text-white font-body font-bold text-sm shadow-xl flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg, #FF6B6B, #FF8C42)' }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.93 }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Play the Love Game 🎯
          </motion.button>
        )}

        <motion.button
          onClick={goNext}
          disabled={isLast}
          className="w-14 h-14 rounded-full bg-white shadow-lg border border-sunflower/30 flex items-center justify-center text-2xl disabled:opacity-30"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          →
        </motion.button>
      </div>

    </section>
  )
}
