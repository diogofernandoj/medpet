import { Button } from "@/components/ui/button";
import { DataTable } from "./clients-table/data-table";
import { prismaClient } from "@/app/lib/prisma";
import { columns } from "./clients-table/columns";

const ClientsPage = async () => {
  const clients = await prismaClient.client.findMany({});

  return (
    <div className="lg:pl-80 pb-20 lg:pb-0">
      <div className="flex flex-col w-full mx-auto px-20 my-20 gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Clientes</h2>
          <Button variant="ghost" className="text-primary">
            Novo cliente
          </Button>
        </div>
        <DataTable data={clients} columns={columns} />
      </div>
    </div>
  );
};

export default ClientsPage;
