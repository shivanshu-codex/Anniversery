import { useState, useRef, useEffect, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Landing from './components/Landing'
import OurStory from './components/OurStory'
import Gallery from './components/Gallery'
import Quiz from './components/Quiz'
import Reveal from './components/Reveal'
import Closing from './components/Closing'

type Stage = 'landing' | 'story' | 'gallery' | 'quiz' | 'reveal' | 'closing'

const STAGE_ORDER: Stage[] = ['landing', 'story', 'gallery', 'quiz', 'reveal', 'closing']

// Songs per stage — quiz & reveal intentionally absent (previous song keeps playing)
const STAGE_SONGS: Partial<Record<Stage, string>> = {
  landing: '/songs/tum-tak.mp3',
  story:   '/songs/raabta.mp3',
  gallery: '/songs/sang-rahiyo.mp3',
  quiz:    '/songs/tamasha.mp3',
  reveal:  '/songs/tu-hai.mp3',
  closing: '/songs/hawayein.mp3',
}

const VOLUME      = 0.5
const FADE_OUT_MS = 1200  // old song fades to silence
const FADE_IN_MS  = 1000  // new song fades in after silence

const sectionVariants = {
  initial: { opacity: 0, y: 50, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, type: 'spring', stiffness: 100 } },
  exit:    { opacity: 0, y: -50, scale: 0.97, transition: { duration: 0.35 } },
}

