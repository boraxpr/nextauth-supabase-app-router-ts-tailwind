'use client'
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Button } from './ui/button';
export default function SideMenu() {
  const pathname = usePathname();
  const initialMenuState = pathname === '/quotations' || pathname === '/projects';
  const [isMenuOpen, setIsMenuOpen] = useState(initialMenuState);


  return (
    <div className='w-full'>
      <Button onClick={() => setIsMenuOpen(!isMenuOpen)} className='bg-primary p-2 border rounded-lg w-full'>
        ☰
      </Button>
      {isMenuOpen && (
        <aside className={`fixed top-0 left-0 h-full lg:w-[21rem] md:w-44 sm:w-14 bg-white shadow-lg z-50 animate-slide_in flex flex-col`}>
          <button onClick={() => setIsMenuOpen(false)} className='py-5'>
            Close
          </button>

          <Link href="/" className={`text-xl py-5 block  ${pathname === '/' ? 'ring bg-card z-50 m-4' : 'bg-primary text-primary-foreground'} font-extrabold text-center`}>

            Dashboard

          </Link>
          <Link href="/quotations" className={`text-xl py-5 block  ${pathname === '/quotations' ? 'ring bg-card z-50 m-4' : 'bg-primary text-primary-foreground'} font-extrabold text-center`}>

            Quotations

          </Link>
          <Link href="/projects" className={`text-xl py-5 block  ${pathname === '/projects' ? 'ring bg-card z-50 m-4' : 'bg-primary text-primary-foreground'} font-extrabold text-center`}>

            Projects

          </Link>

        </aside>
      )}
    </div>
  );
}