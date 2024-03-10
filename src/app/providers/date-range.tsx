"use client";

import { Client, Transaction } from "@prisma/client";
import { ReactNode, createContext, useEffect, useState } from "react";
import { getUserTransactions } from "../(private-routes)/dashboard/_actions/user-balance";

interface IDateRangeContext {
  transactions: Transaction[] & { client?: Client };
  setTransactions: (data: any) => void;
  profit: number;
  prejudice: number;
  earnings: number;
  expenses: number;
  balance: number;
  setRevalidateTransactions: (prev: (prev: number) => number) => void;
  startDate: Date | undefined;
  setStartDate: (date: any) => void;
  endDate: Date | undefined;
  setEndDate: (date: any) => void;
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
  startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  setStartDate: () => {},
  endDate: new Date(),
  setEndDate: () => {},
});

interface DateRangeProviderProps {
  children: ReactNode;
}

const DateRangeProvider = ({ children }: DateRangeProviderProps) => {
  const [transactions, setTransactions] = useState<
    Transaction[] & { client?: Client }
  >([]);

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

  const [startDate, setStartDate] = useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1)
  );
  const [endDate, setEndDate] = useState(new Date());

  useEffect(() => {
    const getUserInfo = async () => {
      const { transactions } = await getUserTransactions({
        startDate,
        endDate,
      });

      transactions?.sort(
        (a, b) => Number(b.payment_date) - Number(a.payment_date)
      );
      setTransactions(transactions!);
    };
    getUserInfo();
  }, [revalidateTransactions, startDate, endDate]);

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
        startDate,
        endDate,
        setStartDate,
        setEndDate,
      }}
    >
      {children}
    </DateRangeContext.Provider>
  );
};

export default DateRangeProvider;
