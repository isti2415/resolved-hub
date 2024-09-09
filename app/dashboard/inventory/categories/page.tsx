import { ContentLayout } from "@/components/admin-panel/content-layout";
import { DataTable } from "@/components/data-table";
import CreateCategoryForm from "./create-category";
import { columns } from "./table";
import { RecordModel } from "pocketbase";
import { getAllCategories } from "@/actions/ims/category";

async function Categories() {
  const result = await getAllCategories();

  let categories: RecordModel[] = [];
  if (result.success && Array.isArray(result.data)) {
    categories = result.data;
  }

  return (
    <ContentLayout>
      <div className="flex flex-col items-center w-full gap-4">
        <div className="flex items-center gap-4 justify-between w-full">
          <h1 className="text-lg font-bold">Category List</h1>
          <CreateCategoryForm />
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

export default Categories;