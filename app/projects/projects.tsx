
export default async function Projects({ searchParams }: { searchParams: { message: string } }) {

  return (
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
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit project</DialogTitle>
                <DialogDescription>
                  Make changes to your project here. Click save when you're done.
                </DialogDescription>
              </DialogHeader>
              <form action={saveChanges}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="projectName" className="text-right">
                      Name
                    </Label>
                    <Input id="projectName" name="projectName" defaultValue={project.project_name} className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="projectDetail" className="text-right">
                      Detail
                    </Label>
                    <Textarea id="projectDetail" name="projectDetail" defaultValue={project.detail} className="col-span-3"></Textarea>
                  </div>
                </div>
                <Button>Save changes</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      ))}

    </div>
  );
}