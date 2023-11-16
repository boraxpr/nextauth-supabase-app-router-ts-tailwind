// List of Projects
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export const metadata = {
  title: 'Quotations',
}

export default async function Quotations({ searchParams: { popUp: boolean } }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore);
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    redirect('/login');
  }
  const { data: quotations } = await supabase.from("quotations").select();
  return (
    <div className="flex-1 flex flex-col my-6 px-16 w-3/4 justify-start shadow-lg">
      <div className='shadow-lg '>
        <div className="grid grid-cols-5 bg-[#ff8e3c] text-white rounded-t-lg shadow">
          <div className="p-2 text-center truncate">Created Date</div>
          <div className="p-2 text-center truncate">Doc Num</div>
          <div className="p-2 text-center truncate">Customer/Project</div>
          <div className="p-2 text-center truncate">Grand Total</div>
          <div className="p-2 text-center truncate">Status</div>
        </div>
        <div className='bg-white text-black overflow-auto'>
          {quotations!.map((quotation, index) => (
            <div key={index} className="grid grid-cols-5 p-2">
              <div className=" p-2 text-center">{quotation.created_date}</div>
              <div className=" p-2 text-center">{quotation.doc_num}</div>
              <div className=" p-2 text-center">
                {quotation.customer_id}
                {quotation.project_name}
              </div>

              <div className=" p-2 text-center">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: quotation.currency }).format(quotation.grand_total)}
              </div>
              <div className=" p-2 text-center">
                <div className='grid grid-cols-2'>
                  <div>
                    {quotation.status}
                  </div>
                  <div>
                    <button className="text-sm border w-8 h-8 shadow-lg">
                      <a href="/?pop">
                        <span className='flex justify-center items-center'>
                          •••
                        </span>
                      </a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

