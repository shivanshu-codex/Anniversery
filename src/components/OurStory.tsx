import { motion } from 'framer-motion'

const timelineEvents = [
  {
    emoji: '👋',
    year: '2019',
    title: 'Pehli Mulaqat',
    desc: 'Two souls crossed paths — little did they know this was the beginning of something forever.',
    color: 'from-sunflower/30 to-yellow-100',
    accent: '#FFC93C',
  },
  {
    emoji: '🤝',
    year: '2019–2024',
    title: 'Paanch Saal Ki Dosti',
    desc: 'Lucknow ki galiyan, idli dates, late night baatein — a bond only rare hearts share.',
    color: 'from-warmOrange/20 to-orange-50',
    accent: '#FF8C42',
  },
  {
    emoji: '🌹',
    year: '2024',
    title: 'Tumne Pucha',
    desc: 'She asked. He chose her — without a second thought. His heart already knew all along.',
    color: 'from-coral/20 to-pink-50',
    accent: '#FF6B6B',
  },
  {
    emoji: '💛',
    year: '27 June 2025',
    title: 'Ek Naya Safar',
    desc: 'Dosti se pyaar — the most beautiful transition, the most natural "yes" he ever said.',
    color: 'from-sky/20 to-blue-50',
    accent: '#74C0FC',
  },
  {
    emoji: '🎊',
    year: '27 June 2026',
    title: 'Ek Poora Saal',
    desc: '365 days, countless forehead kisses, endless "Mumma" calls — and forever still ahead.',
    color: 'from-sunflower/30 to-warmOrange/10',
    accent: '#FFC93C',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.25 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -50, scale: 0.9 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, type: 'spring', stiffness: 100 } },
}

const FLOATING = ['💕', '🌸', '✨', '💖', '🌹']

export default function OurStory() {
  return (
    <section className="min-h-screen py-16 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(170deg, #fffbf0 0%, #fff3e0 50%, #ffeef5 100%)' }}
    >
      {/* Background floating love icons */}
      {FLOATING.map((f, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none select-none text-2xl opacity-20"
          style={{ right: `${5 + i * 18}%`, top: `${10 + i * 15}%` }}
          animate={{ y: [0, -20, 0], rotate: [0, 15, -15, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.6 }}
        >
          {f}
        </motion.div>
      ))}

      <motion.div
        className="max-w-lg mx-auto relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div className="text-center mb-14" variants={itemVariants}>
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            💌
          </motion.div>
          <h2 className="font-display text-5xl mb-1" style={{ color: '#c97a00' }}>
            Our Story
          </h2>
          <div className="flex justify-center gap-1 mt-3">
            {['🌸', '💛', '🌹', '💛', '🌸'].map((e, i) => (
              <motion.span
                key={i}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.2 }}
              >
                {e}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Animated vertical line */}
          <motion.div
            className="absolute left-8 top-0 bottom-0 w-0.5"
            style={{ background: 'linear-gradient(to bottom, #FFC93C, #FF8C42, #FF6B6B, #FFC93C)' }}
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />

          <div className="space-y-8">
            {timelineEvents.map((event, i) => (
              <motion.div
                key={i}
                className="relative flex gap-5 items-start"
                variants={itemVariants}
              >
                {/* Circle */}
                <motion.div
                  className="relative z-10 flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-2xl shadow-lg border-2 border-white"
                  style={{ background: `linear-gradient(135deg, ${event.accent}55, ${event.accent}22)` }}
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  animate={{ boxShadow: [`0 0 0px ${event.accent}00`, `0 0 16px ${event.accent}66`, `0 0 0px ${event.accent}00`] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                >
                  {event.emoji}
                </motion.div>

                {/* Card */}
                <motion.div
                  className={`flex-1 bg-gradient-to-br ${event.color} rounded-3xl p-5 shadow-lg border border-white/80 backdrop-blur-sm`}
                  whileHover={{ scale: 1.03, y: -3, boxShadow: '0 16px 40px rgba(255,201,60,0.25)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <span
                    className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-2 text-white"
                    style={{ background: event.accent }}
                  >
                    {event.year}
                  </span>
                  <h3 className="font-body font-extrabold text-gray-800 text-base mb-1">
                    {event.title}
                  </h3>
                  <p className="font-body text-gray-600 text-sm leading-relaxed">
                    {event.desc}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          className="text-center mt-14 space-y-2"
          variants={itemVariants}
        >
          <motion.div
            className="text-4xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            💛
          </motion.div>
          <p className="font-body text-gray-500 text-sm italic">
            "Every love story is beautiful, but ours is my favourite."
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
