import { getCustomers, getNewDocNum, getProjects } from "@/server_actions/get";
import Form from "./form";
import { Projects, Customers } from "@/types/collection";
import { SBServerClient } from "@/utils/server/supabase";
import { cookies } from "next/headers";
export default async function CreateQuotation() {
  const supabase = SBServerClient(cookies())
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