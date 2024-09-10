import { ContentLayout } from "@/components/admin-panel/content-layout";
import { DataTable } from "@/components/data-table";
import CreateSupplierForm from "./create-suppiers";
import { columns } from "./table";
import { RecordModel } from "pocketbase";
import { getAllSuppliers } from "@/actions/purchase/supplier";

async function Suppliers() {
  const result = await getAllSuppliers();

  let categories: RecordModel[] = [];
  if (result.success && Array.isArray(result.data)) {
    categories = result.data;
  }

  return (
    <ContentLayout>
      <div className="flex flex-col items-center w-full gap-4">
        <div className="flex items-center gap-4 justify-between w-full">
          <h1 className="text-lg font-bold">Supplier List</h1>
          <CreateSupplierForm />
        </div>
        {result.success ? (
          <DataTable data={categories} columns={columns} />
        ) : (
          <p>Error: {result.message}</p>
        )}
      </div>
    </ContentLayout>
  );
}

export default Suppliers;