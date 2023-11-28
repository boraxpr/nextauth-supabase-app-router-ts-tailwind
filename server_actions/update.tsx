"use server"
import { createClient } from "@/utils/supabase/client"
import { redirect } from "next/navigation"

export const saveProjectChanges = async (
  project_name: string,
  formData: FormData,
) => {
  "use server"
  const supabase = createClient()
  const name = formData.get('projectName') as string
  const details = formData.get('projectDetail') as string
  console.info({ timestamp: new Date(), name, details })
  const { error } = await supabase
    .from('project')
    .update({ project_name: name, detail: details })
    .eq('project_name', project_name)
  console.error({ timestamp: new Date(), error })
  if (error) {
    return redirect('/projects?message=Could not update project')
  }
  return redirect('/projects')
}