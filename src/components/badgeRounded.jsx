import React from "react";

export default function BadgeRounded({ className, color, children }) {
  const classWithColor = `badge rounded-pill text-bg-${color}`;
  const defaultClassName = "badge rounded-pill text-bg-primary";

  return (
    <span className={color && classWithColor || className || defaultClassName}>
      {children}
    </span>
  );
}
