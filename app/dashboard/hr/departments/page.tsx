"use client"

import { ContentLayout } from "@/components/admin-panel/content-layout";
import { DataTable } from "@/components/data-table";
import React, { useEffect, useState, useCallback } from "react";
import { columns } from "./table";
import { createBrowserClient } from "@/lib/pocketbase";
import CreateDepartmentForm from "./(create-department)/form";
import { RecordModel } from "pocketbase";

function Departments() {
  const [records, setRecords] = useState<RecordModel[]>([]);
  const pb = createBrowserClient();

  const fetchDepartments = useCallback(async () => {
    try {
      const fetchedRecords = await pb.collection('Departments').getFullList({
        sort: '-created',
      });
      setRecords(fetchedRecords);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  }, [pb]);

  useEffect(() => {
    fetchDepartments();

    let unsubscribe: (() => void) | null = null;

    const setupSubscription = async () => {
      unsubscribe = await pb.collection('Departments').subscribe('*', function(e) {
        if (e.action === 'create') {
          setRecords(prevRecords => {
            // Check if the record already exists to prevent double addition
            if (!prevRecords.some(record => record.id === e.record.id)) {
              return [e.record, ...prevRecords];
            }
            return prevRecords;
          });
        } else if (e.action === 'update') {
          setRecords(prevRecords => 
            prevRecords.map(record => 
              record.id === e.record.id ? e.record : record
            )
          );
        } else if (e.action === 'delete') {
          setRecords(prevRecords => 
            prevRecords.filter(record => record.id !== e.record.id)
          );
        }
      });
    };

    setupSubscription();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [pb, fetchDepartments]);

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