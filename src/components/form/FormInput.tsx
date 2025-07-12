import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  placeholder?: string;
  control: Control<T>;
  type?: string;
  className?: string;
};

export function FormInput<T extends FieldValues>({
  name,
  label,
  placeholder,
  control,
  type = "text",
  className,
}: FormInputProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div className="space-y-2">
          <Label htmlFor={name}>{label}</Label>
          <Input
            id={name}
            placeholder={placeholder}
            type={type}
            {...field}
            className={`h-11 ${
              fieldState.error ? "border-red-500" : ""
            } ${className}`}
          />
          {fieldState.error && (
            <p className="text-sm text-red-600">{fieldState.error.message}</p>
          )}
        </div>
      )}
    />
  );
}
