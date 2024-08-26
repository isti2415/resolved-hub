import { RecordModel } from "pocketbase";

export type Result = {
    success: boolean;
    message?: string;
    data?: RecordModel[];
  };