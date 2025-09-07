import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MobileCard } from "@/components/MobileCard";
import { ArrowLeft, Plus, Minus } from "lucide-react";

interface CreateOrderProps {
  onBack: () => void;
  onSave: (order: any) => void;
}

export function CreateOrder({ onBack, onSave }: CreateOrderProps) {
  const [farmerName, setFarmerName] = useState("");
  const [orderQuantity, setOrderQuantity] = useState(10);
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const order = {
      id: Date.now(),
      farmerName,
      quantity: orderQuantity,
      notes,
      status: "pending",
      date: new Date().toISOString(),
    };
    onSave(order);
    setFarmerName("");
    setOrderQuantity(10);
    setNotes("");
    onBack();
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center gap-3 mb-6">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Create Order</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <MobileCard>
          <div className="space-y-4">
            <div>
              <Label htmlFor="farmerName" className="text-sm font-medium text-foreground">
                Farmer/Supplier
              </Label>
              <Input
                id="farmerName"
                value={farmerName}
                onChange={(e) => setFarmerName(e.target.value)}
                placeholder="Enter farmer name"
                required
                className="mt-1"
              />
            </div>

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

            <div>
              <Label htmlFor="notes" className="text-sm font-medium text-foreground">
                Notes (Optional)
              </Label>
              <Input
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Special requirements, delivery date, etc."
                className="mt-1"
              />
            </div>
          </div>
        </MobileCard>

        <div className="bg-app-warning/10 p-4 rounded-lg border border-app-warning/20">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Order Summary</p>
            <p className="text-2xl font-bold text-app-warning">
              {orderQuantity} dozens
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Will be sent to {farmerName || "farmer"}
            </p>
          </div>
        </div>

        <Button type="submit" variant="mobile" className="w-full py-4 text-lg">
          Send Order to Farmer
        </Button>
      </form>
    </div>
  );
}