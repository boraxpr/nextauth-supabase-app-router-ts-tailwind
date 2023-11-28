import { getCustomers, getNewDocNum, getProjects } from "@/server_actions/get";
import Form from "./form";
import { Projects, Customers } from "../page.d";
export default async function CreateQuotation() {
  const { newDocCount, currentYear } = await getNewDocNum()
  const doc_num = "Q" + newDocCount + currentYear
  const customers: Customers[] = await getCustomers()
  const projects: Projects[] = await getProjects()

  return (
    <div className="w-full shadow-lg bg-card m-5">
      <Form doc_num={doc_num} customers={customers} projects={projects} />
    </div>
  );
}