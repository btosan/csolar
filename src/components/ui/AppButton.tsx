import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center rounded-lg text-sm xl:text-lg font-medium transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-gray-700 shadow-lg hover:shadow-xl active:scale-[0.98]",
        destructive: "bg-gradient-to-r from-red-500 to-rose-600 text-white hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl",
        outline: "border-2 border-primary bg-transparent hover:bg-primary/10 text-black",
        secondary: "bg-primary text-white hover:bg-gray-700 shadow-lg hover:shadow-xl active:scale-[0.98]",
        ghost: "bg-transparent hover:bg-accent/10 text-black",
        link: "bg-transparent underline-offset-4 hover:underline text-black p-0",
        glow: "bg-primary text-white hover:bg-gray-700 shadow-lg hover:shadow-xl animate-glow active:scale-[0.98]",
      },
      size: {
        default: "h-11 px-6 md:py-4 py-2",
        sm: "h-9 px-4 md:py-4 py-2 text-xs",
        lg: "h-12 px-8 md:py-4 py-3 text-base",
        icon: "h-11 w-11 p-2",
        full: "h-11 w-full px-6 md:py-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const AppButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-inherit ">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        )}
        <span className={isLoading ? "opacity-0" : " hover:cursor-pointer"}>{children}</span>
      </button>
    );
  }
);

AppButton.displayName = "AppButton";

export { AppButton, buttonVariants };