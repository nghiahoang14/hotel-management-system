"use client";



interface HeaderBackgroundProps {
  images: string[];
  index?: number;
  overlay?: boolean;
}

export default function HeaderBackground({
  images=[],
  index,
  overlay = true,
}: HeaderBackgroundProps) {
  

  return (
    <div className="absolute inset-0 overflow-hidden">
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        />
      ))}

      {overlay && <div className="absolute inset-0 bg-black/40" />}
    </div>
  );
}
