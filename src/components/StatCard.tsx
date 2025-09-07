import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

export function StatCard({ title, value, icon, trend, trendUp, className = "" }: StatCardProps) {
  return (
    <div className={`bg-gradient-card rounded-xl p-4 shadow-mobile border border-border ${className}`}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          {trend && (
            <p className={`text-xs flex items-center gap-1 ${
              trendUp ? 'text-app-success' : 'text-destructive'
            }`}>
              <span>{trendUp ? '↗' : '↘'}</span>
              {trend}
            </p>
          )}
        </div>
        <div className="text-app-success text-2xl opacity-70">
          {icon}
        </div>
      </div>
    </div>
  );
}