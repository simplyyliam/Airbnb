import React, { HtmlHTMLAttributes } from "react";
import "./reusable.css"

export const Chip: React.FC<HtmlHTMLAttributes<HTMLSpanElement>> = ({
    children,
    className,
    ...props
}) => {
    return (
        <span className={` chip ${className}`} {...props}>{children}</span>
    )
}