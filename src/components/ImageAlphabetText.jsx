import './ImageAlphabetText.css'


const STYLE_SEQUENCE = ['style-1', 'style-2', 'style-3', 'style-4']


function glyphSrc(style, char) {
  return `/assets/letters/generated/${style}/${char.toUpperCase()}.png`
}


export default function ImageAlphabetText({
  text,
  className = '',
  glyphClassName = '',
  styleOffset = 0,
  styles = STYLE_SEQUENCE,
}) {
  const chars = Array.from(text)

  return (
    <span className={`image-alphabet ${className}`.trim()} aria-label={text} role="img">
      {chars.map((char, index) => {
        if (char === ' ') {
          return <span key={`space-${index}`} className="image-alphabet-space" aria-hidden="true" />
        }

        const normalized = char.toUpperCase()
        if (!/[A-Z]/.test(normalized)) {
          return (
            <span key={`${char}-${index}`} className="image-alphabet-fallback" aria-hidden="true">
              {char}
            </span>
          )
        }

        const style = styles[(index + styleOffset) % styles.length]

        return (
          <img
            key={`${normalized}-${index}`}
            src={glyphSrc(style, normalized)}
            alt=""
            aria-hidden="true"
            className={`image-alphabet-glyph ${glyphClassName}`.trim()}
            loading="eager"
            decoding="async"
          />
        )
      })}
    </span>
  )
}
