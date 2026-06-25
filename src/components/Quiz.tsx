import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CONTENT } from '../content'

interface QuizProps {
  onComplete: () => void
}

type AnswerState = 'idle' | 'correct' | 'wrong'

const CORRECT_MSGS = ['💛 Bilkul sahi!', '🌹 You know me!', '✨ Perfect!', '🥰 Aww, yes!']
const WRONG_MSGS  = ['😄 Dobara try karo!', '💕 Hint dekho!', '🌸 So close!', '🎯 Almost!']

const BG_ICONS = ['💕', '🌹', '💖', '🌸', '✨', '🌺', '💝', '🌻']

export default function Quiz({ onComplete }: QuizProps) {
  const questions = CONTENT.quizQuestions
  const [currentQ, setCurrentQ] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [answerState, setAnswerState] = useState<AnswerState>('idle')
  const [wrongAttempts, setWrongAttempts] = useState(0)
  const [showHint, setShowHint] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)

  const question = questions[currentQ]
  const progressPct = (correctCount / questions.length) * 100

  const handleAnswer = (option: string) => {
    if (answerState !== 'idle') return
    setSelected(option)

    if (option === question.correct) {
      setAnswerState('correct')
      setCorrectCount((c) => c + 1)
      setTimeout(() => {
        if (currentQ < questions.length - 1) {
          setCurrentQ((q) => q + 1)
          setSelected(null)
          setAnswerState('idle')
          setWrongAttempts(0)
          setShowHint(false)
        } else {
          onComplete()
        }
      }, 1300)
    } else {
      setAnswerState('wrong')
      const attempts = wrongAttempts + 1
      setWrongAttempts(attempts)
      if (attempts >= 2) setShowHint(true)
      setTimeout(() => {
        setSelected(null)
        setAnswerState('idle')
      }, 900)
    }
  }

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center py-12 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(155deg, #fff3e0 0%, #ffeef5 50%, #fff7d6 100%)' }}
    >
      {/* Background floating icons */}
      {BG_ICONS.map((icon, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none text-2xl opacity-15"
          style={{ left: `${8 + i * 12}%`, top: `${5 + (i % 4) * 22}%` }}
          animate={{ y: [0, -20, 0], rotate: [0, 20, -20, 0], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 3.5 + i * 0.4, repeat: Infinity, delay: i * 0.45 }}
        >
          {icon}
        </motion.div>
      ))}

      <motion.div
        className="max-w-md w-full relative z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <motion.div
            className="text-6xl mb-3"
            animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💘
          </motion.div>
          <h2 className="font-display text-4xl mb-1" style={{ color: '#c97a00' }}>
            Play the Love Game
          </h2>
          <motion.p
            className="font-body text-gray-500 text-sm"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            Answer the questions to unlock the big surprise! 🎁
          </motion.p>
        </div>

        {/* Progress hearts */}
        <div className="flex justify-center gap-3 mb-6">
          {questions.map((_, i) => (
            <motion.span
              key={i}
              className="text-2xl"
              animate={i < correctCount ? { scale: [1, 1.4, 1] } : {}}
              transition={{ duration: 0.5 }}
            >
              {i < correctCount ? '💛' : '🤍'}
            </motion.span>
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: 'linear-gradient(90deg, #FFC93C, #FF8C42, #FF6B6B)' }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.6, type: 'spring' }}
            />
          </div>
          <p className="text-xs font-body text-gray-400 text-right mt-1">
            Question {currentQ + 1} of {questions.length}
          </p>
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 80, rotateY: 20 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, x: -80, rotateY: -20 }}
            transition={{ duration: 0.45, type: 'spring', stiffness: 160 }}
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-2xl border border-sunflower/20 mb-5"
            style={{ boxShadow: '0 20px 60px rgba(255,201,60,0.15)' }}
          >
            <p className="font-body font-bold text-gray-800 text-xl leading-snug mb-6 text-center">
              {question.question}
            </p>

            <div className="grid grid-cols-2 gap-3">
              {question.options.map((option) => {
                let bg = 'bg-gradient-to-br from-sunflower/10 to-warmOrange/5'
                let border = 'border-sunflower/30'
                let textColor = 'text-gray-700'

                if (selected === option) {
                  if (answerState === 'correct') {
                    bg = 'bg-gradient-to-br from-green-100 to-emerald-50'
                    border = 'border-green-400'
                    textColor = 'text-green-700'
                  } else if (answerState === 'wrong') {
                    bg = 'bg-gradient-to-br from-coral/20 to-pink-50'
                    border = 'border-coral'
                    textColor = 'text-coral'
                  }
                }

                return (
                  <motion.button
                    key={option}
                    className={`relative font-body font-semibold text-sm py-4 px-3 rounded-2xl border-2 transition-all text-center cursor-pointer select-none ${bg} ${border} ${textColor}`}
                    onClick={() => handleAnswer(option)}
                    whileHover={answerState === 'idle' ? { scale: 1.04, y: -2, boxShadow: '0 8px 20px rgba(255,201,60,0.25)' } : {}}
                    whileTap={answerState === 'idle' ? { scale: 0.92 } : {}}
                    animate={
                      selected === option && answerState === 'wrong'
                        ? { x: [-8, 8, -8, 8, 0] }
                        : selected === option && answerState === 'correct'
                        ? { scale: [1, 1.08, 1] }
                        : {}
                    }
                    transition={{ duration: 0.4 }}
                  >
                    {selected === option && answerState === 'correct' && (
                      <motion.span
                        className="absolute -top-3 -right-2 text-xl"
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        💛
                      </motion.span>
                    )}
                    {option}
                  </motion.button>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Hint */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: 'spring' }}
              className="rounded-2xl p-4 text-center mb-3 border border-sunflower/40"
              style={{ background: 'linear-gradient(135deg, #fff7d6, #ffe8c2)' }}
            >
              <p className="font-body text-sm font-bold" style={{ color: '#c97a00' }}>
                🌟 {question.hint}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feedback */}
        <AnimatePresence>
          {answerState === 'correct' && (
            <motion.div
              className="text-center mt-2"
              initial={{ opacity: 0, scale: 0.5, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <span className="font-body font-bold text-lg" style={{ color: '#c97a00' }}>
                {CORRECT_MSGS[currentQ % CORRECT_MSGS.length]}
              </span>
            </motion.div>
          )}
          {answerState === 'wrong' && (
            <motion.div
              className="text-center mt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <span className="font-body font-semibold text-base text-coral">
                {WRONG_MSGS[wrongAttempts % WRONG_MSGS.length]}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
