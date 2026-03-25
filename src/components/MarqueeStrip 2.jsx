import './MarqueeStrip.css'

const row1 = [
  'React', 'JavaScript', 'Python', 'SQL', 'AI / ML',
  'Node.js', 'MongoDB', 'TypeScript', 'Firebase', 'Power BI',
]

const row2 = [
  'C#', 'ASP.NET', 'PyTorch', 'FastAPI', 'OpenCV',
  'Jupyter', 'Scikit-Learn', 'Docker', 'REST APIs', 'Git',
]

function MarqueeRow({ items, reversed }) {
  const repeated = [...items, ...items, ...items]
  return (
    <div className="marquee-row">
      <div className={`marquee-track ${reversed ? 'marquee-track-reverse' : ''}`}>
        {repeated.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span className="marquee-sep">·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function MarqueeStrip() {
  return (
    <section className="marquee-section" aria-hidden="true">
      <div className="marquee-border" />
      <MarqueeRow items={row1} />
      <MarqueeRow items={row2} reversed />
      <div className="marquee-border" />
    </section>
  )
}
