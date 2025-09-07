import { Sale } from "@/types";
import { MobileCard } from "@/components/MobileCard";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, XCircle } from "lucide-react";

interface SalesHistoryProps {
  sales: Sale[];
  onBack: () => void;
}

export function SalesHistory({ sales, onBack }: SalesHistoryProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          ←
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Sales History</h1>
      </div>

      {sales.length === 0 ? (
        <MobileCard className="text-center py-12">
          <div className="text-muted-foreground">
            <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No sales recorded yet</p>
            <p className="text-sm">Start recording sales to see them here</p>
          </div>
        </MobileCard>
      ) : (
        <div className="space-y-3">
          {sales.map((sale) => (
            <MobileCard key={sale.id}>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="w-4 h-4 text-app-success" />
                    <h3 className="font-semibold text-foreground">{sale.customerName}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{sale.customerPhone}</p>
                  <div className="flex items-center gap-4 text-sm mb-2">
                    <span className="text-muted-foreground">
                      {sale.quantity} dozen{sale.quantity !== 1 ? "s" : ""}
                    </span>
                    <span className="text-muted-foreground">
                      R{sale.pricePerDozen}/dozen
                    </span>
                  </div>
                  {sale.location && (
                    <p className="text-xs text-muted-foreground mb-2">
                      📍 {sale.location.neighborhood}, {sale.location.metro}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {formatDate(sale.date)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-app-success">
                    R{sale.total.toFixed(2)}
                  </p>
                </div>
              </div>
            </MobileCard>
          ))}
        </div>
      )}
    </div>
  );
}