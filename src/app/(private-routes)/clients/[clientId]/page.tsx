import { prismaClient } from "@/app/lib/prisma";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientForm from "../components/client-form";
import ClientHistory from "./components/client-history";

const ClientDetailsPage = async ({
  params,
}: {
  params: { clientId: string };
}) => {
  const client = await prismaClient.client.findUnique({
    where: {
      id: params.clientId,
    },
  });

  if (!client) {
    return null;
  }

  return (
    <div className="lg:pl-80 pb-20 lg:pb-0">
      <Tabs defaultValue="client" className="p-4">
        <TabsList className="bg-white">
          <TabsTrigger value="client">Cliente</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>
        <TabsContent value="client">
          <div className="px-16 py-4">
            <div className="flex flex-col mb-8">
              <h2 className="font-semibold text-lg">Perfil do cliente</h2>
              <p className="text-gray-400 text-sm">
                Acesse e/ou edite as informações do cliente.
              </p>
            </div>
            <div className="max-w-[800px]">
              <ClientForm client={client} />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="history">
          <ClientHistory clientId={params.clientId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClientDetailsPage;
