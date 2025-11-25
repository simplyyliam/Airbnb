export const Box = ({ children, className, ...props }) => {
  return (
    <div
      className={`${className}`}
      {...props}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '34px'
      }}
    >
      {children}
    </div>
  )
}
