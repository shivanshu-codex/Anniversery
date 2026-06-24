import { useState, useRef } from 'react'
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
  const mainRef = useRef<HTMLDivElement>(null)

  const AUDIO_SRC = undefined // set to '/song.mp3' once you add your song file to public/

  const goTo = (next: Stage) => {
    setStage(next)
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 50)
  }

  return (
    <div ref={mainRef} className="min-h-screen bg-cream">
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
