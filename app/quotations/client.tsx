"use client";

import ScrollToTop from "@/components/scrollToTop";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { DataTable, DataTablePagination } from "@/components/ui/data-table";
import { ScreenSpinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { type PaginatedQuotationFn } from "@/server/actions/quotations";
import { useClientSearchParams } from "@/utils/client/url";
import { useQuery } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

interface Props {
  getPaginatedQuotations: PaginatedQuotationFn;
}
export default function QuotationsClient(props: Props) {
  const searchParams = useClientSearchParams(["page", "itemsPerPage"]);
  const page = Number(searchParams.values.page) || 1;
  const itemsPerPage = Number(searchParams.values.itemsPerPage) || 10;
  const query = useQuery({
    queryKey: ["quotations", page, itemsPerPage],
    queryFn: async () => await props.getPaginatedQuotations(page, itemsPerPage),
  });

  // If the page is greater than the total page, set the page to the total page
  useEffect(() => {
    if (query.data?.totalPage && page > query.data?.totalPage) {
      searchParams.set("page", query.data?.totalPage.toString());
    }
  }, [query.data?.totalPage]);

  return (
    <>
      <ScrollToTop />
      {query.isFetching && <ScreenSpinner className="top-[3.5rem]" />}
      <DataTable
        data={query.data?.list ?? []}
        columns={[
          {
            header: "Doc Num.",
            accessorKey: "doc_num",
          },
          {
            header: "Status",
            accessorKey: "status",
            cell: ({ row }) => <Badge>{row.original.status}</Badge>,
          },
          {
            header: "Project Name",
            accessorKey: "project_name",
          },
          {
            header: "Customer",
            accessorKey: "customers.name",
            cell: ({ row }) => (
              <Link
                href={`/customers/${row.original.customers?.id}`}
                className={cn(buttonVariants({ variant: "link" }), "p-0 h-fit")}
              >
                {row.original.customers?.name}
              </Link>
            ),
          },
          {
            header: "Grand Total",
            accessorKey: "grand_total",
            cell: ({ row }) => (
              <span>
                {row.original.grand_total?.toLocaleString("en-US", {
                  currency: row.original.currency || "USD",
                  style: "currency",
                })}
              </span>
            ),
          },
          {
            header: "Actions",
            id: "actions",
            cell: ({ row }) => (
              <div className="space-x-2">
                <Link
                  href={`/quotations/details/${row.original.doc_num}`}
                  className={buttonVariants({
                    variant: "outline",
                    size: "icon",
                  })}
                >
                  <Edit />
                </Link>
              </div>
            ),
          },
        ]}
      />
      <DataTablePagination
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(value) =>
          searchParams.set("itemsPerPage", value.toString())
        }
        page={page}
        totalPages={query.data?.totalPage}
        onPageChange={(value) => searchParams.set("page", value.toString())}
        count={query.data?.count}
      />
    </>
  );
}
