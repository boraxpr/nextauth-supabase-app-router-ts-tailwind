import { createClient } from "@/utils/supabase/server"
import { BarChartComponent, RadialChartComponent } from "./client";
import { cookies } from "next/headers";
import { getSession } from "@/server/actions/auth";

export const metadata = {
  title: "Index Page | Sphere Accounts",
};


export default async function Index() {
  const session = await getSession()
  const vendorActivity = [
    { day: 'M', value: 200 },
    { day: 'T', value: 300 },
    { day: 'W', value: 150 },
    { day: 'Th', value: 220 },
    { day: 'F', value: 250 },
    { day: 'Sat', value: 75 },
    { day: 'Sun', value: 22 },
  ];
  const sales = [
    {
      name: 'Sold',
      uv: 8000,
      fill: '#f37221',
    },
    {
      name: 'Produced',
      uv: 14000,
      fill: '#3cc061',
    },
  ];

  return (
    // Logged in 
    (
      session &&
      <div>
        <div className="py-5 px-20 space-y-1">
          <div className="flex justify-between items-center">
            <div className="w-7/12 print:w-11/12 mx-5 p-4 m-2 bg-#000000 shadow-md rounded-md border">
            </div>
            <div className="w-5/12 print:w-11/12 mx-5 p-10 m-2 bg-white shadow-md rounded-md border">
              <div className="text-xl font-bold">Vendor Activity</div>
              <BarChartComponent data={vendorActivity} />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="w-7/12 print:w-11/12 mx-5 p-4 m-2 bg-white shadow-md rounded-md border">

            </div>
            <div className="w-5/12 print:w-11/12 mx-5 p-10 m-2 bg-white shadow-md rounded-md border">
              <div className="text-xl font-bold">Cars Sold</div>
              <RadialChartComponent data={sales} />
            </div>
          </div>
        </div>
      </div>
    )
  );
}