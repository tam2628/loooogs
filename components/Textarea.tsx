import classNames from "classnames";
import React from "react";

type TextareaProps = {
  isInvalid?: boolean;
};

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.HTMLProps<HTMLTextAreaElement> & TextareaProps
>((props, ref) => (
  <textarea
    {...props}
    ref={ref}
    className={classNames(
      "p-2",
      "bg-white",
      "rounded",
      "border-solid",
      "border",
      { "border-slate-400": !props.isInvalid },
      { "border-rose-400": props.isInvalid },
      props.className
    )}
  />
));

Textarea.displayName = "Textarea";
