export default function Avatar ({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: '48px',
        height: '48px',
        objectFit: 'cover',
        borderRadius: '100px'
      }}
    />
  )
}
