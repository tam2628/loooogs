import classNames from "classnames";
import React, { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  isLoading?: boolean;
  loadingText?: string;
};

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & ButtonProps
>((props, ref) => (
  <button
    {...props}
    ref={ref}
    type={props.type || "button"}
    className={classNames(
      "py-2",
      "px-3",
      "bg-black",
      "rounded",
      "text-white",
      props.className
    )}
    disabled={props.isLoading}
  >
    {props.isLoading ? <span>{props.loadingText}</span> : props.children}
  </button>
));

Button.displayName = "button";
