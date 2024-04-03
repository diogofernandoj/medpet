import { Button } from "@/components/ui/button";
import { DataTable } from "./clients-table/data-table";
import { prismaClient } from "@/app/lib/prisma";
import { columns } from "./clients-table/columns";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { Toaster } from "@/components/ui/toaster";

const ClientsPage = async () => {
  const session = await getServerSession(authOptions);

  const clients = await prismaClient.client.findMany({
    where: {
      user_id: session?.user.id,
    },
  });
  clients.sort((a, b) => {
    const nameOne = a.name.toUpperCase();
    const nameTwo = b.name.toUpperCase();

    if (nameOne < nameTwo) {
      return -1;
    }
    if (nameOne > nameTwo) {
      return 1;
    }

    return 0;
  });

  return (
    <div className="lg:pl-80 pb-20 lg:pb-0">
      <Toaster />
      <div className="flex flex-col w-full mx-auto lg:px-20 px-4 my-20 gap-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Clientes</h2>
          <Link href="/clients/new-client">
            <Button variant="ghost" className="text-primary">
              Novo cliente
            </Button>
          </Link>
        </div>
        <DataTable data={clients} columns={columns} />
      </div>
    </div>
  );
};

export default ClientsPage;
