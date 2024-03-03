import { ReactNode, useContext } from "react";
import { toggleTransactionStatus } from "../_actions/toggle-transaction-status";
import { DateRangeContext } from "@/app/providers/date-range";

interface ToggleStatusButtonProps {
  children: ReactNode;
  transactionId: string;
}

const ToggleStatusButton = ({
  children,
  transactionId,
}: ToggleStatusButtonProps) => {
  const { setRevalidateTransactions } = useContext(DateRangeContext);

  const handleStatusClick = () => {
    toggleTransactionStatus({ transactionId });
    setRevalidateTransactions((prev) => prev + 1);
  };

  return <button onClick={handleStatusClick}>{children}</button>;
};

export default ToggleStatusButton;
