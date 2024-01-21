import { Input } from "@/components/ui/input";
import { PatternFormat, PatternFormatProps } from "react-number-format";

const PhoneInput = (props: Partial<PatternFormatProps>) => {
  return (
    <PatternFormat
      {...props}
      format="(##) #####-####"
      customInput={Input}
      placeholder="(99) 99999-9999"
    />
  );
};

export default PhoneInput;
