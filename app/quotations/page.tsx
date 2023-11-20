// List of Projects
// Path: app/projects/page.tsx

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Database } from '@/types/supabase';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
export const metadata = {
  title: 'Quotations',
}

export default async function Quotations() {
  const supabase = createServerComponentClient<Database>({ cookies })

  let { data: quotations, error, status } = await supabase.from("quotations")
    .select(`
  doc_num,
  created_date,
  status,
  currency,
  project_name,
  grand_total,
  customers(id, name)`
    );
  // get each quotation's customer name

  // async function openQuotation() {
  //   "use server"
  //   console.log('open quotation')
  // }
  // async function closeQuotation() {
  //   "use server"
  //   console.log('close quotation')
  // }
  return (
    <div className="flex-1 flex flex-col m-5 px-16 w-3/4 justify-start shadow-lg">
      <div className='shadow-lg '>
        <div className='flex justify-end my-5'>
          <a href="/quotations/create">
            <Button variant="default" className="py-2 px-24 rounded-md no-underline border bg-primary text-primary-foreground">
              Create Quotation
            </Button>
          </a>
        </div>
        <div className="grid grid-cols-5 bg-[#ff8e3c] text-white rounded-t-lg shadow">
          <div className="p-2 text-center truncate">Created Date</div>
          <div className="p-2 text-center truncate">Doc Num</div>
          <div className="p-2 text-center truncate">Customer/Project</div>
          <div className="p-2 text-center truncate">Grand Total</div>
          <div className="p-2 text-center truncate">Status</div>
        </div>
        <div className='bg-white text-black'>

          {(quotations ? (quotations?.map((quotation) => (
            <div key={quotation.doc_num} className="grid grid-cols-5 p-4 overflow-auto">
              <div className=" p-2 text-center">{quotation.created_date}</div>
              <div className=" p-2 text-center">{quotation.doc_num}</div>
              <div className=" p-2 text-center">
                <p>{quotation.customers?.name}</p>
                <p className='font-thin'>{quotation.project_name}</p>
              </div>
              <div className=" p-2 text-center">
                {quotation?.currency && (new Intl.NumberFormat('en-US', { style: 'currency', currency: quotation?.currency }).format(quotation.grand_total!))}
              </div>
              <div className=" p-2 text-center">
                <div className='grid grid-cols-2'>
                  <div>
                    {quotation.status}
                  </div>
                  <div>
                    <Link href={`/quotations/details/${quotation.doc_num}`} className='inline-flex justify-center items-center text-sm border w-8 h-8 shadow-lg rounded-lg bg-btn-background hover:bg-btn-background-hover' >

                      <span>
                        •••
                      </span>

                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))) :
            <div className="grid grid-cols-5 p-4 overflow-auto"></div>)
          }
        </div>
      </div>
    </div>
  );
}

