import { QuotationDocNum, Quotations } from "@/types/collection";
import { Database } from "@/types/supabase";
import { SBClient } from "@/utils/client/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export const getNewDocNum = async () => {
  // const currYear: number = new Date().getFullYear();
  // const prevYear: number = new Date().getFullYear() - 1;
  const supabase = createServerComponentClient<Database>({ cookies })
  const { data: docNum } = await supabase
    .from("quotations")
    .select("doc_num")
    .order("doc_num", { ascending: false })
    .limit(1).returns<QuotationDocNum>();
  console.log(typeof docNum)

  console.log(docNum)
  const latestProjectDocNum: number = 0;
  if (docNum !== null) {
    console.log("docNum not null")
    const parsedDocNum = parseInt(docNum, 10)
    const latestProjectDocNum: number = parsedDocNum + parseInt('1');

    console.log(latestProjectDocNum + "x")
  }

  // const numeric: string = latestProjectDocNum.substring(
  //   1,
  //   latestProjectDocNum.length - 4
  // );
  // const year: string = latestProjectDocNum.substring(
  //   latestProjectDocNum.length - 4
  // );

  // First Doc of the Year Reset numeric count
  // still same year ? just iteratee
  // New doc
  // console.log(parseInt(numeric, 10) + 1)
  return { latestProjectDocNum }
  // {
  //   newDocCount: numeric,
  // currYear === parseInt(year)
  //   ? (parseInt(numeric, 10) + 1).toString().padStart(2, "0")
  //   : "00",
  // currentYear: currYear,
  // };
};

export const getCustomers = async () => {
  const supabase = createServerComponentClient({ cookies })
  const { data: customers } = await supabase.from("customers").select("*");
  if (customers === null) {
    throw new Error("Customers data is null");
  }
  return customers;
};

export const getProjects = async () => {
  const supabase = createServerComponentClient({ cookies })
  const { data: projects } = await supabase.from("project").select("*");
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
