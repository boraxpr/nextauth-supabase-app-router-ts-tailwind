import { getSession } from "@/server/actions/auth";
export const metadata = {
  title: "Index Page | Sphere Accounts",
};


export default async function Index() {
  const session = await getSession();
  return (
    // Logged in 
    (
      session && <div>
        <div className="py-5 px-20 space-y-1">
          <div className="flex justify-between items-center">
            <div className="w-7/12 print:w-11/12 mx-5 p-4 m-2 bg-white shadow-md rounded-md border">
            </div>
            <div className="w-5/12 print:w-11/12 mx-5 p-4 m-2 bg-white shadow-md rounded-md border">
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="w-7/12 print:w-11/12 mx-5 p-4 m-2 bg-white shadow-md rounded-md border">
            </div>
            <div className="w-5/12 print:w-11/12 mx-5 p-4 m-2 bg-white shadow-md rounded-md border">
            </div>
          </div>
        </div>
      </div>
    )
  );
}