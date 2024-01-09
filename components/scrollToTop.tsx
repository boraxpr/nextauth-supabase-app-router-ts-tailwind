'use client'
import { useEffect, useState } from 'react';

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 0)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return isVisible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer"
    >
      Scroll to Top
    </button >
  ) : null
}
