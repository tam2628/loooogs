import classNames from "classnames";
import React from "react";

type InputProps = {
  isInvalid?: boolean;
};

export const Input = React.forwardRef<
  HTMLInputElement,
  React.HTMLProps<HTMLInputElement> & InputProps
>((props, ref) => (
  <input
    {...props}
    ref={ref}
    className={classNames(
      "p-2",
      "bg-white",
      "rounded",
      "border-solid",
      "w-full",
      "border",
      { "border-slate-400": !props.isInvalid },
      { "border-rose-400": props.isInvalid },
      props.className
    )}
  />
));

Input.displayName = "Input";
