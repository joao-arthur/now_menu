import ImageNext from "next/image";

export function LogoImg() {
  return (
    <ImageNext
      src="/logo.svg"
      height={250}
      width={250}
      alt=""
    />
  );
}
