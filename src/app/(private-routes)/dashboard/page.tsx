import { getServerSession } from "next-auth";
import Cards from "./components/cards";
import { authOptions } from "@/app/lib/auth";
import DateRangeProvider from "@/app/providers/date-range";
import DataTableWrapper from "./components/data-table-wrapper";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="lg:px-80">
      <DateRangeProvider userId={session?.user.id}>
        <Cards />
        <div className="mt-20 px-1 lg:px-5">
          <DataTableWrapper />
        </div>
      </DateRangeProvider>
    </div>
  );
};

export default Dashboard;
