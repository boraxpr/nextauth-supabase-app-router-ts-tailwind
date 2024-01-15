import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function Spinner(props: { className?: string }) {
  return <Loader2 {...props} className={cn("animate-spin", props.className)} />;
}

export function ScreenSpinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 right-0 bottom-0 z-40 flex justify-center items-center bg-white/50",
        className,
      )}
    >
      <Spinner className="w-20 h-20" />
    </div>
  );
}
