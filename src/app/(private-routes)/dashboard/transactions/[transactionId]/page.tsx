import TransactionForm from "../../components/transaction-form";
import { prismaClient } from "@/app/lib/prisma";
import BackButton from "@/components/back-button";

const TransactionDetailsPage = async ({
  params,
}: {
  params: { transactionId: string };
}) => {
  const transaction = await prismaClient.transaction.findFirst({
    where: {
      id: params.transactionId,
    },
  });

  if (!transaction) {
    return null;
  }
  const {
    title,
    amount,
    client_id,
    notes,
    payment,
    payment_date,
    status,
    type,
  } = transaction;

  return (
    <div className="lg:pl-80 pb-20 lg:pb-0">
      <div className="px-16 py-4">
        <div className="flex -ml-5 mt-6">
          <BackButton />
          <div className="flex flex-col mb-8">
            <h2 className="font-semibold text-lg">Detalhes da transação</h2>
            <p className="text-gray-400 text-sm">
              Acesse e/ou edite as informações da transação.
            </p>
          </div>
        </div>
        <div className="max-w-[900px]">
          <TransactionForm
            transactionId={params.transactionId}
            data={{
              title,
              type,
              payment,
              amount: Number(amount),
              notes,
              payment_date,
              client_id: client_id || undefined,
              status,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionDetailsPage;
