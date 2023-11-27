import { cn } from "@/lib/utils";
import _CurrencyInput, { CurrencyInputProps } from "react-currency-input-field";

function CurrencyInput({ className, ...props }: CurrencyInputProps) {
  const inputClassName = cn(
    className,
    "rounded-lg border border-gray-300 bg-white p-2 text-sm outline-none transition-all focus:ring-1 focus:ring-primary"
  );

  return (
    <_CurrencyInput
      lang="pt-BR"
      className={inputClassName}
      intlConfig={{ locale: "pt-BR", currency: "BRL" }}
      {...props}
    />
  );
}

export default CurrencyInput;
