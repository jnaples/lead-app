import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/logo.svg"
      alt="lumi logo"
      width={100}
      height={0} // ignored for SVG
      style={{ height: "auto" }}
    />
  );
}
