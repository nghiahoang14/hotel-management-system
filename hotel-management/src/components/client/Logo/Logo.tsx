import Link from "next/link";

export const Logo = ({ isScrolled }: { isScrolled?: boolean }) => {
  return (
    <>
      <Link href={"/"}>
        <img src={isScrolled ? "/Logo-2.webp" : "/logo.png"} alt="Logo" width={110} className="object-cover" />
      </Link>
    </>
  );
};
