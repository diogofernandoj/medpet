import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionForm from "./transaction-form";

const AddTransaction = () => {
  return (
    <Tabs defaultValue="transaction">
      <TabsList className="w-full flex items-center bg-gray-200">
        <TabsTrigger value="transaction" className="flex-1">
          Transação
        </TabsTrigger>
        <TabsTrigger value="client" className="flex-1">
          Cliente
        </TabsTrigger>
      </TabsList>
      <TabsContent value="transaction">
        <TransactionForm />
      </TabsContent>
      <TabsContent value="client">Buscar cliente</TabsContent>
    </Tabs>
  );
};

export default AddTransaction;
