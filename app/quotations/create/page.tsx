import { getCustomers, getProjects } from "@/server_actions/get";
import Form from "./form";
import { Projects, Customers } from "@/types/collection";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
export default async function CreateQuotation() {
  const { latestProjectDocNum } = await getNewDocNum()
  const doc_num = latestProjectDocNum.toString()
  const customers: Customers[] = await getCustomers()
  const projects: Projects[] = await getProjects()
  console.log("Server side doc_num: " + latestProjectDocNum)

  return (
    <div className="w-full shadow-lg bg-card m-5">
      <Form doc_num={doc_num} customers={customers} projects={projects} />
    </div>
  );
}

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