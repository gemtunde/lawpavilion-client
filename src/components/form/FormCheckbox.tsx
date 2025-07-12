import {
  FormField,
  FormItem,
  FormControl,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldValues, Path, Control } from "react-hook-form";
import { ReactNode } from "react";

type FormCheckboxProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: ReactNode;
};

export function FormCheckbox<T extends FieldValues>({
  name,
  control,
  label,
}: FormCheckboxProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormItem className="flex  items-center justify-center space-x-2">
          <FormControl>
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked as boolean)}
              className="mt-3"
            />
          </FormControl>
          <div className=" flex-1 flex-col items-center sm:flex-row gap-2">
            <FormLabel
              htmlFor={name}
              className="text-sm text-gray-600 leading-relaxed"
            >
              {label}
            </FormLabel>
            <FormMessage>{fieldState.error?.message}</FormMessage>
          </div>
        </FormItem>
      )}
    />
  );
}
