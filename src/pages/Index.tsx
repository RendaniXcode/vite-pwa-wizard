import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MobileCard } from "@/components/MobileCard";
import { StatCard } from "@/components/StatCard";
import { RecordSale } from "@/components/RecordSale";
import { CreateOrder } from "@/components/CreateOrder";
import { SalesHistory } from "@/components/SalesHistory";
import { OrderHistory } from "@/components/OrderHistory";
import { CustomerList } from "@/components/CustomerList";
import { CustomerProfile } from "@/components/CustomerProfile";
import { 
  DollarSign, 
  Package, 
  Users, 
  TrendingUp, 
  Plus, 
  History,
  ShoppingCart,
  Egg,
  LogIn,
  Settings,
  LogOut
} from "lucide-react";

type View = "dashboard" | "recordSale" | "createOrder" | "salesHistory" | "orderHistory" | "customerList" | "customerProfile";

const Index = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [sales, setSales] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    navigate("/login");
  };

  // Check if user is logged in
  useEffect(() => {
    const user = localStorage.getItem("currentUser");
    if (user) {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedSales = localStorage.getItem("fieldSales");
    const savedOrders = localStorage.getItem("fieldOrders");
    const savedCustomers = localStorage.getItem("fieldCustomers");
    
    if (savedSales) {
      setSales(JSON.parse(savedSales));
    }
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
    if (savedCustomers) {
      setCustomers(JSON.parse(savedCustomers));
    }
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("fieldSales", JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem("fieldOrders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("fieldCustomers", JSON.stringify(customers));
  }, [customers]);

  const handleSaveSale = (sale: any) => {
    setSales([sale, ...sales]);
  };

  const handleSaveOrder = (order: any) => {
    setOrders([order, ...orders]);
  };

  const handleSaveCustomer = (customer: any) => {
    const existingCustomerIndex = customers.findIndex(c => c.id === customer.id);
    if (existingCustomerIndex >= 0) {
      // Update existing customer
      const updatedCustomers = [...customers];
      updatedCustomers[existingCustomerIndex] = customer;
      setCustomers(updatedCustomers);
    } else {
      // Add new customer
      setCustomers([customer, ...customers]);
    }
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
        customers={customers}
        onSaveCustomer={handleSaveCustomer}
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

  const handleUpdateOrder = (updatedOrder: any) => {
    const updatedOrders = orders.map(order => 
      order.id === updatedOrder.id ? updatedOrder : order
    );
    setOrders(updatedOrders);
  };

  if (currentView === "orderHistory") {
    return (
      <OrderHistory 
        orders={orders}
        onBack={() => setCurrentView("dashboard")}
        onUpdateOrder={handleUpdateOrder}
      />
    );
  }

  if (currentView === "customerList") {
    return (
      <CustomerList 
        customers={customers}
        onBack={() => setCurrentView("dashboard")}
        onCustomerSelect={(customerId) => {
          setSelectedCustomerId(customerId);
          setCurrentView("customerProfile");
        }}
      />
    );
  }

  if (currentView === "customerProfile") {
    const selectedCustomer = customers.find(c => c.id === selectedCustomerId);
    if (!selectedCustomer) {
      setCurrentView("customerList");
      return null;
    }
    
    return (
      <CustomerProfile 
        customer={selectedCustomer}
        sales={sales}
        onBack={() => setCurrentView("customerList")}
        onUpdateCustomer={handleSaveCustomer}
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
          <div className="flex items-center gap-2">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm opacity-90">Welcome</p>
                  <p className="text-lg font-bold">{currentUser.firstName}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-primary-foreground hover:bg-white/20"
                >
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/login")}
                className="text-primary-foreground hover:bg-white/20"
              >
                <LogIn className="w-4 h-4 mr-2" />
                Login
              </Button>
            )}
          </div>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard
            title="Total Revenue"
            value={`R${totalRevenue.toFixed(2)}`}
            icon={<DollarSign />}
            trend="+12.5%"
            trendUp={true}
            className="cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setCurrentView('salesHistory')}
          />
          <StatCard
            title="Dozens Sold"
            value={totalQuantitySold}
            icon={<Package />}
            trend="+8.2%"
            trendUp={true}
            className="cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setCurrentView('salesHistory')}
          />
          <StatCard
            title="Customers"
            value={totalCustomers}
            icon={<Users />}
            className="cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setCurrentView('customerList')}
          />
          <StatCard
            title="Pending Orders"
            value={pendingOrders}
            icon={<TrendingUp />}
            className="cursor-pointer hover:scale-105 transition-transform"
            onClick={() => setCurrentView('orderHistory')}
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
            
            <Button 
              variant="card" 
              className="w-full justify-between p-4 h-auto"
              onClick={() => setCurrentView("customerList")}
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-app-primary" />
                <div className="text-left">
                  <p className="font-medium">Customers</p>
                  <p className="text-sm text-muted-foreground">{customers.length} total customers</p>
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
                  R{sales.filter(sale => {
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