"use server"
import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"

export const saveChanges = async (formData: FormData) => {
  const supabase = createClient()
  const name = formData.get('projectName') as string
  const details = formData.get('projectDetail') as string

  const { error } = await supabase
    .from('project')
    .update({ project_name: name, detail: details })
    .eq('project_name', name)

  if (error) {
    return redirect('/projects?message=Could not update project')
  }

  return redirect('/projects')
}