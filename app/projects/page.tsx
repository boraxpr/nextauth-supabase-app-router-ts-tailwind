// List of Projects
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
export const metadata = {
  title: 'Projects',
}
export default async function Projects() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore);

  const { data: projects } = await supabase.from("project").select();
  return (
    <div className="flex-1 flex flex-col w-full py-8 px-8 sm:max-w-md justify-start gap-2">
      <div className="">

        {projects!.map((project, index) => (
          <div
            key={index}
            className="p-4 bg-[#fffffe] rounded-md my-2 shadow-lg motion-safe:animate-slide_in overflow-hidden"
            style={{ animationDelay: `${index * 100}ms` }} // Add delay based on index
          >
            <h2 className="font-bold text-xl mb-2">{project.project_name}</h2>
            <p className="text-gray-700">{project.detail}</p>
            <p className="text-gray-700 text-sm text-right">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'THB' }).format(project.price)}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}


