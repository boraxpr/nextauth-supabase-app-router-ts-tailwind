import { Customers, Projects, QuotationDocNum, Quotations } from "@/types/collection";
import { SBServerClient } from "@/utils/server/supabase";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
export const getNewDocNum = async () => {
  const supabase = createClient(cookies())
  try {
    const { data: latestQuotation } = await supabase
      .from("quotations")
      .select("doc_num")
      .order("doc_num", { ascending: false })
      .limit(1).single();

    console.log("docNum not null")
    const parsedDocNum = parseInt(latestQuotation!.doc_num)
    console.log(parsedDocNum)
    const latestProjectDocNum: number = parsedDocNum + parseInt('1');
    console.log("new doc num : " + latestProjectDocNum)

    return { latestProjectDocNum }
  } catch (error) {
    console.error("Error Fetching New Doc Number", error)
    throw error;
  }

};
export const getCustomers = async () => {
  const supabase = createClient(cookies())
  const { data: customers } = await supabase.from("customers").select("*").returns<Customers[]>();
  if (customers === null) {
    throw new Error("Customers data is null");
  }
  return customers;
};

export const getProjects = async () => {
  const supabase = createClient(cookies())
  const { data: projects } = await supabase.from("project").select("*").returns<Projects[]>();
  if (projects === null) {
    throw new Error("Projects data is null");
  }
  return projects;
};
// unused
// export const getQuotationForDetailsForm = async (doc_num: string) => {
//   const supabase = SBClient();

//   const { data: quotation } = await supabase
//     .from("quotations")
//     .select(
//       `
//     doc_num,
//     created_date,
//     status,
//     currency,
//     project_name,
//     grand_total,
//     customers(id, name),
//     due_date
//     `
//     )
//     .eq("doc_num", doc_num)
//     .limit(1)
//     .single();

//   if (quotation === null) {
//     throw new Error("Quotation data is null");
//   }
//   console.log(quotation);
//   if (quotation) {
//     return quotation;
//   }
// };
