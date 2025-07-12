import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { FieldValues, Path, Control } from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

type FormSelectProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  options: Option[];
  className?: string;
};

export function FormSelect<T extends FieldValues>({
  name,
  control,
  label,
  placeholder = "Select...",
  options,
  className,
}: FormSelectProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              value={field.value}
              onValueChange={field.onChange}
              defaultValue={field.value}
            >
              <SelectTrigger
                className={`h-11 ${
                  fieldState.error ? "border-red-500" : ""
                } ${className}`}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage>{fieldState.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}
