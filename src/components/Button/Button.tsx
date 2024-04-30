import { cn } from "@/lib/utils/helperFunctions";
import * as React from "react";
import { Link, LinkProps } from "react-router-dom";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof buttonVariants;
  fullWidth?: boolean;
  isLoading?: boolean;
};

export type LinkButtonProps = LinkProps & {
  variant?: keyof typeof buttonVariants;
  fullWidth?: boolean;
};

const buttonVariants = {
  white: "bg-white text-black active:bg-gray-100",
  whiteOutlined:
    "bg-transparent hover:bg-gray-800 bg-opacity-20 text-white border border-white active:text-white active:border-white",
  primary: "bg-primary active:text-primaryDarkerer",
  secondary: "bg-secondary",
  danger: "bg-danger text-white",
  primaryOutlined:
    "bg-transparent hover:bg-gray-800 bg-opacity-20 text-primary border border-primary active:text-primaryDarker acitve:border-primaryDarker",
  secondaryOutlined:
    "bg-white border border-secondary text-secondary active:text-primaryDarker",
  text: "shadow-none text-primary bg-transparent active:text-primaryDarker",
  textDanger: "shadow-none text-danger bg-transparent active:brightness-75",
};

const buttonVariantsDisabled = {
  white: "disabled:opacity-70",
  whiteOutlined: "disabled:opacity-70",
  primary: "disabled:opacity-70",
  secondary: "disabled:bg-gray-300 disabled:text-gray-400",
  danger: "disabled:bg-danger/50",
  primaryOutlined:
    "disabled:bg-transparent disabled:border-[#A1A1A1] disabled:text-[#A1A1A1]",
  secondaryOutlined: "disabled:bg-transparent disabled:text-secondary",
  text: "disabled:bg-transparent disabled:text-[#A1A1A1]",
  textDanger: "disabled:bg-transparent disabled:text-danger/60",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      isLoading,
      fullWidth,
      variant = "white",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          "h-10 shadow-sm whitespace-nowrap rounded-lg px-8 py-4 disabled:pointer-events-none text-white font-semibold active:scale-95 flex justify-center items-center gap-2",
          buttonVariants[variant],
          buttonVariantsDisabled[variant],
          fullWidth ? "w-full" : "",
          className
        )}
        ref={ref}
        type="button"
        disabled={isLoading || disabled}
        {...props}
      >
        {/* {isLoading && (
          <ClipLoader color="currentColor" loading={isLoading} size={16} />
        )} */}
        {children}
      </button>
    );
  }
);

export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, fullWidth, variant = "primary", ...props }, ref) => {
    return (
      <Link
        className={cn(
          "shadow-sm whitespace-nowrap rounded-lg px-8 py-4 disabled:cursor-not-allowed text-white font-semibold",
          buttonVariants[variant],
          buttonVariantsDisabled[variant],
          fullWidth ? "w-full" : "",
          className
        )}
        ref={ref}
        {...props}
      >
        {props.children}
      </Link>
    );
  }
);
