"use client";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { ChevronUpIcon } from "@radix-ui/react-icons";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    setIsVisible(window.scrollY > 0);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return isVisible ? (
    <Button
      size="icon"
      className="z-40 fixed bottom-5 right-5 bg-primary/80"
      onClick={scrollToTop}
    >
      <ChevronUpIcon className="w-6 h-6" />
    </Button>
  ) : (
    <></>
  );
}
