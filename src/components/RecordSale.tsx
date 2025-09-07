import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MobileCard } from "@/components/MobileCard";
import { ArrowLeft, Plus, Minus, User, History, CreditCard } from "lucide-react";

interface RecordSaleProps {
  onBack: () => void;
  onSave: (sale: any) => void;
  customers: any[];
  onSaveCustomer: (customer: any) => void;
}

export function RecordSale({ onBack, onSave, customers, onSaveCustomer }: RecordSaleProps) {
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [isNewCustomer, setIsNewCustomer] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("large-18");
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "credit">("cash");
  const [notes, setNotes] = useState("");
  const [showCustomerHistory, setShowCustomerHistory] = useState(false);

  // Import product variants
  const productVariants = [
    { id: "small-18", name: "Small Eggs (18-count)", basePrice: 8.50 },
    { id: "small-30", name: "Small Eggs (30-count)", basePrice: 14.00 },
    { id: "medium-18", name: "Medium Eggs (18-count)", basePrice: 10.00 },
    { id: "medium-30", name: "Medium Eggs (30-count)", basePrice: 16.50 },
    { id: "large-18", name: "Large Eggs (18-count)", basePrice: 12.00 },
    { id: "large-30", name: "Large Eggs (30-count)", basePrice: 20.00 },
    { id: "xl-18", name: "Extra Large Eggs (18-count)", basePrice: 14.00 },
    { id: "xl-30", name: "Extra Large Eggs (30-count)", basePrice: 23.00 },
    { id: "jumbo-18", name: "Jumbo Eggs (18-count)", basePrice: 16.00 },
    { id: "jumbo-30", name: "Jumbo Eggs (30-count)", basePrice: 26.50 },
  ];

  const selectedProduct = productVariants.find(p => p.id === selectedProductId);
  const selectedCustomer = customers.find(c => c.id === selectedCustomerId);
  const customerSales = customers.length > 0 ? JSON.parse(localStorage.getItem("fieldSales") || "[]").filter((sale: any) => sale.customerId === selectedCustomerId) : [];

  const total = selectedProduct ? quantity * selectedProduct.basePrice : 0;

  const handleCustomerChange = (customerId: string) => {
    if (customerId === "new") {
      setIsNewCustomer(true);
      setSelectedCustomerId("");
    } else {
      setIsNewCustomer(false);
      setSelectedCustomerId(customerId);
      const customer = customers.find(c => c.id === customerId);
      if (customer) {
        setCustomerName(customer.name);
        setCustomerPhone(customer.phone);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let customerId = selectedCustomerId;
    
    // Create new customer if needed
    if (isNewCustomer || !selectedCustomerId) {
      customerId = Date.now().toString();
      const newCustomer = {
        id: customerId,
        name: customerName,
        phone: customerPhone,
        email: customerEmail,
        businessType,
        creditLimit: 1000, // Default credit limit
        outstandingBalance: paymentMethod === "credit" ? total : 0,
        totalPurchases: total,
        lastPurchaseDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
      };
      onSaveCustomer(newCustomer);
    } else if (selectedCustomer) {
      // Update existing customer
      const updatedCustomer = {
        ...selectedCustomer,
        outstandingBalance: selectedCustomer.outstandingBalance + (paymentMethod === "credit" ? total : 0),
        totalPurchases: selectedCustomer.totalPurchases + total,
        lastPurchaseDate: new Date().toISOString(),
      };
      onSaveCustomer(updatedCustomer);
    }

    const sale = {
      id: Date.now().toString(),
      customerId,
      customerName,
      customerPhone,
      productVariantId: selectedProductId,
      productName: selectedProduct?.name || "",
      quantity,
      pricePerDozen: selectedProduct?.basePrice || 0,
      total,
      paymentMethod,
      date: new Date().toISOString(),
      notes,
    };
    
    onSave(sale);
    
    // Reset form
    setSelectedCustomerId("");
    setIsNewCustomer(false);
    setCustomerName("");
    setCustomerPhone("");
    setCustomerEmail("");
    setBusinessType("");
    setQuantity(1);
    setPaymentMethod("cash");
    setNotes("");
    onBack();
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Record Sale</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Customer Selection */}
        <MobileCard>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium text-foreground">Customer</Label>
              {selectedCustomer && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCustomerHistory(!showCustomerHistory)}
                >
                  <History className="w-4 h-4 mr-1" />
                  History
                </Button>
              )}
            </div>
            
            <Select value={selectedCustomerId} onValueChange={handleCustomerChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select customer or add new" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">+ Add New Customer</SelectItem>
                {customers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name} - {customer.phone}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Customer History */}
            {showCustomerHistory && selectedCustomer && (
              <div className="mt-4 p-3 bg-muted rounded-lg">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Total Purchases:</span>
                    <span className="font-medium">R{selectedCustomer.totalPurchases.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Outstanding Balance:</span>
                    <span className={`font-medium ${selectedCustomer.outstandingBalance > 0 ? 'text-app-warning' : 'text-app-success'}`}>
                      R{selectedCustomer.outstandingBalance.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Credit Available:</span>
                    <span className="font-medium">R{(selectedCustomer.creditLimit - selectedCustomer.outstandingBalance).toFixed(2)}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Last purchase: {selectedCustomer.lastPurchaseDate ? new Date(selectedCustomer.lastPurchaseDate).toLocaleDateString() : 'Never'}
                  </div>
                </div>
              </div>
            )}

            {/* New Customer Form */}
            {isNewCustomer && (
              <div className="space-y-3 pt-3 border-t">
                <Input
                  placeholder="Customer name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
                <Input
                  placeholder="Phone number"
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  required
                />
                <Input
                  placeholder="Email (optional)"
                  type="email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
                <Select value={businessType} onValueChange={setBusinessType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Business type" />
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
            )}
          </div>
        </MobileCard>

        {/* Product Selection */}
        <MobileCard>
          <div className="space-y-4">
            <Label className="text-sm font-medium text-foreground">Product</Label>
            <Select value={selectedProductId} onValueChange={setSelectedProductId}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {productVariants.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} - R{product.basePrice}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div>
              <Label className="text-sm font-medium text-foreground">Quantity</Label>
              <div className="flex items-center gap-3 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  className="text-center flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <Label className="text-sm font-medium text-foreground">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={(value: "cash" | "credit") => setPaymentMethod(value)}>
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash Payment</SelectItem>
                  <SelectItem value="credit">Credit (Pay Later)</SelectItem>
                </SelectContent>
              </Select>
              {paymentMethod === "credit" && selectedCustomer && (
                <div className="mt-2 text-xs text-muted-foreground">
                  Credit available: R{(selectedCustomer.creditLimit - selectedCustomer.outstandingBalance).toFixed(2)}
                </div>
              )}
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes" className="text-sm font-medium text-foreground">Notes (optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any additional notes..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="mt-1"
                rows={2}
              />
            </div>

            {/* Total */}
            <div className="bg-app-success/10 p-4 rounded-lg border border-app-success/20">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Sale</p>
                <p className="text-3xl font-bold text-app-success">
                  R{total.toFixed(2)}
                </p>
                {paymentMethod === "credit" && (
                  <div className="flex items-center justify-center gap-1 mt-1">
                    <CreditCard className="w-4 h-4 text-app-warning" />
                    <span className="text-sm text-app-warning">Credit Sale</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </MobileCard>

        <Button 
          type="submit" 
          variant="mobile" 
          className="w-full py-4 text-lg"
          disabled={!customerName || (!selectedCustomerId && !isNewCustomer)}
        >
          Record Sale
        </Button>
      </form>
    </div>
  );
}