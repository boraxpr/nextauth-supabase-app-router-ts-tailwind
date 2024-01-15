import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { saveProjectChanges } from "@/server_actions/update";
import { getProjects } from "@/server_actions/get";

export const metadata = {
  title: "Projects",
};
export default async function Page({
  searchParams,
}: {
  searchParams: { message: string; project_name: string };
}) {
  // Get projects list
  const projects = await getProjects();
  console.log(projects);
  // Binding to Edit Server Action
  const saveChangesWithProjectName = saveProjectChanges.bind(
    null,
    searchParams.project_name,
  );

  return (
    <div className="justify-center flex flex-row items-center">
      <div>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </div>
      {projects!.map((project, index) => (
        <div
          key={index}
          className="p-4 bg-[#fffffe] rounded-md my-2 shadow-lg motion-safe:animate-slide_in overflow-hidden lg:w-4/5 w-full"
          style={{ animationDelay: `${index * 100}ms` }} // Add delay based on index
        >
          <h2 className="font-bold text-xl mb-2">{project.project_name}</h2>
          <p className="text-gray-700">{project.detail}</p>
          {project.price !== null && (
            <p className="text-gray-700 text-sm text-right">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "THB",
              }).format(project.price)}
            </p>
          )}
          <Dialog>
            <DialogTrigger asChild>
              <Link href={`/projects?project_name=${project.project_name}`}>
                <Button variant="outline">Edit</Button>
              </Link>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit project</DialogTitle>
                <DialogDescription>
                  Make changes to your project here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <form action={saveChangesWithProjectName}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="projectName" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="projectName"
                      name="projectName"
                      defaultValue={project.project_name}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="projectDetail" className="text-right">
                      Detail
                    </Label>
                    <Textarea
                      id="projectDetail"
                      name="projectDetail"
                      defaultValue={project.detail!}
                      className="col-span-3"
                    ></Textarea>
                  </div>
                </div>
                <div className="flex justify-end">
                  <DialogClose asChild>
                    <Button type="submit">Save changes</Button>
                  </DialogClose>
                </div>
              </form>
              <DialogFooter>
                {searchParams?.message && (
                  <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                    {searchParams.message}
                  </p>
                )}
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  );
}
