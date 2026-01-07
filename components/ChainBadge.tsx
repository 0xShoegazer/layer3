import NextImage from 'next/image';

export function ChainBadge({
  url,
  height,
  width,
  onClick,
  className,
}: {
  url: string;
  height?: number;
  width?: number;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <NextImage
      height={height ?? 50}
      width={width ?? 50}
      src={url}
      alt=""
      onClick={() => onClick?.()}
      className={className}
    />
  );
}
