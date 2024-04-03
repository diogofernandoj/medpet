import DateRangeProvider from "@/app/providers/date-range";
import { DataTable } from "./transactions/data-table";
import UserBalance from "./components/user-balance";
import { Toaster } from "@/components/ui/toaster";

const DashboardPage = async () => {
  return (
    <div className="lg:pl-80 pb-20 lg:pb-0">
      <Toaster />
      <DateRangeProvider>
        <UserBalance />
        <div className="mt-20 px-1 lg:px-5">
          <DataTable />
        </div>
      </DateRangeProvider>
    </div>
  );
};

export default DashboardPage;
