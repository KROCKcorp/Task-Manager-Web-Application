export default function ImageWithFallback({src, alt}) {
  return (
    <div className="relative w-full h-40 bg-gray-100 overflow-hidden rounded-md">
      <img
        src={src}
        alt={alt}
        onError={e => {
          e.target.src = 'fallback.webp'
        }}
        className="w-full h-full object-cover transition-opacity duration-300"
        loading="lazy"
      />
    </div>
  )
}
