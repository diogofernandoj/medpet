"use client";

import { useContext } from "react";
import { columns } from "../transactions/columns";
import { DataTable } from "../transactions/data-table";
import { DateRangeContext } from "@/app/providers/date-range";

const DataTableWrapper = () => {
  const { transactions } = useContext(DateRangeContext);

  return <DataTable columns={columns} data={transactions} />;
};

export default DataTableWrapper;
