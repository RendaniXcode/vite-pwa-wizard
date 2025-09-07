import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="group relative">
      <div className="absolute -inset-1 bg-gradient-feature rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
      <div className="relative bg-gradient-card p-6 rounded-lg shadow-card hover:shadow-feature transition-all duration-300 border border-border">
        <div className="w-12 h-12 bg-gradient-feature rounded-lg flex items-center justify-center mb-4 text-pwa-teal group-hover:text-pwa-cyan transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-lg font-semibold mb-2 text-foreground">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}