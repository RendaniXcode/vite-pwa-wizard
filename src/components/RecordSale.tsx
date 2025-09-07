import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MobileCard } from "@/components/MobileCard";
import { ArrowLeft, Plus, Minus } from "lucide-react";

interface RecordSaleProps {
  onBack: () => void;
  onSave: (sale: any) => void;
}

export function RecordSale({ onBack, onSave }: RecordSaleProps) {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [eggQuantity, setEggQuantity] = useState(1);
  const [pricePerDozen, setPricePerDozen] = useState(12);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const sale = {
      id: Date.now(),
      customerName,
      customerPhone,
      quantity: eggQuantity,
      pricePerDozen,
      total: eggQuantity * pricePerDozen,
      date: new Date().toISOString(),
    };
    onSave(sale);
    setCustomerName("");
    setCustomerPhone("");
    setEggQuantity(1);
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
        <MobileCard>
          <div className="space-y-4">
            <div>
              <Label htmlFor="customerName" className="text-sm font-medium text-foreground">
                Customer Name
              </Label>
              <Input
                id="customerName"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="Enter customer name"
                required
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="customerPhone" className="text-sm font-medium text-foreground">
                Phone Number
              </Label>
              <Input
                id="customerPhone"
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="Enter phone number"
                className="mt-1"
              />
            </div>
          </div>
        </MobileCard>

        <MobileCard>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium text-foreground">
                Egg Quantity (dozens)
              </Label>
              <div className="flex items-center gap-3 mt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setEggQuantity(Math.max(1, eggQuantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <Input
                  type="number"
                  value={eggQuantity}
                  onChange={(e) => setEggQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  min="1"
                  className="text-center flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => setEggQuantity(eggQuantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div>
              <Label htmlFor="price" className="text-sm font-medium text-foreground">
                Price per Dozen (R)
              </Label>
              <Input
                id="price"
                type="number"
                step="0.50"
                value={pricePerDozen}
                onChange={(e) => setPricePerDozen(parseFloat(e.target.value) || 0)}
                min="0"
                className="mt-1"
              />
            </div>

            <div className="bg-app-success/10 p-4 rounded-lg border border-app-success/20">
              <div className="text-center">
                <p className="text-sm text-muted-foreground">Total Sale</p>
                <p className="text-3xl font-bold text-app-success">
                  R{(eggQuantity * pricePerDozen).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        </MobileCard>

        <Button type="submit" variant="mobile" className="w-full py-4 text-lg">
          Record Sale
        </Button>
      </form>
    </div>
  );
}