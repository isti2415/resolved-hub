import { ContentLayout } from "@/components/admin-panel/content-layout";
import { DataTable } from "@/components/data-table";
import CreateEmployeeForm from "./create-employee";
import { columns } from "./table";
import { getAllEmployees } from "@/actions/hrms/employee";
import { RecordModel } from "pocketbase";

async function Employees() {
  const result = await getAllEmployees();

  let employees: RecordModel[] = [];
  if (result.success && Array.isArray(result.data)) {
    employees = result.data;
  }

  return (
    <ContentLayout>
      <div className="flex flex-col items-center w-full gap-4">
        <div className="flex items-center gap-4 justify-between w-full">
          <h1 className="text-lg font-bold">Employee List</h1>
          <CreateEmployeeForm />
        </div>
        {result.success ? (
          <DataTable data={employees} columns={columns} />
        ) : (
          <p>Error: {result.message}</p>
        )}
      </div>
    </ContentLayout>
  );
}

export default Employees;