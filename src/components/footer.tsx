import { Heart } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4 text-sm text-[#272e35]">
          <div className="flex items-center space-x-2">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>by</span>
            <Link
              href="ttps://x.com/signal0x"
              className="font-bold hover:text-black transition-colors"
            >
              @signal0x
            </Link>
          </div>
          <div>
            Funded by{" "}
            <Link href="https://rocketpool.net/" className="font-bold hover:text-black transition-colors">
              RocketPool
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

