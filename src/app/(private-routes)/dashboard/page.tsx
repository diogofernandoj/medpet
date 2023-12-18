import { getServerSession } from "next-auth";
import Cards from "./components/cards";
import { authOptions } from "@/app/lib/auth";
import DateRangeProvider from "@/app/providers/date-range";
import { DataTable } from "./transactions/data-table";
import { columns } from "./transactions/columns";
import { prismaClient } from "@/app/lib/prisma";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  const transactions = await prismaClient.transaction.findMany({
    where: { user_id: session?.user.id },
  });

  return (
    <div className="lg:pl-80 pb-20 lg:pb-0">
      <DateRangeProvider userId={session?.user.id}>
        <Cards />
        <div className="mt-20 px-1 lg:px-5">
          <DataTable columns={columns} data={transactions} />;
        </div>
      </DateRangeProvider>
    </div>
  );
};

export default Dashboard;
