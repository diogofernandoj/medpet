import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
import SignoutButton from "./components/signout-button";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <p>Olá {session?.user.name}, seja bem-vindo!</p>
      <SignoutButton />
    </div>
  );
};

export default Dashboard;
