// List of Projects
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export const metadata = {
  title: 'Projects',
}
export default async function Notes() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore);
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) {
    redirect('/login');
  }
  const { data: notes } = await supabase.from("notes").select();
  return (
    <div className="flex-1 flex flex-col w-full py-8 px-8 sm:max-w-md justify-start gap-2 animate-in">
      {notes!.map((note, index) => (
        <div key={index} className="p-4 bg-blue-200 rounded-md my-2 shadow-lg">
          <h2 className="font-bold text-xl mb-2">{note.title}</h2>
          <p className="text-gray-700">{note.id}</p>
        </div>
      ))}
    </div>
  );
}


