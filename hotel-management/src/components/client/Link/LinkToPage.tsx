import Link from "next/link";

export const LinkToPage = ({ href, className, text }: { href: string; className?: string; text: string }) => {
return(
     <Link href={href}
          className={className}
        >
          {text}
        </Link>

)
}