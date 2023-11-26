import { getServerSession } from "next-auth";
import Cards from "./components/cards";
import { authOptions } from "@/app/lib/auth";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  console.log({ session });

  return (
    <div className="lg:pl-80">
      <Cards userId={session?.user.id} />
    </div>
  );
};

export default Dashboard;
