function SectionHeading({
  eyebrow,
  title,
  description,
  centered = false,
  className = '',
}) {
  return (
    <div className={`${centered ? 'mx-auto max-w-2xl text-center' : ''} ${className}`}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-medium tracking-wide text-accent-cyan uppercase">
          {eyebrow}
        </p>
      ) : null}

      <h2 className="text-3xl font-semibold tracking-tight text-main sm:text-4xl">
        {title}
      </h2>

      {description ? (
        <p className={`mt-4 text-base leading-relaxed text-muted ${centered ? 'mx-auto max-w-xl' : ''}`}>
          {description}
        </p>
      ) : null}
    </div>
  )
}

export default SectionHeading
