import { Input } from "@/components/ui/input";
import { PatternFormat, PatternFormatProps } from "react-number-format";

const DocumentInput = (props: Partial<PatternFormatProps>) => {
  return (
    <PatternFormat
      {...props}
      format="###.###.###-##"
      customInput={Input}
      placeholder="000.000.000-00"
    />
  );
};

export default DocumentInput;
