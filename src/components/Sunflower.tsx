interface SunflowerProps {
  size?: number
  id?: string
}

export function Sunflower({ size = 130, id = 'sf' }: SunflowerProps) {
  const C = 150

  const outerAngles = Array.from({ length: 20 }, (_, i) => i * 18)
  const innerAngles = Array.from({ length: 20 }, (_, i) => i * 18 + 9)

  // Seed dots — concentric rings
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
    <svg
      viewBox="0 0 300 300"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', overflow: 'visible' }}
    >
      <defs>
        {/* Outer petal: bright yellow tip → warm orange base */}
        <linearGradient id={`${id}-op`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#FFE835" />
          <stop offset="45%"  stopColor="#FFB300" />
          <stop offset="100%" stopColor="#E65100" />
        </linearGradient>

        {/* Inner petal: amber → deep orange */}
        <linearGradient id={`${id}-ip`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#FFD54F" />
          <stop offset="100%" stopColor="#BF360C" />
        </linearGradient>

        {/* Disk center — rich dark brown with 3-D feel */}
        <radialGradient id={`${id}-disk`} cx="38%" cy="32%" r="68%">
          <stop offset="0%"   stopColor="#6D4C41" />
          <stop offset="50%"  stopColor="#3E2723" />
          <stop offset="100%" stopColor="#140A04" />
        </radialGradient>

        {/* Glossy highlight on disk */}
        <radialGradient id={`${id}-glow`} cx="30%" cy="25%" r="52%">
          <stop offset="0%"   stopColor="rgba(255,220,140,0.28)" />
          <stop offset="100%" stopColor="rgba(255,220,140,0)"    />
        </radialGradient>

        {/* Petal vein — thin lighter stripe */}
        <linearGradient id={`${id}-vein`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.45)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)"    />
        </linearGradient>
      </defs>

      {/* ── Outer petals ── */}
      <g>
        {outerAngles.map((angle) => (
          <ellipse
            key={angle}
            cx={C}
            cy={C - 74}
            rx={17}
            ry={56}
            fill={`url(#${id}-op)`}
            transform={`rotate(${angle} ${C} ${C})`}
          />
        ))}
      </g>

      {/* Outer petal veins */}
      {outerAngles.map((angle) => (
        <ellipse
          key={`v${angle}`}
          cx={C}
          cy={C - 74}
          rx={4}
          ry={52}
          fill={`url(#${id}-vein)`}
          transform={`rotate(${angle} ${C} ${C})`}
        />
      ))}

      {/* ── Inner petals ── */}
      {innerAngles.map((angle) => (
        <ellipse
          key={angle}
          cx={C}
          cy={C - 58}
          rx={12}
          ry={38}
          fill={`url(#${id}-ip)`}
          transform={`rotate(${angle} ${C} ${C})`}
        />
      ))}

      {/* ── Disk center ── */}
      <circle cx={C} cy={C} r={54} fill={`url(#${id}-disk)`} />

      {/* Seed dots */}
      {seeds.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#160804" opacity={0.82} />
      ))}

      {/* Tiny seed highlight dots */}
      {seeds.map((s, i) => (
        <circle key={`h${i}`} cx={s.x - 0.8} cy={s.y - 0.8} r={s.r * 0.38} fill="rgba(255,180,80,0.25)" />
      ))}

      {/* Glossy highlight on center */}
      <circle cx={C} cy={C} r={54} fill={`url(#${id}-glow)`} />
    </svg>
  )
}
