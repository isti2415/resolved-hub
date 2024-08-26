import { ContentLayout } from "@/components/admin-panel/content-layout";
import { DataTable } from "@/components/data-table";
import { createBrowserClient } from "@/lib/pocketbase";
import CreateDepartmentForm from "./(create-department)/form";
import { columns } from "./table";

async function Departments() {
  const pb = createBrowserClient();
  const records = await pb.collection('Departments').getFullList({
    sort: '-created',
  });

  return (
    <ContentLayout>
      <div className="flex flex-col items-center w-full gap-4">
        <div className="flex items-center gap-4 justify-between w-full">
          <h1 className="text-lg font-bold">Department List</h1>
          <CreateDepartmentForm />
        </div>
        <DataTable data={records} columns={columns} />
      </div>
    </ContentLayout>
  );
}

export default Departments;