"use client"
import { usePathname } from 'next/navigation';

export default function LoginSignupTabs() {
  const pathname = usePathname();
  return (
    <div className="flex">
      <div className={`flex-1 px-4 py-2 rounded-t-lg text-center ${pathname == '/login' ? 'bg-black text-white border-r-2 border-t-2 border-l-2 border-lime-500' : 'bg-white text-black'}`}>
        <a href="/login" className='w-full h-full block'>Login</a>
      </div>
      <div className={`flex-1 px-4 py-2 rounded-t-lg text-center ${pathname == '/signup' ? 'bg-black text-white border-r-2 border-t-2 border-l-2 border-lime-500' : 'bg-white text-black'}`}>
        <a href="/signup" className='w-full h-full block'>Sign Up</a>
      </div>

    </div>
  );
}

