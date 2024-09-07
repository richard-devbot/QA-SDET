import Link from 'next/link'
import Image from 'next/image'

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-purple-800 to-indigo-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="SDET-Genie Logo" width={40} height={40} />
          <span className="ml-2 text-2xl font-bold text-white">SDET-Genie</span>
        </Link>
        <div className="hidden md:flex space-x-4">
          <NavLink href="/about">About</NavLink>
          <NavLink href="/services">Services</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <NavLink href="/support">Support</NavLink>
        </div>
        <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded">
          Login
        </button>
      </div>
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-white hover:text-pink-300 transition duration-300">
      {children}
    </Link>
  )
}