export default function App() {
  const [stage, setStage]       = useState<Stage>('landing')
  const [playing, setPlaying]   = useState(false)
  const [showTip, setShowTip]   = useState(false)

  // Two audio elements for seamless crossfade
  const a1        = useRef(new Audio())
  const a2        = useRef(new Audio())
  const which     = useRef<1 | 2>(1)   // which audio is currently "active"
  const liveSrc   = useRef('')
  const fadeTimer = useRef<ReturnType<typeof setInterval> | null>(null)

  const active = () => (which.current === 1 ? a1 : a2).current
  const idle   = () => (which.current === 1 ? a2 : a1).current

  // Sequential fade: old song fades OUT completely, then new song fades IN
  const crossfadeTo = useCallback((src: string) => {
    if (src === liveSrc.current) return
    liveSrc.current = src

    if (fadeTimer.current) clearInterval(fadeTimer.current)

    const from      = active()
    const startVol  = from.volume
    const outSteps  = 24
    const outDt     = FADE_OUT_MS / outSteps
    const outDv     = startVol / outSteps
    let   n         = 0

    // Phase 1 — fade OUT old song
    fadeTimer.current = setInterval(() => {
      n++
      from.volume = Math.max(0, from.volume - outDv)

      if (n >= outSteps) {
        clearInterval(fadeTimer.current!)
        from.pause()
        from.src = ''
        which.current = which.current === 1 ? 2 : 1

        // Phase 2 — fade IN new song
        const to = active()
        to.src    = src
        to.volume = 0
        to.loop   = true
        to.play().catch(() => {})

        const inSteps = 20
        const inDt    = FADE_IN_MS / inSteps
        const inDv    = VOLUME / inSteps
        let   m       = 0

        fadeTimer.current = setInterval(() => {
          m++
          to.volume = Math.min(VOLUME, to.volume + inDv)
          if (m >= inSteps) {
            clearInterval(fadeTimer.current!)
            setPlaying(true)
          }
        }, inDt)
      }
    }, outDt)
  }, [])

  // Auto-start music immediately on mount; fall back to first ANY interaction if browser blocks
  useEffect(() => {
    const audio = a1.current
    const src   = STAGE_SONGS.landing!
    liveSrc.current = src
    audio.src    = src
    audio.volume = VOLUME
    audio.loop   = true

    audio.play()
      .then(() => setPlaying(true))
      .catch(() => {
        // Browser blocked silent autoplay — start on first ANY user gesture
        const events = ['click', 'touchstart', 'keydown', 'scroll', 'mousemove'] as const
        const handler = () => {
          audio.play().then(() => setPlaying(true)).catch(() => {})
          events.forEach(ev => document.removeEventListener(ev, handler))
        }
        events.forEach(ev => document.addEventListener(ev, handler, { passive: true }))
      })
  }, [])

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation()
    const audio = active()
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  // Called by Gallery when the photo changes — crossfade to photo's song or back to gallery ambient
  const handleGallerySong = useCallback((song: string | null) => {
    const target = song ?? '/songs/sang-rahiyo.mp3'
    if (!active().paused) crossfadeTo(target)
  }, [crossfadeTo])

  const goTo = (next: Stage) => {
    setStage(next)
    const song = STAGE_SONGS[next]
    if (song && playing) crossfadeTo(song)
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 50)
  }

  return (
    <div className="min-h-screen bg-cream">

      {/* ── Floating music button ── */}
      <motion.div
        className="fixed bottom-6 left-4 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
      >
        {/* Tooltip */}
        <AnimatePresence>
          {showTip && (
            <motion.div
              className="absolute bottom-14 left-0 bg-white/90 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-lg border border-sunflower/20 w-44 pointer-events-none"
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.9 }}
            >
              <p className="text-xs font-body font-bold text-gray-700 leading-tight">
                {playing ? '🎵 Now playing…' : '🎵 Tap to play music'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggleMusic}
          onMouseEnter={() => setShowTip(true)}
          onMouseLeave={() => setShowTip(false)}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl border-2 border-white relative overflow-hidden"
          style={{
            background: playing
              ? 'linear-gradient(135deg, #FFC93C, #FF8C42)'
              : 'rgba(255,255,255,0.92)',
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          animate={playing
            ? { boxShadow: ['0 0 0px rgba(255,201,60,0)', '0 0 22px rgba(255,201,60,0.7)', '0 0 0px rgba(255,201,60,0)'] }
            : {}}
          transition={playing ? { duration: 2, repeat: Infinity } : {}}
        >
          {/* Ripple rings when playing */}
          {playing && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-sunflower/50"
                animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-warmOrange/30"
                animate={{ scale: [1, 2.1], opacity: [0.4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              />
            </>
          )}
          <motion.span
            className="text-xl relative z-10"
            animate={playing ? { rotate: [0, 360] } : {}}
            transition={playing ? { duration: 3, repeat: Infinity, ease: 'linear' } : {}}
          >
            {playing ? '🎵' : '🎶'}
          </motion.span>
        </motion.button>
      </motion.div>

      {/* ── Navigation dots ── */}
      {stage !== 'landing' && (
        <motion.div
          className="fixed top-4 right-4 z-50 flex flex-col gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {STAGE_ORDER.filter((s) => s !== 'landing').map((s) => {
            const stageIdx   = STAGE_ORDER.indexOf(s)
            const currentIdx = STAGE_ORDER.indexOf(stage)
            const isActive   = s === stage
            const isDone     = stageIdx < currentIdx
            return (
              <motion.div
                key={s}
                className="rounded-full"
                style={{
                  width:  isActive ? 10 : 7,
                  height: isActive ? 10 : 7,
                  background: isActive ? '#FFC93C' : isDone ? '#FF8C42' : '#e5e7eb',
                  boxShadow: isActive ? '0 0 8px rgba(255,201,60,0.8)' : 'none',
                }}
                animate={{ scale: isActive ? [1, 1.3, 1] : 1 }}
                transition={{ duration: 1.5, repeat: isActive ? Infinity : 0 }}
              />
            )
          })}
        </motion.div>
      )}

      {/* ── Stages ── */}
      <AnimatePresence mode="wait">
        {stage === 'landing' && (
          <motion.div key="landing" {...sectionVariants}>
            <Landing onBegin={() => goTo('story')} />
          </motion.div>
        )}

        {stage === 'story' && (
          <motion.div key="story" {...sectionVariants}>
            <OurStory />
            <div className="flex justify-center pb-14" style={{ background: 'linear-gradient(170deg, #fffbf0, #ffeef5)' }}>
              <NextButton onClick={() => goTo('gallery')} label="Our Moments 📸" />
            </div>
          </motion.div>
        )}

        {stage === 'gallery' && (
          <motion.div key="gallery" {...sectionVariants}>
            <Gallery onDone={() => goTo('quiz')} onSongChange={handleGallerySong} />
          </motion.div>
        )}

        {stage === 'quiz' && (
          <motion.div key="quiz" {...sectionVariants}>
            <Quiz onComplete={() => goTo('reveal')} />
          </motion.div>
        )}

        {stage === 'reveal' && (
          <motion.div key="reveal" {...sectionVariants}>
            <Reveal audioSrc={undefined} onReplay={() => goTo('closing')} />
          </motion.div>
        )}

        {stage === 'closing' && (
          <motion.div key="closing" {...sectionVariants}>
            <Closing onReplay={() => goTo('landing')} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function NextButton({ onClick, label }: { onClick: () => void; label: string }) {
  return (
    <motion.button
      onClick={onClick}
      className="font-body font-bold text-base px-10 py-4 rounded-full text-white shadow-xl relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #FFC93C, #FF8C42, #FF6B6B)' }}
      whileHover={{ scale: 1.07, boxShadow: '0 20px 40px rgba(255,140,66,0.4)' }}
      whileTap={{ scale: 0.94 }}
      animate={{ scale: [1, 1.03, 1] }}
      transition={{ duration: 2.5, repeat: Infinity }}
    >
      <motion.div
        className="absolute inset-0 opacity-25"
        style={{ background: 'linear-gradient(90deg, transparent, white, transparent)' }}
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: 'linear' }}
      />
      <span className="relative z-10">{label} →</span>
    </motion.button>
  )
}
