export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  businessType: string;
  address?: string;
  creditLimit: number;
  outstandingBalance: number;
  totalPurchases: number;
  lastPurchaseDate?: string;
  createdAt: string;
  notes?: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  size: "Small" | "Medium" | "Large" | "Extra Large" | "Jumbo";
  packSize: "18-count" | "30-count";
  basePrice: number;
}

export interface Sale {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  productVariantId: string;
  productName: string;
  quantity: number;
  pricePerDozen: number;
  total: number;
  paymentMethod: "cash" | "credit";
  location: {
    province: string;
    metro: string;
    neighborhood: string;
  };
  date: string;
  notes?: string;
}

export interface OrderStatusEvent {
  status: Order["status"];
  timestamp: string;
  actor: "seller" | "farmer" | "system";
  note?: string;
}

export interface Order {
  id: string;
  farmerName: string;
  quantity: number;
  notes?: string;
  status: "pending" | "confirmed" | "delivered" | "cancelled" | "paused";
  date: string;
  userRole?: "seller" | "farmer";
  productName?: string;
  productSize?: string;
  packSize?: string;
  pricePerDozen?: number;
  deliveryMethod?: string;
  deliveryDate?: string;
  paymentMethod?: string;
  history?: OrderStatusEvent[];
}