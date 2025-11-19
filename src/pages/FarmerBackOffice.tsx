import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { OrderHistory } from "@/components/OrderHistory";
import { Order } from "@/types";
import { ArrowLeft, Package, Clock, CheckCircle } from "lucide-react";
import { StatCard } from "@/components/StatCard";

export default function FarmerBackOffice() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [view, setView] = useState<"dashboard" | "orders">("dashboard");

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = localStorage.getItem("fieldOrders");
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save orders whenever they change
  useEffect(() => {
    localStorage.setItem("fieldOrders", JSON.stringify(orders));
  }, [orders]);

  const handleUpdateOrder = (updatedOrder: Order) => {
    const updatedOrders = orders.map(order => 
      order.id === updatedOrder.id ? updatedOrder : order
    );
    setOrders(updatedOrders);
  };

  const pendingOrders = orders.filter(order => order.status === "pending").length;
  const confirmedOrders = orders.filter(order => order.status === "confirmed").length;
  const deliveredOrders = orders.filter(order => order.status === "delivered").length;
  const totalDozens = orders
    .filter(order => order.status !== "cancelled")
    .reduce((sum, order) => sum + order.quantity, 0);

  if (view === "orders") {
    return (
      <OrderHistory 
        orders={orders}
        onBack={() => setView("dashboard")}
        onUpdateOrder={handleUpdateOrder}
        userRole="farmer"
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-header text-primary-foreground p-6">
        <div className="max-w-md mx-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/dashboard")}
            className="mb-4 text-primary-foreground hover:bg-primary-foreground/20"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold">Farmer Back Office</h1>
          <p className="text-primary-foreground/80 mt-2">
            Manage incoming orders from sellers
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            title="Pending Orders"
            value={pendingOrders}
            icon={<Clock />}
            className="cursor-pointer"
            onClick={() => setView("orders")}
          />
          <StatCard
            title="Confirmed"
            value={confirmedOrders}
            icon={<CheckCircle />}
            className="cursor-pointer"
            onClick={() => setView("orders")}
          />
          <StatCard
            title="Delivered"
            value={deliveredOrders}
            icon={<Package />}
          />
          <StatCard
            title="Total Dozens"
            value={totalDozens}
            icon={<Package />}
          />
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">Quick Actions</h2>
          
          <Button
            className="w-full h-14 text-lg shadow-button"
            onClick={() => setView("orders")}
          >
            <Package className="mr-2 h-5 w-5" />
            View All Orders
          </Button>
        </div>

        {/* Recent Pending Orders */}
        {pendingOrders > 0 && (
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-foreground">
              Pending Orders ({pendingOrders})
            </h2>
            <div className="bg-app-warning/10 border border-app-warning/20 rounded-lg p-4">
              <p className="text-sm text-foreground">
                You have <span className="font-bold">{pendingOrders}</span> order{pendingOrders !== 1 ? 's' : ''} waiting for confirmation
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-3 w-full"
                onClick={() => setView("orders")}
              >
                Review Pending Orders
              </Button>
            </div>
          </div>
        )}

        {/* Order Status Legend */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">Order Workflow</h2>
          <div className="bg-gradient-card border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-app-warning/20 flex items-center justify-center">
                <Clock className="w-4 h-4 text-app-warning" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Pending</p>
                <p className="text-sm text-muted-foreground">New order from seller - awaiting your confirmation</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-app-success/20 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-app-success" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Confirmed</p>
                <p className="text-sm text-muted-foreground">Order confirmed - mark as shipped when ready</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Package className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Delivered</p>
                <p className="text-sm text-muted-foreground">Order shipped and completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
