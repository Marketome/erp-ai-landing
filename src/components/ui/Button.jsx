const variants = {
  primary:
    'bg-primary text-main hover:bg-primary/90 focus-visible:ring-primary/60',
  secondary:
    'border border-brand bg-surface text-main hover:border-accent-cyan/50 hover:bg-surface-light focus-visible:ring-accent-cyan/40',
}

function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  type = 'button',
  ...props
}) {
  const classes = [
    'inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-medium',
    'transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-site',
    variants[variant] ?? variants.primary,
    className,
  ].join(' ')

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
