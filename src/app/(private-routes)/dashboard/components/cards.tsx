"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DollarSignIcon, ScaleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import CalendarDateRangePicker from "./date-range-picker";
import { DateRange } from "react-day-picker";

const Cards = ({ userId }: { userId: string | undefined }) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(),
  });

  const getUserEarnings = async () => {
    const response = await fetch(`/api/user/${userId}/transactions`, {
      method: "POST",
      body: JSON.stringify({
        userId,
        startDate: date?.from,
        endDate: date?.to,
        type: "EARNING",
      }),
    });

    const res = await response.json();

    const earnings = res.reduce(
      (acc: any, curr: any) => acc + Number(curr.amount),
      0
    );

    setUserEarnings(earnings);
  };
  const getUserExpenses = async () => {
    const response = await fetch(`/api/user/${userId}/transactions`, {
      method: "POST",
      body: JSON.stringify({
        userId,
        startDate: date?.from,
        endDate: date?.to,
        type: "EXPENSE",
      }),
    });

    const res = await response.json();

    const expenses = res.reduce(
      (acc: any, curr: any) => acc + Number(curr.amount),
      0
    );

    setUserExpenses(expenses);
  };

  const getUserTransactions = async () => {
    await Promise.all([getUserEarnings(), getUserExpenses()]);
  };

  useEffect(() => {
    getUserTransactions();
  }, []);

  const [userEarnings, setUserEarnings] = useState(0);
  const [userExpenses, setUserExpenses] = useState(0);

  const userBalance = () => {
    return userEarnings - userExpenses;
  };

  return (
    <div className="flex flex-col bg-primary">
      <div className="flex items-center mt-4 px-5 gap-2 justify-between">
        <h1 className="font-semibold text-xl lg:text-2xl text-white">
          Dashboard
        </h1>
        <CalendarDateRangePicker
          date={date}
          setDate={setDate}
          getUserTransactions={getUserTransactions}
        />
      </div>
      <div className="grid grid-cols-3 px-2 -mb-14 gap-2 mt-4">
        <Card className="shadow-lg" onClick={getUserEarnings}>
          <CardHeader>
            <DollarSignIcon
              size={18}
              className="bg-green-300 bg-opacity-30 p-2 h-8 w-8 text-green-500 rounded-lg mx-auto lg:mx-0 lg:h-10 lg:w-10"
            />
          </CardHeader>
          <CardContent className="flex flex-col items-center lg:items-start lg:px-6 px-2">
            <p className="text-xs text-gray-400 lg:text-sm">Entradas</p>
            <p className="text-sm lg:text-xl font-bold">+R${userEarnings}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg" onClick={getUserExpenses}>
          <CardHeader>
            <DollarSignIcon
              size={18}
              className="bg-red-300 bg-opacity-30 p-2 h-8 w-8 text-red-500 mx-auto rounded-lg lg:mx-0 lg:h-10 lg:w-10"
            />
          </CardHeader>
          <CardContent className="flex flex-col items-center lg:items-start lg:px-6 px-2">
            <p className="text-xs text-gray-400 lg:text-sm">Saídas</p>
            <p className="text-sm lg:text-xl font-bold">-R${userExpenses}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between">
            <ScaleIcon
              size={18}
              className="bg-blue-300 lg:h-10 lg:w-10 bg-opacity-30 p-2 h-8 w-8 text-blue-500 rounded-lg mx-auto lg:mx-0"
            />
          </CardHeader>
          <CardContent className="flex flex-col items-center lg:items-start lg:px-6 px-2">
            <p className="text-xs lg:text-sm text-gray-400">Saldo</p>
            <p className="text-sm lg:text-xl font-bold">R${userBalance()}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cards;
