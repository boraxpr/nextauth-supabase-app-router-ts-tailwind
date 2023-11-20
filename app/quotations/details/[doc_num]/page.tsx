// generateMetadata function is used to generate metadata for the page at build time.
// we can use this function to generate metadata for dynamic routes.

import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Metadata } from "next";
import { cookies } from 'next/headers'
import Link from "next/link";
import { redirect } from "next/navigation";
import QuotationDetailsCard from "../../QuotationDetailsCard";

export function generateMetadata({ params }: {
  params: {
    doc_num: string
  }
}): Metadata {
  return {
    title: `Quotation-${params.doc_num}`,
  }
}

// quotation [doc_num]
// Usage of Dynamic Routes in Next.js App Router
// param is according to folder name i.e. in this case, [doc_num]
export default async function Quotation({ params }: {
  params: {
    doc_num: string
  }
}) {
  const supabase = createServerComponentClient<Database>({ cookies })

  // Select quotation by doc_num
  // quotation also has a relation with customer
  // so we can use Query to get customer name (Serverless API automatically handles this)

  const { data: quotation, error, status } = await supabase.from("quotations")
    .select(`
  doc_num,
  created_date,
  status,
  currency,
  project_name,
  grand_total,
  customers(name)`).eq('doc_num', params.doc_num).single();


  console.log(quotation)
  console.log(error)

  return (
    <div className="w-3/4 shadow-lg bg-[10 14% 95%]">
      <div className="flex justify-end items-end">
        <Link
          href="/quotations"
          className="rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm py-2 px-4 m-5"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>{' '}
          Close
        </Link>
      </div>
      {
        (
          quotation ?
            <QuotationDetailsCard quotation={quotation} />
            :
            <div className="text-center p-16">Quotation not found</div>
        )
      }
    </div>
  );
}

{/* <QuotationDetailscard quotation={quotation} /> */ }