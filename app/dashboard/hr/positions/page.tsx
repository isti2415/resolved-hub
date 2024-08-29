import { ContentLayout } from "@/components/admin-panel/content-layout";
import { DataTable } from "@/components/data-table";
import CreateDepartmentForm from "./create-position";
import { columns } from "./table";
import { RecordModel } from "pocketbase";
import { getAllPositions } from "@/actions/hrms/position";

async function Positions() {
  const result = await getAllPositions();

  let positions: RecordModel[] = [];
  if (result.success && Array.isArray(result.data)) {
    positions = result.data;
  }

  return (
    <ContentLayout>
      <div className="flex flex-col items-center w-full gap-4">
        <div className="flex items-center gap-4 justify-between w-full">
          <h1 className="text-lg font-bold">Position List</h1>
          <CreateDepartmentForm />
        </div>
        {result.success ? (
          <DataTable data={positions} columns={columns} />
        ) : (
          <p>Error: {result.message}</p>
        )}
      </div>
    </ContentLayout>
  );
}

export default Positions;