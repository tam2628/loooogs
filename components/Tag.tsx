import classNames from "classnames";
import React from "react";

type TagProps = {
  text: string;
};

export const Tag = React.forwardRef<
  HTMLSpanElement,
  React.HTMLProps<HTMLSpanElement> & TagProps
>((props, ref) => (
  <span
    className={classNames(
      "p-1",
      "rounded",
      "bg-slate-200",
      props.className,
      "text-xs"
    )}
  >
    {props.text}
  </span>
));

Tag.displayName = "Tag";
