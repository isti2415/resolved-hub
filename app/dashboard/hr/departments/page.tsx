import { ContentLayout } from "@/components/admin-panel/content-layout";
import { DataTable } from "@/components/data-table";
import React from "react";
import { columns } from "./table";
import { createBrowserClient } from "@/lib/pocketbase";

async function Departments() {

    const pb = createBrowserClient()

    const records = await pb.collection('Departments').getFullList({
        sort: '-created',
    });

  return (
    <ContentLayout>
      <DataTable data={records} columns={columns}/>
    </ContentLayout>
  );
}

export default Departments;
