import { ReactNode } from "react";

interface MobileCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MobileCard({ children, className = "", onClick }: MobileCardProps) {
  return (
    <div 
      className={`bg-gradient-card rounded-xl p-4 shadow-mobile border border-border hover:shadow-card transition-all duration-300 ${onClick ? 'cursor-pointer hover:scale-102' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}