"use server"
import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"
import dayjs, { Dayjs } from "dayjs"
import format from "dayjs/"
export const createNewQuotation = async (
  newDocNum: string,
  dueDate: Dayjs | null | undefined,
  formData: FormData,) => {
  const supabase = createClient()
  const doc_num = newDocNum
  const project_name = formData.get('project_name') as string
  const grand_total = formData.get('grand_total') as string;
  const currency = formData.get('currency') as string;
  const customer_id = formData.get('customer_id') as string;
  const currentDate = new Date()
  const due_date = dayjs(dueDate).toISOString
  console.info('Timestamp: ', new Date())
  console.info('Document Number:', doc_num);
  console.info('Project Name:', project_name);
  console.info('Grand Total:', grand_total);
  console.info('Currency:', currency);
  console.info('Customer ID:', customer_id);
  console.info('Due Date:', due_date);
  const { error } = await supabase
    .from('quotations')
    .upsert(
      {
        doc_num: doc_num,
        project_name: project_name,
        grand_total: grand_total,
        currency: currency,
        customer_id: customer_id,
        created_date: currentDate,
        status: "Draft",
        due_date: due_date
      },
    )

  console.error({ timestamp: new Date(), error })
  if (error) {
    return redirect('/quotations/create?message=Could not create a quotation')
  }
  return redirect(`/quotations/details/${doc_num}?message=success`)
}

