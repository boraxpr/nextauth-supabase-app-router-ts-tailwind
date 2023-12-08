"use server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/supabase";
import { cookies } from "next/headers";
export const getNewDocNum = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: project } = await supabase
    .from("quotations")
    .select("doc_num")
    .order("doc_num", { ascending: false })
    .limit(1)
    .single();
  console.log(project);
  const latestProjectDocNum: string = project?.doc_num || '';
  const numeric: string = latestProjectDocNum.substring(
    1,
    latestProjectDocNum.length - 4
  );
  const year: string = latestProjectDocNum.substring(
    latestProjectDocNum.length - 4
  );
  const currentYear: string = new Date().getFullYear().toString();
  // First Doc of the Year Reset numeric count
  // still same year ? just iterate
  // New doc
  return {
    newDocCount:
      currentYear == year
        ? (parseInt(numeric, 10) + 1).toString().padStart(2, "0")
        : "00",
    currentYear: currentYear,
  };
};

export const getCustomers = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: customers } = await supabase.from("customers").select("*");
  if (customers === null) {
    throw new Error("Customers data is null");
  }
  return customers;
};

export const getProjects = async () => {
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: projects } = await supabase.from("project").select("*");
  if (projects === null) {
    throw new Error("Projects data is null");
  }
  return projects;
};

export const getQuotationForDetailsForm = async (doc_num: string) => {
  const supabase = createServerComponentClient<Database>({ cookies })

  const { data: quotation } = await supabase
    .from("quotations")
    .select(
      ` 
    doc_num,
    created_date,
    status,
    currency,
    project_name,
    grand_total,
    customers(id, name),
    due_date
    `
    )
    .eq("doc_num", doc_num)
    .limit(1)
    .single();

  if (quotation === null) {
    throw new Error("Quotation data is null");
  }
  console.log(quotation);
  if (quotation) {
    return quotation;
  }
};
