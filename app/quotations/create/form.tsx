"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChangeEvent, useCallback, useEffect, useState } from "react"
import { redirect, usePathname, useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Database } from "@/types/supabase"
import { Customers, Projects } from "../page.d"
import { DatePicker, DateValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from "dayjs"
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { useRef } from 'react';
import { useReactToPrint } from "react-to-print"

export default function Form(
  { doc_num, customers, projects }: { doc_num: string, customers: Customers[], projects: Projects[] }
) {
  const supabase = createClientComponentClient<Database>()
  const [grandTotal, setGrandTotal] = useState<string | number | null>(null)
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>('')
  const [selectedCustomer, setSelectedCustomer] = useState('')
  const [selectedProject, setSelectedProject] = useState<string | null>("")
  const [dueDate, setDueDate] = useState<Dayjs | null>(dayjs(new Date()).add(7, "days"))
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()))
  const pathname = usePathname()
  const [loading, setLoading] = useState<boolean>((pathname.includes('details')))
  const router = useRouter();

  const getPrefilledData = useCallback(async () => {
    const { data: quotation } = await supabase.from("quotations").select(
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
    ).eq('doc_num', doc_num).limit(1).single()
    console.log('Quotation from API:', quotation);
    if (quotation) {
      setGrandTotal(quotation.grand_total);
      setSelectedCurrency(quotation.currency);
      // @ts-ignore
      setSelectedCustomer(quotation.customers.id);
      setDate(dayjs(quotation.created_date));
      setDueDate(dayjs(quotation.due_date));
      setSelectedProject(quotation.project_name);
    }
    setLoading(false)
  }, [supabase]);

  useEffect(() => {
    if (pathname.includes("details")) {
      getPrefilledData()
    }

  }, [getPrefilledData])

  async function updateData(
    {
      docNum,
      project_name,
      grand_total,
      currency,
      customer_id,
      due_date,
      status
    }: {
      currency?: string | null
      customer_id?: string | null
      docNum: string
      due_date?: string | null
      grand_total?: number | null
      project_name?: string | null
      status?: string | null
    }
  ) {
    try {
      setLoading(true)
      if (pathname.includes("/create")) {
        const { error } = await supabase.from('quotations').insert({
          created_date: new Date().toISOString(),
          currency,
          customer_id,
          doc_num: docNum,
          due_date: dayjs(due_date).toISOString(),
          grand_total,
          project_name,
          status: "Draft",
        })
        console.info(docNum,
          project_name,
          grand_total,
          currency,
          customer_id,
          due_date,
          status)
        if (error) throw error
      }
      if (pathname.includes('/details/')) {
        const { error } = await supabase.from('quotations').update({
          currency,
          customer_id,
          due_date: dayjs(due_date).toISOString(),
          grand_total,
          project_name,
          status
        }).eq('doc_num', docNum)
        console.info(docNum,
          project_name,
          grand_total,
          currency,
          customer_id,
          due_date,
          status)
        if (error) {
          console.error(error)
          throw error
        }
      }
    } catch (error) {
      alert('Error Updating Data')
      throw error
    } finally {
      setLoading(false)
    }

  }
  function handleSelectedProjectChange(event: ChangeEvent<HTMLSelectElement>): void {
    setSelectedProject(event.target.value)
  }

  function handleGrandTotalChange(event: ChangeEvent<HTMLInputElement>): void {
    setGrandTotal(Number(event.target.value))
  }

  function handleCurrencyChange(event: ChangeEvent<HTMLSelectElement>): void {
    setSelectedCurrency(event.target.value)
  }
  function handleSelectedCustomerChange(event: ChangeEvent<HTMLSelectElement>): void {
    setSelectedCustomer(event.target.value)
  }

  function handleDueDateChange(value: Dayjs | null, context: PickerChangeHandlerContext<DateValidationError>): void {
    setDueDate(value)
    console.log(value)
  }

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    onAfterPrint: () => console.log('Printed PDF successfully!'),
  });


  return (
    <div>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form ref={componentRef}>
          <div className="w-11/12 mx-auto p-2 m-10 mt-2 mb-0 pb-0 flex flex-row justify-between">
            <div className="">
              <div className="text-left text-2xl">{(pathname.includes('/details/') ? "Quotation Details" : "Create Quotation")}</div>
              <div className="text-primary inline-block text-xl">No. {doc_num}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-20 rounded-3xl" onClick={handlePrint}>Print this out!</button>
              <div>

                <Button type="button" variant="outline"
                  className="py-2 px-20 rounded-3xl border-red-500 text-red-500 hover:text-red-500"
                  disabled={loading}
                >   <a href="/quotations">
                    Close </a>
                </Button>

              </div>
              <div>
                <Button variant="outline"
                  onClick={() => updateData({
                    docNum: doc_num,
                    project_name: selectedProject,
                    grand_total: Number(grandTotal),
                    currency: selectedCurrency,
                    customer_id: selectedCustomer,
                    due_date: dayjs(dueDate).toString()
                  }).then(() => router.push("/quotations"))}
                  className="py-2 px-20 rounded-full border-green-500 text-green-500 hover:text-green-500 " disabled={loading}>
                  Save
                </Button>
              </div>
            </div>
          </div>
          <div className="w-9/12 mx-auto p-4 m-10 mt-0 bg-white shadow-md rounded-md border">
            <div className="m-5 mt-0 flex flex-row justify-between space-x-5">
              <div className="w-1/2 ">
                <div className="mb-4 w-1/2 space-y-2">
                  <Label htmlFor="customer_id" className="block text-lg ">Customer Name</Label>
                  <select id="customer_id" name="customer_id" className="mt-1 p-2 w-full border rounded-md" value={selectedCustomer} onChange={handleSelectedCustomerChange} required>
                    {customers ? (
                      <>
                        <option value="">Select a customer</option>
                        {customers.map((customer) => (
                          <option key={customer.id} value={customer.id}>
                            {customer.name}
                          </option>
                        ))}
                      </>
                    ) : (
                      <option value="" disabled>
                        No customers available
                      </option>
                    )}
                  </select>
                  <Label htmlFor="customer_id" className="block text-lg">Client Detail</Label>
                  <Textarea placeholder="Address"></Textarea>
                  <Input type="text" placeholder="Zip Code"></Input>
                  <Input type="text" placeholder="Tax ID"></Input>
                  <Input type="text" placeholder="Branch/Branch Number"></Input></div>
              </div>
              <div className="w-[40%]">
                <div className="mb-4 space-y-2">
                  <div className="mb-4 ">
                    <Label htmlFor="grand_total" className="block text-lg ">Grand Total(v1):</Label>
                    <Input type="number" id="grand_total" name="grand_total" className="mt-1 p-2 w-full border rounded-md" value={grandTotal === null ? '' : grandTotal} onChange={handleGrandTotalChange} required />
                  </div>

                  {(pathname == "/quotations/create") && (
                    <div>
                      {/* <Label htmlFor="date" className="block text-sm ">Date:</Label> */}
                      <DatePicker label="Created Date" format="DD-MMM-YYYY" value={dayjs(new Date())} disabled />
                    </div>
                  )}
                  {(pathname.includes("/quotations/details")) && (
                    <div>
                      {/* <Label htmlFor="date" className="block text-sm ">Date:</Label> */}
                      <DatePicker label="date" format="DD-MMM-YYYY" value={dayjs(date)} disabled />
                    </div>
                  )}

                  <Input type="text" placeholder="Credit (Day):"></Input>

                  {/* <Label htmlFor="" className="block text-sm ">Due Date:</Label> */}
                  <DatePicker label="Due Date" format="DD-MMM-YYYY" value={dayjs(dueDate)} minDate={dayjs(new Date()).add(1, "days")} onChange={handleDueDateChange} />
                  <Input type="text" placeholder="Sales Name:"></Input>
                  <div className="mb-4">
                    <select id="currency" name="currency" className="mt-1 p-2 w-full border rounded-md" value={selectedCurrency === null ? '' : selectedCurrency} onChange={handleCurrencyChange}>
                      <option value="">Currency:</option>
                      <option value="usd">USD - United States Dollar</option>
                      <option value="eur">EUR - Euro</option>
                      <option value="gbp">GBP - British Pound Sterling</option>
                      <option value="gbp">THB - Thai Baht</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>


          </div>
          <div className="w-9/12 mx-auto p-4 m-10 bg-card shadow-md rounded-md border">
            <div className="flex flex-row space-x-3">
              <div className="mb-4 w-9/12">
                <div className="flex flex-row space-x-1 items-center">
                  <Label htmlFor="project_name" className="block text-sm font-medium text-gray-600 required:" >Project:</Label>
                  {<select id="project_name" name="project_name" className="mt-1 p-2 w-full border rounded-md" value={selectedProject === null ? '' : selectedProject} onChange={handleSelectedProjectChange} required>
                    {projects && projects.length > 0 ? (
                      <>
                        <option value="">Select a project</option>
                        {projects.map((project) => (
                          <option key={project.project_name} value={project.project_name}>
                            {project.project_name}
                          </option>
                        ))}
                      </>
                    ) : (
                      <option value="" disabled>
                        No projects available
                      </option>
                    )}
                  </select>}
                </div>
              </div>
              <div className="mb-4 w-3/12">
                <div className="flex flex-row space-x-1 items-center">
                  <Label htmlFor="ref_num" className="block text-sm font-medium text-gray-600">Ref:</Label>
                  <Input type="text"></Input>
                </div>
              </div>
            </div>
            <div className="flex flex-row space-x-5 items-center">
              <Label htmlFor="detail" className="block text-sm font-medium text-gray-600">Detail: </Label>
              <Input type="text"></Input>
            </div>
          </div>

          <div className="w-9/12 mx-auto pb-10 bg-card grid grid-flow-col gap-4 ">
            <div className="flex flex-col col-span-1 space-y-5">
              <div className="">
                <Textarea placeholder="Remarks"></Textarea>
              </div>
              <div className="">
                <Textarea placeholder="Notes"></Textarea>
              </div>
              <div className="border rounded-lg">
                <div className="m-5 flex flex-row justify-between">
                  <label htmlFor="image">Image:</label>
                  <input id="image" type="file" className="" />
                </div>
              </div>
              <div className=" flex flex-row space-x-3 items-center">
                <input id="signature" type="checkbox" className="w-8 h-8" />
                <label htmlFor="signature" >Signature
                </label>
              </div>
            </div>
            <div className="flex flex-col col-span-4 divide-y border shadow-lg rounded-lg">
              <div className="m-5 divide-y-2">
                <div className="space-y-5">
                  <div >
                    Total
                  </div>
                  <div className="flex items-center">
                    <label htmlFor="discount" className="mr-2">Discount</label>
                    <Input type="text" className="w-16"></Input>
                    <span className="ml-1">%</span>
                  </div>
                  <div >
                    Total After Discount
                  </div>
                  <div className="flex flex-row space-x-3 items-center">
                    <input id="vat" type="checkbox" className="w-8 h-8" />
                    <Label htmlFor="vat">VAT
                    </Label>
                  </div>
                  <div>
                    Grand Total
                  </div>
                </div>
                <div className="pt-5">
                  <div className="flex flex-row space-x-3 items-center">
                    <input type="checkbox" id="withholding_tax" className="w-8 h-8" />
                    <Label htmlFor="withholding_tax">Withholding Tax
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </form>
      </LocalizationProvider>
    </div>
  )
}
