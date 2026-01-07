import NextImage from 'next/image';

export function ChainBadge({
  url,
  height,
  width,
  onClick,
}: {
  url: string;
  height?: number;
  width?: number;
  onClick?: () => void;
}) {
  return (
    <NextImage
      height={height ?? 50}
      width={width ?? 50}
      src={url}
      alt=""
      onClick={() => onClick?.()}
      className="cursor"
    />
  );
}
