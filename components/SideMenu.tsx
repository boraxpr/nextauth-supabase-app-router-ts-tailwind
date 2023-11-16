'use client'
import { useState } from 'react';
import { usePathname } from 'next/navigation';
export default function SideMenu() {
  const pathname = usePathname();
  const initialMenuState = pathname === '/quotations' || pathname === '/projects';
  const [isMenuOpen, setIsMenuOpen] = useState(initialMenuState);


  return (
    <div>
      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='bg-[#ff8e3c] p-2 px-5 border rounded-lg'>
        ☰
      </button>
      {isMenuOpen && (
        <aside className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 animate-slide_in flex flex-col`}>
          <button onClick={() => setIsMenuOpen(false)} className='py-5'>
            Close
          </button>

          <button className={`text-xl py-5 ${pathname === '/quotations' ? 'bg-neutral-100 border' : ''}`}>
            <a href="/quotations" className={`font-extrabold`}>Quotations</a>
          </button >
          <button className={`text-xl py-5 ${pathname === '/projects' ? 'bg-neutral-100 border' : ''}`}>
            <a href="/projects" className={`font-extrabold`}>Projects</a>
          </button>

        </aside>
      )}
    </div>
  );
}