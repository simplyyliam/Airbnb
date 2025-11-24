import { HtmlHTMLAttributes } from "react";



export const Box: React.FC<HtmlHTMLAttributes<HTMLDivElement>> = ({
    children,
    className,
    ...props
}) => {
    return (
        <div className={`${className}`} {...props} style={{
            display: "flex",
            flexDirection: "column",
            gap: "34px"
        }}>{children}</div>
    )
}