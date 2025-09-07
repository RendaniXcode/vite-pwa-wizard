import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MobileCard } from "@/components/MobileCard";
import { ArrowLeft, Plus, Minus, Truck, CreditCard } from "lucide-react";

interface CreateOrderProps {
  onBack: () => void;
  onSave: (order: any) => void;
}

export function CreateOrder({ onBack, onSave }: CreateOrderProps) {
  const [supplierName, setSupplierName] = useState("");
  const [customSupplier, setCustomSupplier] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("large-18");
  const [orderQuantity, setOrderQuantity] = useState(10);
  const [deliveryOption, setDeliveryOption] = useState("pickup");
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "credit">("cash");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [notes, setNotes] = useState("");

  // Product variants for ordering
  const productVariants = [
    { id: "small-18", name: "Small Eggs (18-count)", estimatedPrice: 8.50 },
    { id: "small-30", name: "Small Eggs (30-count)", estimatedPrice: 14.00 },
    { id: "medium-18", name: "Medium Eggs (18-count)", estimatedPrice: 10.00 },
    { id: "medium-30", name: "Medium Eggs (30-count)", estimatedPrice: 16.50 },
    { id: "large-18", name: "Large Eggs (18-count)", estimatedPrice: 12.00 },
    { id: "large-30", name: "Large Eggs (30-count)", estimatedPrice: 20.00 },
    { id: "xl-18", name: "Extra Large Eggs (18-count)", estimatedPrice: 14.00 },
    { id: "xl-30", name: "Extra Large Eggs (30-count)", estimatedPrice: 23.00 },
    { id: "jumbo-18", name: "Jumbo Eggs (18-count)", estimatedPrice: 16.00 },
    { id: "jumbo-30", name: "Jumbo Eggs (30-count)", estimatedPrice: 26.50 },
  ];

  const selectedProduct = productVariants.find(p => p.id === selectedProductId);
  const finalSupplier = supplierName === "other" ? customSupplier : supplierName;
  const estimatedTotal = selectedProduct ? orderQuantity * selectedProduct.estimatedPrice : 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const order = {
      id: Date.now().toString(),
      supplierName: finalSupplier,
      productVariantId: selectedProductId,
      productName: selectedProduct?.name || "",
      quantity: orderQuantity,
      deliveryOption,
      paymentMethod,
      deliveryDate,
      estimatedTotal,
      notes,
      status: "pending",
      date: new Date().toISOString(),
    };
    onSave(order);
    
    // Reset form
    setSupplierName("");
    setCustomSupplier("");
    setSelectedProductId("large-18");
    setOrderQuantity(10);
    setDeliveryOption("pickup");
    setPaymentMethod("cash");
    setDeliveryDate("");
    setNotes("");
    onBack();
  };

  return (
    <div className="min-h-screen bg-background pb-safe">
      <div className="p-4 pt-8 pb-24 space-y-6 max-w-md mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">Create Order</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <MobileCard>
            <div className="space-y-4">
              {/* Supplier Selection */}
              <div>
                <Label className="text-sm font-medium text-foreground">Supplier</Label>
                <Select value={supplierName} onValueChange={setSupplierName}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="AZ2 Farmer">AZ2 Farmer</SelectItem>
                    <SelectItem value="Any Farmer">Any Farmer</SelectItem>
                    <SelectItem value="other">Other Supplier</SelectItem>
                  </SelectContent>
                </Select>
                {supplierName === "other" && (
                  <Input
                    placeholder="Enter supplier name"
                    value={customSupplier}
                    onChange={(e) => setCustomSupplier(e.target.value)}
                    className="mt-2"
                    required
                  />
                )}
              </div>

              {/* Product Selection */}
              <div>
                <Label className="text-sm font-medium text-foreground">Product Size</Label>
                <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    {productVariants.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} - ~R{product.estimatedPrice}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div>
                <Label className="text-sm font-medium text-foreground">
                  Order Quantity (dozens)
                </Label>
                <div className="flex items-center gap-3 mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setOrderQuantity(Math.max(1, orderQuantity - 5))}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Input
                    type="number"
                    value={orderQuantity}
                    onChange={(e) => setOrderQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    className="text-center flex-1"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => setOrderQuantity(orderQuantity + 5)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Delivery Option */}
              <div>
                <Label className="text-sm font-medium text-foreground">Delivery Option</Label>
                <Select value={deliveryOption} onValueChange={setDeliveryOption}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="pickup">Pickup at Farm</SelectItem>
                    <SelectItem value="delivery">Home/Store Delivery</SelectItem>
                    <SelectItem value="meeting_point">Meet at Agreed Point</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Delivery Date */}
              {deliveryOption !== "pickup" && (
                <div>
                  <Label htmlFor="deliveryDate" className="text-sm font-medium text-foreground">
                    Preferred Delivery Date
                  </Label>
                  <Input
                    id="deliveryDate"
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="mt-1"
                  />
                </div>
              )}

              {/* Payment Method */}
              <div>
                <Label className="text-sm font-medium text-foreground">Payment Method</Label>
                <Select value={paymentMethod} onValueChange={(value: "cash" | "credit") => setPaymentMethod(value)}>
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="cash">Cash on Delivery</SelectItem>
                    <SelectItem value="credit">Credit Terms</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="notes" className="text-sm font-medium text-foreground">
                  Notes (Optional)
                </Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Special requirements, quality preferences, etc."
                  className="mt-1"
                  rows={2}
                />
              </div>
            </div>
          </MobileCard>

          {/* Order Summary */}
          <MobileCard className="bg-app-warning/10 border-app-warning/20">
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Order Summary</p>
                <p className="text-2xl font-bold text-app-warning">
                  {orderQuantity} dozens
                </p>
                <p className="text-lg font-medium text-foreground">
                  {selectedProduct?.name}
                </p>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Supplier:</span>
                  <span className="font-medium">{finalSupplier || "Not selected"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery:</span>
                  <span className="font-medium capitalize">
                    {deliveryOption.replace('_', ' ')}
                    {deliveryOption !== "pickup" && (
                      <Truck className="w-4 h-4 inline ml-1" />
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Payment:</span>
                  <span className={`font-medium ${paymentMethod === "credit" ? "text-app-warning" : "text-app-success"}`}>
                    {paymentMethod === "cash" ? "Cash on Delivery" : "Credit Terms"}
                    {paymentMethod === "credit" && (
                      <CreditCard className="w-4 h-4 inline ml-1" />
                    )}
                  </span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span>Estimated Total:</span>
                  <span className="font-bold text-app-warning">R{estimatedTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </MobileCard>

          <Button 
            type="submit" 
            variant="mobile" 
            className="w-full py-4 text-lg"
            disabled={!supplierName || (supplierName === "other" && !customSupplier)}
          >
            Send Order to Supplier
          </Button>
        </form>
      </div>
    </div>
  );
}