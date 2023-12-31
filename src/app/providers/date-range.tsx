"use client";

import { Transaction } from "@prisma/client";
import { ReactNode, createContext, useEffect, useState } from "react";
import { getUserTransactions } from "../(private-routes)/dashboard/_actions/user-balance";

interface IDateRangeContext {
  transactions: Transaction[];
  setTransactions: (data: any) => void;
  profit: number;
  prejudice: number;
  earnings: number;
  expenses: number;
  balance: number;
  setRevalidateTransactions: (prev: (prev: number) => number) => void;
}

export const DateRangeContext = createContext<IDateRangeContext>({
  transactions: [],
  setTransactions: () => {},
  profit: 0,
  prejudice: 0,
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

  const profit = transactions.length
    ? transactions
        .filter((transaction) => transaction.type === "EARNING")
        .reduce((acc, curr) => acc + Number(curr.amount), 0)
    : 0;

  const prejudice = transactions.length
    ? transactions
        .filter((transaction) => transaction.type === "EXPENSE")
        .reduce((acc, curr) => acc + Number(curr.amount), 0)
    : 0;

  const earnings = transactions.length
    ? transactions
        .filter(
          (transaction) => transaction.type === "EARNING" && transaction.status
        )
        .reduce((acc, curr) => acc + Number(curr.amount), 0)
    : 0;

  const expenses = transactions.length
    ? transactions
        .filter(
          (transaction) => transaction.type === "EXPENSE" && transaction.status
        )
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

      transactions?.sort((a, b) => Number(b.date) - Number(a.date));

      setTransactions(transactions!);
    };
    getUserInfo();
  }, [revalidateTransactions]);

  return (
    <DateRangeContext.Provider
      value={{
        transactions,
        setTransactions,
        profit,
        prejudice,
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
