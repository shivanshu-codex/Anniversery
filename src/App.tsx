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

const sectionVariants = {
  initial: { opacity: 0, y: 50, scale: 0.97 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, type: 'spring', stiffness: 100 } },
  exit: { opacity: 0, y: -50, scale: 0.97, transition: { duration: 0.35 } },
}

export default function App() {
  const [stage, setStage] = useState<Stage>('landing')
  const [playing, setPlaying] = useState(false)
  const [audioReady, setAudioReady] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const mainRef = useRef<HTMLDivElement>(null)

  // Try to start music on first user interaction anywhere on page
  const tryPlay = useCallback(() => {
    const audio = audioRef.current
    if (!audio || playing) return
    audio.volume = 0.45
    audio.play()
      .then(() => setPlaying(true))
      .catch(() => {})
  }, [playing])

  useEffect(() => {
    document.addEventListener('click', tryPlay, { once: true })
    document.addEventListener('touchstart', tryPlay, { once: true })
    return () => {
      document.removeEventListener('click', tryPlay)
      document.removeEventListener('touchstart', tryPlay)
    }
  }, [tryPlay])

  const toggleMusic = (e: React.MouseEvent) => {
    e.stopPropagation()
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.volume = 0.45
      audio.play().then(() => setPlaying(true)).catch(() => {})
    }
  }

  const goTo = (next: Stage) => {
    setStage(next)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 50)
  }

  return (
    <div ref={mainRef} className="min-h-screen bg-cream">
      {/* Global background audio — place your song at public/song.mp3 */}
      <audio
        ref={audioRef}
        src="/song.mp3"
        loop
        preload="auto"
        onCanPlay={() => setAudioReady(true)}
        onError={() => setAudioReady(false)}
      />

      {/* Floating music player button */}
      <motion.div
        className="fixed bottom-6 left-4 z-50 flex flex-col items-center gap-1"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: 'spring' }}
      >
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && (
            <motion.div
              className="absolute bottom-14 left-0 bg-white/90 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-lg border border-sunflower/20 w-44 pointer-events-none"
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.9 }}
            >
              <p className="text-xs font-body font-bold text-gray-700 leading-tight">
                {playing ? '🎵 Playing...' : '🎵 Tap to play music'}
              </p>
              <p className="text-xs font-body text-gray-400 mt-0.5 leading-tight">
                Add song.mp3 to /public
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          onClick={toggleMusic}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-xl border-2 border-white relative overflow-hidden"
          style={{
            background: playing
              ? 'linear-gradient(135deg, #FFC93C, #FF8C42)'
              : 'rgba(255,255,255,0.9)',
          }}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          animate={playing ? { boxShadow: ['0 0 0px rgba(255,201,60,0)', '0 0 20px rgba(255,201,60,0.7)', '0 0 0px rgba(255,201,60,0)'] } : {}}
          transition={playing ? { duration: 2, repeat: Infinity } : {}}
        >
          {/* Spinning rings when playing */}
          {playing && (
            <>
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-sunflower/40"
                animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                transition={{ duration: 1.4, repeat: Infinity }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-warmOrange/30"
                animate={{ scale: [1, 1.9], opacity: [0.4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, delay: 0.4 }}
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

      {/* Navigation dots */}
      {stage !== 'landing' && (
        <motion.div
          className="fixed top-4 right-4 z-50 flex flex-col gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          {STAGE_ORDER.filter((s) => s !== 'landing').map((s) => {
            const stageIdx = STAGE_ORDER.indexOf(s)
            const currentIdx = STAGE_ORDER.indexOf(stage)
            const isActive = s === stage
            const isDone = stageIdx < currentIdx
            return (
              <motion.div
                key={s}
                className="rounded-full"
                style={{
                  width: isActive ? 10 : 7,
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
            <Gallery onDone={() => goTo('quiz')} />
          </motion.div>
        )}

        {stage === 'quiz' && (
          <motion.div key="quiz" {...sectionVariants}>
            <Quiz onComplete={() => goTo('reveal')} />
          </motion.div>
        )}

        {stage === 'reveal' && (
          <motion.div key="reveal" {...sectionVariants}>
            <Reveal audioSrc={AUDIO_SRC} onReplay={() => goTo('closing')} />
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
