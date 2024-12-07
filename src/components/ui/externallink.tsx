"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}
export const ExternalLinkButton: React.FC<ExternalLinkProps> = ({
  href,
  children,
  className = "",
}) => {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`
        inline-flex items-center rounded-md border
        px-2 py-1 text-sm
        transition-colors focus:outline-none
        focus:ring-2 focus:ring-ring focus:ring-offset-2
        border-transparent bg-secondary
        text-secondary-foreground hover:bg-secondary/80
        gap-1
        ${className}
      `}
    >
      {children}
      <ExternalLink className="h-3 w-3" />
    </Link>
  );
};
