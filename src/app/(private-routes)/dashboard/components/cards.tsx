"use client";

import { DateRangeContext } from "@/app/providers/date-range";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DollarSignIcon, ScaleIcon } from "lucide-react";
import { useContext } from "react";

const Cards = () => {
  const { earnings, expenses, balance } = useContext(DateRangeContext);

  return (
    <div className="grid grid-cols-3 px-2 lg:px-5 -mb-14 gap-2 mt-4">
      <Card className="shadow-lg">
        <CardHeader>
          <DollarSignIcon
            size={18}
            className="bg-green-300 bg-opacity-30 p-2 h-8 w-8 text-green-500 rounded-lg mx-auto lg:mx-0 lg:h-10 lg:w-10"
          />
        </CardHeader>
        <CardContent className="flex flex-col items-center lg:items-start lg:px-6 px-2">
          <p className="text-xs text-gray-400 lg:text-sm">Entradas</p>
          <p className="text-sm lg:text-xl font-bold text-gray-700">
            +
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(earnings)}
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-lg">
        <CardHeader>
          <DollarSignIcon
            size={18}
            className="bg-red-300 bg-opacity-30 p-2 h-8 w-8 text-red-500 mx-auto rounded-lg lg:mx-0 lg:h-10 lg:w-10"
          />
        </CardHeader>
        <CardContent className="flex flex-col items-center lg:items-start lg:px-6 px-2">
          <p className="text-xs text-gray-400 lg:text-sm">Saídas</p>
          <p className="text-sm lg:text-xl font-bold text-gray-700">
            -
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(expenses)}
          </p>
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
          <p className="text-sm lg:text-xl font-bold text-gray-700">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(balance)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Cards;
