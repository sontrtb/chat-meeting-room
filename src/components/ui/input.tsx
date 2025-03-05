import * as React from "react"

import { cn } from "@/lib/utils"
import { Eye, EyeOff, Upload } from "lucide-react"
import { uploadFiles } from "@/api/upload-files"
import { Button } from "./button"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        style={{marginTop: "3px"}}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-card px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

const PasswordInput = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };

    return (
      <div className="relative w-full">
        <input
          type={showPassword ? "text" : "password"}
          style={{marginTop: "3px"}}
          className={cn(
            "flex h-10 w-full rounded-md border border-input bg-card px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pr-10",
            className
          )}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={togglePasswordVisibility}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

interface IInputFile {
  value?: string;
  className?: string;
  placeholder?: string;
  onChange?: (link?: string) => void;
  disabled?: boolean;
}

function InputFile({
  value,
  className,
  placeholder,
  onChange,
  disabled,
}: IInputFile) {
  const [fileName, setFileName] = React.useState(value);
  const [isLoading, setIsLoading] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (onChange) {
        setIsLoading(true);
        uploadFiles(file)
          .then((res) => {
            onChange?.(res.data);
            setFileName(res.data);
          })
          .finally(() => {
            setIsLoading(false);
          });
      }
    }
  };

  return (
    <div style={{marginTop: "0px"}} className={cn("flex items-center gap-2", className)}>
      <Button
        disabled={disabled}
        type="button"
        variant="outline"
        className="w-[120px]  mt-1"
        onClick={handleClick}
        isLoading={isLoading}
      >
        <Upload className="mr-2 h-4 w-4" />
        Upload
      </Button>
      <Input
        disabled={disabled}
        ref={inputRef}
        type="file"
        className="hidden"
        onChange={handleUpload}
      />
      <Input
        disabled={disabled}
        readOnly
        placeholder={placeholder}
        value={fileName}
        className="cursor-default"
      />
    </div>
  );
}

export { Input, PasswordInput, InputFile }
