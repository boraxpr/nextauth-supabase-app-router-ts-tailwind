"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { getUrl } from "@/utils/server";
import { FileX2 } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function NotFound() {
  const pathName = usePathname();
  const router = useRouter();
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center flex-col gap-5">
      <div className="flex space-x-3 justify-center items-center">
        <FileX2 className="w-16 h-16 text-primary" />
        <p className="font-bold text-primary text-3xl">404 | Page Not Found</p>
      </div>
      <div className="space-y-1 text-center">
        <p className="text-muted-foreground">
          Not found a page that you're looking for. Please check the URL.
        </p>
        <p className="text-muted-foreground text-sm">({getUrl(pathName)})</p>
      </div>
      <div className="space-x-3">
        <Button onClick={() => router.back()}>Back to Previous Page</Button>
        <Link
          className={buttonVariants({
            variant: "outline",
          })}
          href="/"
        >
          Go to Home Page
        </Link>
      </div>
    </div>
  );
}
