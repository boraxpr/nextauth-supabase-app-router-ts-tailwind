import { buttonVariants } from "@/components/ui/button";
import Spinner, { ScreenSpinner } from "@/components/ui/spinner";

import Link from "next/link";

export default function Loading() {
  return (
    <div className="py-5 px-20 space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Quotations</h1>
        <div className="flex-1"></div>
        <Link href="/quotations/create" className={buttonVariants()}>
          Create Quotation
        </Link>
      </div>
      <ScreenSpinner />
    </div>
  );
}
