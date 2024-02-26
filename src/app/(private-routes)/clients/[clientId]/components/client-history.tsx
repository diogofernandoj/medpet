import { getClientTransactions } from "../../_actions/get-client-transactions";
import { columns } from "../../history/columns";
import { DataTable } from "../../history/data-table";

const ClientHistory = async ({ clientId }: { clientId: string }) => {
  const res = await getClientTransactions({ clientId });
  const data = res?.transactions || [];

  return (
    <div className="flex flex-col gap-8">
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default ClientHistory;
