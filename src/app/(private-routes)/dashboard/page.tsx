import Cards from "./components/cards";
import CalendarDateRangePicker from "./components/date-range-picker";

const Dashboard = async () => {
  return (
    <div className="lg:pl-80">
      <div className="flex flex-col bg-primary">
        <div className="flex items-center mt-4 px-5 gap-2 justify-between">
          <h1 className="font-semibold text-xl lg:text-2xl text-white">
            Dashboard
          </h1>
          <CalendarDateRangePicker />
        </div>
        <Cards />
      </div>
    </div>
  );
};

export default Dashboard;
