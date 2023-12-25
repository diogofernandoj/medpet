"use client";

import { Transaction } from "@prisma/client";
import { ReactNode, createContext, useEffect, useState } from "react";
import { getUserTransactions } from "../(private-routes)/dashboard/_actions/user-balance";

interface IDateRangeContext {
  transactions: Transaction[];
  setTransactions: (data: any) => void;
  earnings: number;
  expenses: number;
  balance: number;
  setRevalidateTransactions: (prev: (prev: number) => number) => void;
}

export const DateRangeContext = createContext<IDateRangeContext>({
  transactions: [],
  setTransactions: () => {},
  earnings: 0,
  expenses: 0,
  balance: 0,
  setRevalidateTransactions: () => {},
});

interface DateRangeProviderProps {
  children: ReactNode;
}

const DateRangeProvider = ({ children }: DateRangeProviderProps) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const earnings = transactions.length
    ? transactions
        .filter((transaction) => transaction.type === "EARNING")
        .reduce((acc, curr) => acc + Number(curr.amount), 0)
    : 0;

  const expenses = transactions.length
    ? transactions
        .filter((transaction) => transaction.type === "EXPENSE")
        .reduce((acc, curr) => acc + Number(curr.amount), 0)
    : 0;

  const balance = earnings - expenses;

  const [revalidateTransactions, setRevalidateTransactions] = useState(0);

  useEffect(() => {
    const startDate = new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      1
    );
    const endDate = new Date();

    const getUserInfo = async () => {
      const { transactions } = await getUserTransactions({
        startDate,
        endDate,
      });

      setTransactions(transactions!);
    };
    getUserInfo();
  }, [revalidateTransactions]);

  return (
    <DateRangeContext.Provider
      value={{
        transactions,
        setTransactions,
        earnings,
        expenses,
        balance,
        setRevalidateTransactions,
      }}
    >
      {children}
    </DateRangeContext.Provider>
  );
};

export default DateRangeProvider;
