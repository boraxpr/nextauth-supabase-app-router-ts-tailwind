import { Database } from "@/types/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Metadata } from "next";
import { cookies } from 'next/headers'
import Form from "../../create/form";
import { Customers, Projects } from "../../page.d";
import { getCustomers, getProjects } from "@/server_actions/get";

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
export default async function Quotation({ params, searchParams }: {
  params: {
    doc_num: string,
  }, searchParams: { message: string }
}) {
  const supabase = createServerComponentClient<Database>({ cookies })

  // Select quotation by doc_num
  // quotation also has a relation with customer
  // so we can use Query to get customer name (Serverless API automatically handles this)

  // const { data: quotation, error, status } = await supabase.from("quotations")
  //   .select(`*`).eq('doc_num', params.doc_num).single();
  const customers: Customers[] = await getCustomers()
  const projects: Projects[] = await getProjects()

  // console.log(quotation)


  return (
    <div className="w-full shadow-lg bg-card m-5">
      <Form customers={customers} projects={projects} doc_num={params.doc_num} />
    </div >
  );
}

{/* <QuotationDetailscard quotation={quotation} /> */ }