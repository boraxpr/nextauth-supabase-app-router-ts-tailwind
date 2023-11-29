import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

export default function Spinner(props: { className?: string }) {
  return <Loader2 {...props} className={cn("animate-spin", props.className)} />;
}
