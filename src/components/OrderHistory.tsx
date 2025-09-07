import { MobileCard } from "@/components/MobileCard";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, Package, AlertCircle } from "lucide-react";

interface Order {
  id: number;
  farmerName: string;
  quantity: number;
  notes: string;
  status: "pending" | "confirmed" | "delivered";
  date: string;
}

interface OrderHistoryProps {
  orders: Order[];
  onBack: () => void;
}

export function OrderHistory({ orders, onBack }: OrderHistoryProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4 text-app-warning" />;
      case "confirmed":
        return <CheckCircle className="w-4 h-4 text-app-success" />;
      case "delivered":
        return <Package className="w-4 h-4 text-primary" />;
      default:
        return <AlertCircle className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-app-warning";
      case "confirmed":
        return "text-app-success";
      case "delivered":
        return "text-primary";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          ←
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Order History</h1>
      </div>

      {orders.length === 0 ? (
        <MobileCard className="text-center py-12">
          <div className="text-muted-foreground">
            <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No orders placed yet</p>
            <p className="text-sm">Create your first order to see it here</p>
          </div>
        </MobileCard>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <MobileCard key={order.id}>
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {getStatusIcon(order.status)}
                      <h3 className="font-semibold text-foreground">{order.farmerName}</h3>
                    </div>
                    <p className="text-lg font-bold text-foreground">
                      {order.quantity} dozen{order.quantity !== 1 ? "s" : ""}
                    </p>
                    {order.notes && (
                      <p className="text-sm text-muted-foreground mt-1">{order.notes}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-medium capitalize ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatDate(order.date)}
                </div>
              </div>
            </MobileCard>
          ))}
        </div>
      )}
    </div>
  );
}