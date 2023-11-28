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

export default async function Quotations(
  { searchParams }: { searchParams: { page: number } }
) {
  const page = searchParams.page || 1;
  const ITEMS_PER_PAGE = 10;
  const supabase = createServerComponentClient<Database>({ cookies })

  const totalCountResponse = await supabase
    .from("quotations")
    .select('count', { head: true });

  const totalCount = totalCountResponse.data?.length ?? 0;

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  const { data: quotations, error, status } = await supabase.from("quotations")
    .select(`
  doc_num,
  created_date,
  status,
  currency,
  project_name,
  grand_total,
  customers(id, name)`
    )
    .order("doc_num", { ascending: false })
    .range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1);

  return (
    <div className="flex-1 flex flex-col m-5 w-3/4 justify-start shadow-lg">
      <div className='shadow-lg '>
        <div className='flex justify-end my-5'>
          <a href="/quotations/create">
            <Button variant="default" className="py-2 px-24 rounded-md no-underline border bg-primary text-primary-foreground">
              Create Quotation
            </Button>
          </a>
        </div>
        <div className='overflow-x-auto'>
          <table className="w-full bg-primary text-white rounded-t-lg shadow">
            <thead>
              <tr>
                <th className="p-2 text-center">Created Date</th>
                <th className="p-2 text-center">Doc Num</th>
                <th className="p-2 text-center">Customer/Project</th>
                <th className="p-2 text-center">Grand Total</th>
                <th className="p-2 text-center">Status</th>
                <th className="p-2 text-center"></th>
              </tr>
            </thead>
            <tbody className="bg-white text-black">
              {quotations ? (
                quotations.map((quotation) => (
                  <tr key={quotation.doc_num}>
                    <td className="p-2 text-center">{quotation.created_date}</td>
                    <td className="p-2 text-center">{quotation.doc_num}</td>
                    <td className="p-2 text-center">
                      <p>{quotation.customers?.name}</p>
                      <p className='font-thin'>{quotation.project_name}</p>
                    </td>
                    <td className="p-2 text-center">
                      {quotation?.currency && (new Intl.NumberFormat('en-US', { style: 'currency', currency: quotation?.currency }).format(quotation.grand_total!))}
                    </td>
                    <td className="p-2 text-center">
                      <div>
                        {quotation.status}
                      </div>
                    </td>
                    <td className="p-2 text-center">
                      <div>
                        <Link href={`/quotations/details/${quotation.doc_num}`} className='inline-flex justify-center items-center text-sm border w-8 h-8 shadow-lg rounded-lg bg-btn-background hover:bg-btn-background-hover' >
                          <span>
                            •••
                          </span>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="grid grid-cols-5 p-4"></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className='flex flex-row justify-center my-1'>
        <div className='space-x-5'>
          {(page != 1 || page <= totalPages) && (<Link href={`/quotations?page=${(Number(page)) - 1}`}>Prev</Link>)}
          {(page < totalPages || page == 1) && (<Link href={`/quotations?page=${(Number(page) + 1).toString()}`}>Next</Link>)}
        </div>
      </div>

    </div>

  );
}

