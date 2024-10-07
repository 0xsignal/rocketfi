import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        destructive:
          "border-transparent bg-[#FF6E30] text-white hover:bg-[#FF6E30]/80",
        secondary:
          "border-transparent bg-[#F4F4F5] text-[#272E35] hover:bg-[#F4F4F5]/80",
        default:
          "border-transparent bg-[#FF6E30] text-white hover:bg-[#FF6E30]/80",
        outline: "text-[#272E35]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
