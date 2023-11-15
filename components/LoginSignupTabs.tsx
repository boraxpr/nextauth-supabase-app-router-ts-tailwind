"use client"
import { usePathname } from 'next/navigation';

export default function LoginSignupTabs() {
  const pathname = usePathname();
  return (
    <div className="flex">
      <div className={`flex-1 px-4 py-2 rounded-t-lg text-center ${pathname == '/login' ? 'bg-black text-white' : 'bg-green-700 text-white'}`}>
        <a href="/login" className='w-full h-full block'>Login</a>
      </div>
      <div className={`flex-1 px-4 py-2 rounded-t-lg text-center ${pathname == '/signup' ? 'bg-black text-white' : 'bg-green-700 text-white'}`}>
        <a href="/signup" className='w-full h-full block'>Sign Up</a>
      </div>

    </div>
  );
}

