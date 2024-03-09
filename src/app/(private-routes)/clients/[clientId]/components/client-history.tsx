import AddTransactionButton from "@/app/(private-routes)/dashboard/components/add-transaction-button";
import { getClientTransactions } from "../../_actions/get-client-transactions";
import { columns } from "../../history/columns";
import { DataTable } from "../../history/data-table";

const ClientHistory = async ({ clientId }: { clientId: string }) => {
  const res = await getClientTransactions({ clientId });
  const data = res?.transactions || [];

  return (
    <div className="flex flex-col w-full mx-auto px-12 my-6 items-center">
      <div className="w-full relative">
        <div className="absolute right-8 top-8 z-10">
          <AddTransactionButton client_id={clientId} />
        </div>
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
};

export default ClientHistory;
