import { Button } from "@/components/ui/button";
import { MobileCard } from "@/components/MobileCard";
import { ArrowLeft, User, CreditCard, Phone, Mail, Building, TrendingUp } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  businessType: string;
  creditLimit: number;
  outstandingBalance: number;
  totalPurchases: number;
  lastPurchaseDate?: string;
  createdAt: string;
}

interface CustomerListProps {
  customers: Customer[];
  onBack: () => void;
  onCustomerSelect: (customerId: string) => void;
}

export function CustomerList({ customers, onBack, onCustomerSelect }: CustomerListProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Never";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getBusinessIcon = (businessType: string) => {
    switch (businessType) {
      case "restaurant":
        return "🍽️";
      case "retail":
        return "🏪";
      case "bakery":
        return "🥖";
      case "household":
        return "🏠";
      default:
        return "🏢";
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Customers</h1>
      </div>

      {customers.length === 0 ? (
        <MobileCard className="text-center py-12">
          <div className="text-muted-foreground">
            <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-lg">No customers yet</p>
            <p className="text-sm">Customers will appear here after recording sales</p>
          </div>
        </MobileCard>
      ) : (
        <div className="space-y-3">
          {customers.map((customer) => (
            <MobileCard 
              key={customer.id}
              className="cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => onCustomerSelect(customer.id)}
            >
              <div className="space-y-3">
                {/* Customer Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-app-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-lg">{getBusinessIcon(customer.businessType)}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{customer.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="w-3 h-3" />
                        <span>{customer.phone}</span>
                      </div>
                      {customer.email && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Mail className="w-3 h-3" />
                          <span>{customer.email}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground capitalize">
                      {customer.businessType}
                    </div>
                  </div>
                </div>

                {/* Customer Stats */}
                <div className="grid grid-cols-3 gap-4 pt-3 border-t">
                  <div className="text-center">
                    <div className="text-lg font-bold text-app-success">
                      R{customer.totalPurchases.toFixed(0)}
                    </div>
                    <div className="text-xs text-muted-foreground">Total Sales</div>
                  </div>
                  
                  <div className="text-center">
                    <div className={`text-lg font-bold ${customer.outstandingBalance > 0 ? 'text-app-warning' : 'text-app-success'}`}>
                      R{customer.outstandingBalance.toFixed(0)}
                    </div>
                    <div className="text-xs text-muted-foreground">Outstanding</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-lg font-bold text-app-primary">
                      R{(customer.creditLimit - customer.outstandingBalance).toFixed(0)}
                    </div>
                    <div className="text-xs text-muted-foreground">Available Credit</div>
                  </div>
                </div>

                {/* Last Purchase */}
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-2 border-t">
                  <span>Last purchase: {formatDate(customer.lastPurchaseDate)}</span>
                  <span>Customer since: {formatDate(customer.createdAt)}</span>
                </div>
              </div>
            </MobileCard>
          ))}
        </div>
      )}
    </div>
  );
}