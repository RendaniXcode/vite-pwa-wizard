import { useState } from "react";
import { MobileCard } from "@/components/MobileCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { OrderDetailModal } from "@/components/OrderDetailModal";
import { Clock, CheckCircle, Package, AlertCircle, XCircle, PauseCircle, ArrowLeft } from "lucide-react";
import { Order } from "@/types";

interface OrderHistoryProps {
  orders: Order[];
  onBack: () => void;
  onUpdateOrder: (updatedOrder: Order) => void;
  userRole?: "seller" | "farmer"; // Determines which actions are available
}

export function OrderHistory({ orders, onBack, onUpdateOrder, userRole = "seller" }: OrderHistoryProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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
        return <Clock className="w-5 h-5" />;
      case "confirmed":
        return <CheckCircle className="w-5 h-5" />;
      case "delivered":
        return <Package className="w-5 h-5" />;
      case "cancelled":
        return <XCircle className="w-5 h-5" />;
      case "paused":
        return <PauseCircle className="w-5 h-5" />;
      default:
        return <AlertCircle className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge className="bg-app-warning text-white flex items-center gap-1">{getStatusIcon(status)} <span className="capitalize">{status}</span></Badge>;
      case "confirmed":
        return <Badge className="bg-app-success text-white flex items-center gap-1">{getStatusIcon(status)} <span className="capitalize">{status}</span></Badge>;
      case "delivered":
        return <Badge className="bg-primary text-primary-foreground flex items-center gap-1">{getStatusIcon(status)} <span className="capitalize">{status}</span></Badge>;
      case "cancelled":
        return <Badge variant="destructive" className="flex items-center gap-1">{getStatusIcon(status)} <span className="capitalize">{status}</span></Badge>;
      case "paused":
        return <Badge className="bg-orange-600 text-white flex items-center gap-1">{getStatusIcon(status)} <span className="capitalize">{status}</span></Badge>;
      default:
        return <Badge variant="outline" className="flex items-center gap-1">{getStatusIcon(status)} <span className="capitalize">{status}</span></Badge>;
    }
  };

  const handleStatusChange = (order: Order, newStatus: Order["status"]) => {
    const updatedOrder = { ...order, status: newStatus };
    onUpdateOrder(updatedOrder);
  };

  // Determine which actions are available based on user role and order status
  const getAvailableActions = (order: Order) => {
    if (userRole === "seller") {
      // Seller can only pause or cancel pending orders
      if (order.status === "pending") {
        return (
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleStatusChange(order, "paused")}
              className="flex-1 text-orange-600 border-orange-600 hover:bg-orange-50"
            >
              Pause
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleStatusChange(order, "cancelled")}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        );
      }
      
      if (order.status === "paused") {
        return (
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleStatusChange(order, "pending")}
              className="flex-1 text-primary border-primary hover:bg-primary/10"
            >
              Resume
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleStatusChange(order, "cancelled")}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        );
      }
      
      // No actions for confirmed, delivered, or cancelled orders from seller side
      return null;
    }

    if (userRole === "farmer") {
      // Farmer can confirm pending orders
      if (order.status === "pending") {
        return (
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              variant="success"
              onClick={() => handleStatusChange(order, "confirmed")}
              className="flex-1"
            >
              Confirm Order
            </Button>
          </div>
        );
      }

      // Farmer can mark confirmed orders as delivered
      if (order.status === "confirmed") {
        return (
          <div className="flex gap-2 mt-3">
            <Button
              size="sm"
              variant="default"
              onClick={() => handleStatusChange(order, "delivered")}
              className="flex-1"
            >
              Mark as Shipped
            </Button>
          </div>
        );
      }

      // No actions for paused orders (waiting for seller to resume)
      // No actions for delivered or cancelled orders
      return null;
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-header text-primary-foreground p-6 sticky top-0 z-10 shadow-mobile">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onBack}
              className="text-primary-foreground hover:bg-primary-foreground/20"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">Order History</h1>
              <p className="text-sm text-primary-foreground/80">
                {userRole === "seller" ? "Your orders" : "Incoming orders"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6 max-w-md mx-auto">
        {orders.length === 0 ? (
          <MobileCard className="text-center py-12">
            <div className="text-muted-foreground">
              <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No orders yet</p>
              <p className="text-sm mt-2">
                {userRole === "seller" 
                  ? "Create your first order to see it here" 
                  : "Orders will appear here when sellers place them"}
              </p>
            </div>
          </MobileCard>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <MobileCard key={order.id} className="hover:shadow-card transition-all">
                <div className="space-y-3">
                  {/* Order Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">
                          {formatDate(order.date)}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-foreground">
                        {order.quantity} dozen{order.quantity !== 1 ? "s" : ""}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {userRole === "seller" ? `To: ${order.farmerName}` : `From Seller`}
                      </p>
                    </div>
                    <div>
                      {getStatusBadge(order.status)}
                    </div>
                  </div>

                  {/* Order Notes */}
                  {order.notes && (
                    <div className="bg-muted/50 rounded-lg p-3 border border-border">
                      <p className="text-sm text-foreground">{order.notes}</p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  {getAvailableActions(order)}

                  {/* Status Messages */}
                  {order.status === "confirmed" && userRole === "seller" && (
                    <p className="text-xs text-app-success text-center mt-2">
                      ✓ Confirmed by farmer - awaiting shipment
                    </p>
                  )}
                  {order.status === "delivered" && (
                    <p className="text-xs text-primary text-center mt-2">
                      ✓ Order completed
                    </p>
                  )}
                  {order.status === "paused" && userRole === "farmer" && (
                    <p className="text-xs text-orange-600 text-center mt-2">
                      ⏸ Paused by seller - awaiting resume
                    </p>
                  )}
                </div>
              </MobileCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}