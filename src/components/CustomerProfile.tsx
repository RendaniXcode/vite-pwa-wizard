import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MobileCard } from "@/components/MobileCard";
import { ArrowLeft, Edit, Save, X, User, CreditCard, TrendingUp, Package } from "lucide-react";

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

interface Sale {
  id: string;
  customerId: string;
  productName: string;
  quantity: number;
  pricePerDozen: number;
  total: number;
  paymentMethod: "cash" | "credit";
  date: string;
}

interface CustomerProfileProps {
  customer: Customer;
  sales: Sale[];
  onBack: () => void;
  onUpdateCustomer: (customer: Customer) => void;
}

export function CustomerProfile({ customer, sales, onBack, onUpdateCustomer }: CustomerProfileProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCustomer, setEditedCustomer] = useState(customer);

  const customerSales = sales.filter(sale => sale.customerId === customer.id);
  const totalSales = customerSales.length;
  const avgOrderValue = totalSales > 0 ? customer.totalPurchases / totalSales : 0;
  const creditUtilization = (customer.outstandingBalance / customer.creditLimit) * 100;

  const handleSave = () => {
    onUpdateCustomer(editedCustomer);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedCustomer(customer);
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getBusinessIcon = (businessType: string) => {
    switch (businessType) {
      case "restaurant": return "🍽️";
      case "retail": return "🏪";
      case "bakery": return "🥖";
      case "household": return "🏠";
      default: return "🏢";
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Customer Profile</h1>
        </div>
        {!isEditing ? (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <Edit className="w-4 h-4 mr-1" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              <X className="w-4 h-4" />
            </Button>
            <Button variant="default" size="sm" onClick={handleSave}>
              <Save className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>

      {/* Customer Info */}
      <MobileCard>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-app-primary/10 rounded-full flex items-center justify-center">
              <span className="text-xl">{getBusinessIcon(customer.businessType)}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">{customer.name}</h2>
              <p className="text-sm text-muted-foreground capitalize">{customer.businessType}</p>
            </div>
          </div>

          {isEditing ? (
            <div className="space-y-3">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editedCustomer.name}
                  onChange={(e) => setEditedCustomer({...editedCustomer, name: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={editedCustomer.phone}
                  onChange={(e) => setEditedCustomer({...editedCustomer, phone: e.target.value})}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={editedCustomer.email || ""}
                  onChange={(e) => setEditedCustomer({...editedCustomer, email: e.target.value})}
                />
              </div>
              <div>
                <Label>Business Type</Label>
                <Select 
                  value={editedCustomer.businessType} 
                  onValueChange={(value) => setEditedCustomer({...editedCustomer, businessType: value})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="retail">Retail Store</SelectItem>
                    <SelectItem value="restaurant">Restaurant</SelectItem>
                    <SelectItem value="household">Household</SelectItem>
                    <SelectItem value="bakery">Bakery</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="creditLimit">Credit Limit (R)</Label>
                <Input
                  id="creditLimit"
                  type="number"
                  value={editedCustomer.creditLimit}
                  onChange={(e) => setEditedCustomer({...editedCustomer, creditLimit: parseFloat(e.target.value) || 0})}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Phone:</span>
                <span>{customer.phone}</span>
              </div>
              {customer.email && (
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span>{customer.email}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Customer Since:</span>
                <span>{new Date(customer.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          )}
        </div>
      </MobileCard>

      {/* Financial Summary */}
      <MobileCard>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5" />
          Financial Summary
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-app-success/10 rounded-lg">
            <div className="text-2xl font-bold text-app-success">R{customer.totalPurchases.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">Total Purchases</div>
          </div>
          <div className="text-center p-3 bg-app-primary/10 rounded-lg">
            <div className="text-2xl font-bold text-app-primary">R{avgOrderValue.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">Avg Order Value</div>
          </div>
          <div className={`text-center p-3 rounded-lg ${customer.outstandingBalance > 0 ? 'bg-app-warning/10' : 'bg-app-success/10'}`}>
            <div className={`text-2xl font-bold ${customer.outstandingBalance > 0 ? 'text-app-warning' : 'text-app-success'}`}>
              R{customer.outstandingBalance.toFixed(2)}
            </div>
            <div className="text-xs text-muted-foreground">Outstanding</div>
          </div>
          <div className="text-center p-3 bg-muted rounded-lg">
            <div className="text-2xl font-bold text-foreground">R{customer.creditLimit.toFixed(2)}</div>
            <div className="text-xs text-muted-foreground">Credit Limit</div>
          </div>
        </div>
        
        {/* Credit Utilization Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Credit Utilization</span>
            <span>{creditUtilization.toFixed(1)}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${creditUtilization > 80 ? 'bg-app-warning' : creditUtilization > 50 ? 'bg-yellow-500' : 'bg-app-success'}`}
              style={{ width: `${Math.min(creditUtilization, 100)}%` }}
            />
          </div>
        </div>
      </MobileCard>

      {/* Recent Sales */}
      <MobileCard>
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Package className="w-5 h-5" />
          Recent Sales ({totalSales} total)
        </h3>
        {customerSales.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No sales recorded yet</p>
          </div>
        ) : (
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {customerSales.slice(0, 10).map((sale) => (
              <div key={sale.id} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                <div>
                  <div className="font-medium text-sm">{sale.productName}</div>
                  <div className="text-xs text-muted-foreground">
                    {sale.quantity} × R{sale.pricePerDozen} | {formatDate(sale.date)}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      sale.paymentMethod === 'cash' 
                        ? 'bg-app-success/20 text-app-success' 
                        : 'bg-app-warning/20 text-app-warning'
                    }`}>
                      {sale.paymentMethod}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-app-success">R{sale.total.toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </MobileCard>
    </div>
  );
}