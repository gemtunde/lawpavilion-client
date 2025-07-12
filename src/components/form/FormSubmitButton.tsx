// components/ui/FormSubmitButton.tsx
//import { useFormContext } from 'react-hook-form'
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

type FormSubmitButtonProps = {
  children: string;
  loadingText?: string;
  icon?: ReactNode;
  iconPosition?: "start" | "end";
  showSpinner?: boolean;
  isLoading?: boolean;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "sm" | "default" | "lg" | "icon";
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

export function FormSubmitButton({
  children,
  loadingText = "Submitting...",
  icon,
  iconPosition = "start",
  showSpinner = true,
  isLoading = false,
  className = "",
  variant = "default",
  size = "default",
  type = "submit",
}: FormSubmitButtonProps) {
  // const { formState } = useFormContext()

  // const isLoading = formState.isSubmitting

  return (
    <Button
      type={type}
      className={cn("w-full h-11", className)}
      disabled={isLoading}
      variant={variant}
      size={size}
    >
      {isLoading ? (
        <>
          {showSpinner && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {loadingText}
        </>
      ) : (
        <>
          {icon && iconPosition === "start" && (
            <span className="mr-2">{icon}</span>
          )}
          {children}
          {icon && iconPosition === "end" && (
            <span className="ml-2">{icon}</span>
          )}
        </>
      )}
    </Button>
  );
}
