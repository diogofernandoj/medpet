import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import CalendarDateRangePicker from "./components/date-range-picker";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="lg:pl-80">
      <div className="flex flex-col">
        <div className="flex items-center mt-4 px-5 gap-2 justify-between">
          <h1 className="font-semibold text-xl lg:text-2xl text-gray-800">
            Dashboard
          </h1>
          <CalendarDateRangePicker />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
