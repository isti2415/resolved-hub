import { ContentLayout } from "@/components/admin-panel/content-layout";
import { DataTable } from "@/components/data-table";
import CreateDepartmentForm from "./create-department";
import { columns } from "./table";
import { getAllDepartments } from "@/actions/hrms/department";
import { RecordModel } from "pocketbase";

async function Departments() {
  const result = await getAllDepartments();

  let departments: RecordModel[] = [];
  if (result.success && Array.isArray(result.data)) {
    departments = result.data;
  }

  return (
    <ContentLayout>
      <div className="flex flex-col items-center w-full gap-4">
        <div className="flex items-center gap-4 justify-between w-full">
          <h1 className="text-lg font-bold">Department List</h1>
          <CreateDepartmentForm />
        </div>
        {result.success ? (
          <DataTable data={departments} columns={columns} />
        ) : (
          <p>Error: {result.message}</p>
        )}
      </div>
    </ContentLayout>
  );
}

export default Departments;