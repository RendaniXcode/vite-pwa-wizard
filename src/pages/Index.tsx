import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MobileCard } from "@/components/MobileCard";
import { StatCard } from "@/components/StatCard";
import { RecordSale } from "@/components/RecordSale";
import { CreateOrder } from "@/components/CreateOrder";
import { SalesHistory } from "@/components/SalesHistory";
import { OrderHistory } from "@/components/OrderHistory";
import { 
  DollarSign, 
  Package, 
  Users, 
  TrendingUp, 
  Plus, 
  History,
  ShoppingCart,
  Egg
} from "lucide-react";

type View = "dashboard" | "recordSale" | "createOrder" | "salesHistory" | "orderHistory";

const Index = () => {
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [sales, setSales] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedSales = localStorage.getItem("fieldSales");
    const savedOrders = localStorage.getItem("fieldOrders");
    
    if (savedSales) {
      setSales(JSON.parse(savedSales));
    }
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("fieldSales", JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem("fieldOrders", JSON.stringify(orders));
  }, [orders]);

  const handleSaveSale = (sale: any) => {
    setSales([sale, ...sales]);
  };

  const handleSaveOrder = (order: any) => {
    setOrders([order, ...orders]);
  };

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalQuantitySold = sales.reduce((sum, sale) => sum + sale.quantity, 0);
  const totalCustomers = new Set(sales.map(sale => sale.customerName)).size;
  const pendingOrders = orders.filter(order => order.status === "pending").length;

  if (currentView === "recordSale") {
    return (
      <RecordSale 
        onBack={() => setCurrentView("dashboard")}
        onSave={handleSaveSale}
      />
    );
  }

  if (currentView === "createOrder") {
    return (
      <CreateOrder 
        onBack={() => setCurrentView("dashboard")}
        onSave={handleSaveOrder}
      />
    );
  }

  if (currentView === "salesHistory") {
    return (
      <SalesHistory 
        sales={sales}
        onBack={() => setCurrentView("dashboard")}
      />
    );
  }

  if (currentView === "orderHistory") {
    return (
      <OrderHistory 
        orders={orders}
        onBack={() => setCurrentView("dashboard")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-header text-primary-foreground p-4 shadow-mobile sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-app-egg rounded-lg flex items-center justify-center">
              <Egg className="w-6 h-6 text-app-farm" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Field Sales</h1>
              <p className="text-sm opacity-90">Egg Business Manager</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm opacity-90">Today</p>
            <p className="text-lg font-bold">{new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            title="Total Revenue"
            value={`$${totalRevenue.toFixed(2)}`}
            icon={<DollarSign />}
            trend="+12.5%"
            trendUp={true}
          />
          <StatCard
            title="Dozens Sold"
            value={totalQuantitySold}
            icon={<Package />}
            trend="+8.2%"
            trendUp={true}
          />
          <StatCard
            title="Customers"
            value={totalCustomers}
            icon={<Users />}
          />
          <StatCard
            title="Pending Orders"
            value={pendingOrders}
            icon={<TrendingUp />}
          />
        </div>

        {/* Quick Actions */}
        <MobileCard>
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="mobile" 
              className="h-20 flex-col gap-2"
              onClick={() => setCurrentView("recordSale")}
            >
              <Plus className="w-6 h-6" />
              <span className="text-sm">Record Sale</span>
            </Button>
            <Button 
              variant="success" 
              className="h-20 flex-col gap-2"
              onClick={() => setCurrentView("createOrder")}
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="text-sm">Order Eggs</span>
            </Button>
          </div>
        </MobileCard>

        {/* Recent Activity */}
        <MobileCard>
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <Button 
              variant="card" 
              className="w-full justify-between p-4 h-auto"
              onClick={() => setCurrentView("salesHistory")}
            >
              <div className="flex items-center gap-3">
                <History className="w-5 h-5 text-app-success" />
                <div className="text-left">
                  <p className="font-medium">Sales History</p>
                  <p className="text-sm text-muted-foreground">{sales.length} total sales</p>
                </div>
              </div>
              <span className="text-muted-foreground">→</span>
            </Button>
            
            <Button 
              variant="card" 
              className="w-full justify-between p-4 h-auto"
              onClick={() => setCurrentView("orderHistory")}
            >
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-app-warning" />
                <div className="text-left">
                  <p className="font-medium">Order History</p>
                  <p className="text-sm text-muted-foreground">{orders.length} total orders</p>
                </div>
              </div>
              <span className="text-muted-foreground">→</span>
            </Button>
          </div>
        </MobileCard>

        {/* Today's Summary */}
        {sales.length > 0 && (
          <MobileCard className="bg-gradient-success text-primary-foreground">
            <h2 className="text-lg font-semibold mb-4">Today's Performance</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm opacity-90">Sales Today</p>
                <p className="text-2xl font-bold">
                  {sales.filter(sale => {
                    const today = new Date().toDateString();
                    return new Date(sale.date).toDateString() === today;
                  }).length}
                </p>
              </div>
              <div>
                <p className="text-sm opacity-90">Revenue Today</p>
                <p className="text-2xl font-bold">
                  ${sales.filter(sale => {
                    const today = new Date().toDateString();
                    return new Date(sale.date).toDateString() === today;
                  }).reduce((sum, sale) => sum + sale.total, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </MobileCard>
        )}
      </main>
    </div>
  );
};

export default Index;