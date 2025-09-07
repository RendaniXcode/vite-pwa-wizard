import { MobileCard } from "@/components/MobileCard";
import { Button } from "@/components/ui/button";
import { Clock, CheckCircle, Package, AlertCircle } from "lucide-react";

interface Order {
  id: number;
  farmerName: string;
  quantity: number;
  notes: string;
  status: "pending" | "confirmed" | "delivered" | "cancelled" | "paused";
  date: string;
}

interface OrderHistoryProps {
  orders: Order[];
  onBack: () => void;
  onUpdateOrder: (updatedOrder: Order) => void;
}

export function OrderHistory({ orders, onBack, onUpdateOrder }: OrderHistoryProps) {
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
      case "cancelled":
        return <AlertCircle className="w-4 h-4 text-destructive" />;
      case "paused":
        return <Clock className="w-4 h-4 text-orange-600" />;
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
      case "cancelled":
        return "text-destructive";
      case "paused":
        return "text-orange-600";
      default:
        return "text-muted-foreground";
    }
  };

  const handleStatusChange = (orderId: number, newStatus: "pending" | "confirmed" | "delivered" | "cancelled" | "paused") => {
    const orderToUpdate = orders.find(order => order.id === orderId);
    if (orderToUpdate) {
      const updatedOrder = { ...orderToUpdate, status: newStatus };
      onUpdateOrder(updatedOrder);
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
                  <div className="text-right space-y-2">
                    <div className={`flex items-center gap-1 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="text-sm font-medium capitalize">{order.status}</span>
                    </div>
                    {order.status === "pending" && (
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(order.id, "confirmed");
                          }}
                          className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(order.id, "paused");
                          }}
                          className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded hover:bg-orange-200 transition-colors"
                        >
                          Pause
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(order.id, "cancelled");
                          }}
                          className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                    {order.status === "confirmed" && (
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(order.id, "delivered");
                          }}
                          className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200 transition-colors"
                        >
                          Mark Delivered
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(order.id, "cancelled");
                          }}
                          className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                    {order.status === "paused" && (
                      <div className="flex gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(order.id, "confirmed");
                          }}
                          className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200 transition-colors"
                        >
                          Resume
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStatusChange(order.id, "cancelled");
                          }}
                          className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
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