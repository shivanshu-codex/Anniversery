import { motion, AnimatePresence } from 'framer-motion'
import { CONTENT } from '../content'

interface SecretMessageProps {
  visible: boolean
  onClose: () => void
}

export default function SecretMessage({ visible, onClose }: SecretMessageProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="max-w-sm w-full"
            initial={{ scale: 0.5, rotate: -8, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.5, rotate: 8, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Envelope flap animation */}
            <motion.div
              className="bg-sunflower rounded-t-3xl h-16 flex items-center justify-center relative overflow-hidden"
              initial={{ scaleY: 1 }}
            >
              {/* Envelope flap fold */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-full bg-sunflowerDark"
                style={{ transformOrigin: 'top' }}
                initial={{ scaleY: 1 }}
                animate={{ scaleY: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              />
              <span className="relative z-10 text-3xl">💌</span>
            </motion.div>

            {/* Letter content */}
            <motion.div
              className="bg-cream rounded-b-3xl p-6 shadow-2xl border border-sunflower/30"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              {/* Decorative header */}
              <div className="text-center mb-4">
                <motion.div
                  className="text-4xl mb-1"
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  🌻
                </motion.div>
                <p className="font-display text-sunflowerDark text-lg">
                  A Secret, Just for You
                </p>
              </div>

              {/* Horizontal line decoration */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex-1 h-px bg-sunflower/30" />
                <span className="text-sunflower text-sm">💛</span>
                <div className="flex-1 h-px bg-sunflower/30" />
              </div>

              {/* Message text */}
              <p className="poem-text font-body text-gray-700 text-sm leading-loose">
                {CONTENT.secretMessage}
              </p>

              {/* Close button */}
              <motion.button
                className="mt-5 w-full font-body font-bold text-sm py-3 rounded-2xl bg-sunflower/20 border border-sunflower/40 text-sunflowerDark hover:bg-sunflower/30 transition-colors"
                onClick={onClose}
                whileTap={{ scale: 0.96 }}
              >
                Close 🌻
              </motion.button>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
