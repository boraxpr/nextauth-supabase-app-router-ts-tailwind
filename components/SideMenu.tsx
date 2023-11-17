'use client'
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
export default function SideMenu() {
  const pathname = usePathname();
  const initialMenuState = pathname === '/quotations' || pathname === '/projects';
  const [isMenuOpen, setIsMenuOpen] = useState(initialMenuState);


  return (
    <div>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='bg-[#ff8e3c] p-2 px-24 border rounded-lg'>
        ☰
      </button>
      {isMenuOpen && (
        <aside className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 animate-slide_in flex flex-col`}>
          <button onClick={() => setIsMenuOpen(false)} className='py-5'>
            Close
          </button>

          <Link href="/quotations" className={`text-xl py-5 block ${pathname === '/quotations' ? 'bg-neutral-100 border' : ''} font-extrabold text-center`}>

            Quotations

          </Link>
          <Link href="/projects" className={`text-xl py-5 block ${pathname === '/projects' ? 'bg-neutral-100 border' : ''} font-extrabold text-center`}>

            Projects

          </Link>

        </aside>
      )}
    </div>
  );
}