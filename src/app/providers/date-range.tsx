"use client";

import { Transaction } from "@prisma/client";
import { ReactNode, createContext, useEffect, useState } from "react";
import { DateRange } from "react-day-picker";

interface IDateRangeContext {
  date: DateRange | undefined;
  setDate: (date: DateRange | undefined) => void;
  transactions: Transaction[];
  earnings: number;
  expenses: number;
  balance: number;
  getUserInfo: () => void;
}

export const DateRangeContext = createContext<IDateRangeContext>({
  date: {
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  },
  setDate: () => {},
  transactions: [],
  earnings: 0,
  expenses: 0,
  balance: 0,
  getUserInfo: async () => {},
});

interface DateRangeProviderProps {
  children: ReactNode;
  userId: string | undefined;
}

const DateRangeProvider = ({ children, userId }: DateRangeProviderProps) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  });

  const [transactions, setTransactions] = useState([]);
  const [earnings, setEarnings] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const balance = earnings - expenses;

  const getUserTransactions = async () => {
    const response = await fetch(`/api/user/${userId}/transactions`, {
      method: "POST",
      body: JSON.stringify({
        userId,
        startDate: date?.from,
        endDate: `${date?.to?.toISOString() || date?.from?.toISOString()}`,
      }),
    });

    const transactions = await response.json();

    setTransactions(transactions);
  };

  const getUserEarnings = async () => {
    const response = await fetch(`/api/user/${userId}/transactions`, {
      method: "POST",
      body: JSON.stringify({
        userId,
        startDate: date?.from,
        endDate: `${date?.to?.toISOString() || date?.from?.toISOString()}`,
        type: "EARNING",
      }),
    });

    const res = await response.json();

    const earnings = res.reduce(
      (acc: any, curr: any) => acc + Number(curr.amount),
      0
    );

    setEarnings(earnings);
  };

  const getUserExpenses = async () => {
    const response = await fetch(`/api/user/${userId}/transactions`, {
      method: "POST",
      body: JSON.stringify({
        userId,
        startDate: date?.from,
        endDate: `${date?.to?.toISOString() || date?.from?.toISOString()}`,
        type: "EXPENSE",
      }),
    });

    const res = await response.json();

    const expenses = res.reduce(
      (acc: any, curr: any) => acc + Number(curr.amount),
      0
    );

    setExpenses(expenses);
  };

  const getUserInfo = async () => {
    await Promise.all([
      getUserTransactions(),
      getUserEarnings(),
      getUserExpenses(),
    ]);
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <DateRangeContext.Provider
      value={{
        date,
        setDate,
        transactions,
        earnings,
        expenses,
        balance,
        getUserInfo,
      }}
    >
      {children}
    </DateRangeContext.Provider>
  );
};

export default DateRangeProvider;
