import { HtmlHTMLAttributes } from "react";

export const Wrapper: React.FC<HtmlHTMLAttributes<HTMLDivElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={`${className}`} {...props} style={{
      width: "100vw",
      height: "100%",
      padding: "40px"
    }}>
      {children}
    </div>
  );
};
