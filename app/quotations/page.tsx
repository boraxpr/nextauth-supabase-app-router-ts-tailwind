import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { getPaginatedQuotations } from "@/server/actions/quotations";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import QuotationsTable from "./client";
export const metadata = {
  title: "Quotations | Sphere Accounts",
};

interface Props {
  searchParams: { page?: string; itemsPerPage?: string };
}

export default async function Quotations({ searchParams }: Props) {
  const queryClient = new QueryClient();
  const page = Number(searchParams.page) || 1;
  const itemsPerPage = Number(searchParams.itemsPerPage) || 10;
  await queryClient.prefetchQuery({
    queryKey: ["quotations", page, itemsPerPage],
    queryFn: async () => await getPaginatedQuotations(page, itemsPerPage),
  });

  return (
    <div className="py-5 px-20 space-y-3">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Quotations</h1>
        <Link href="/quotations/create" className={buttonVariants()}>
          Create Quotation
        </Link>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <QuotationsTable getPaginatedQuotations={getPaginatedQuotations} />
      </HydrationBoundary>
    </div>
  );
}
