import UserForm from "./components/user-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { Separator } from "@/components/ui/separator";
import ChangePasswordForm from "./components/change-password-form";

const SettingsPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const {
    user: { id, name, email },
  } = session;

  return (
    <div className="lg:pl-80 pb-20 lg:pb-0">
      <div className="px-20 my-12 flex flex-col gap-12">
        <div className="flex flex-col">
          <h2 className="font-semibold text-3xl">Perfil do usuário</h2>
          <p className="text-gray-400 text-sm">
            Acesse e/ou edite as informações do usuário.
          </p>
        </div>
        <div className="max-w-[900px] flex flex-col gap-6">
          <UserForm user={{ id, name, email }} />
          <Separator />
          <ChangePasswordForm />
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
