import Image from "next/image";

export function CoverImage({
  src,
  alt = "",
  priority = false,
  className = "object-cover",
  sizes = "100vw",
  quality = 70,
}: {
  src: string;
  alt?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      quality={quality}
      className={className}
    />
  );
}
