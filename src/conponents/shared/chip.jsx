import React, { HtmlHTMLAttributes } from "react";
import "./reusable.css"

export const Chip = ({
    children,
    className,
    ...props
}) => {
    return (
        <span className={` chip ${className}`} {...props}>{children}</span>
    )
}