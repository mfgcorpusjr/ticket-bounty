import { ReactNode } from "react";
import { cn } from "cn";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Container({ children, className }: Props) {
  return (
    <div className={cn("container mx-auto px-4 sm:px-6 md:px-8", className)}>
      {children}
    </div>
  );
}
