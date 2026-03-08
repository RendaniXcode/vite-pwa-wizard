import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Order, OrderStatusEvent } from "@/types";
import {
  Clock, CheckCircle, Package, XCircle, PauseCircle,
  User, Truck, CreditCard, FileText, Calendar, Egg
} from "lucide-react";

interface OrderDetailModalProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const STATUS_CONFIG: Record<string, { icon: React.ReactNode; color: string; label: string; bg: string }> = {
  pending: {
    icon: <Clock className="w-4 h-4" />,
    color: "text-app-warning",
    bg: "bg-app-warning/15",
    label: "Pending",
  },
  confirmed: {
    icon: <CheckCircle className="w-4 h-4" />,
    color: "text-app-success",
    bg: "bg-app-success/15",
    label: "Confirmed",
  },
  delivered: {
    icon: <Package className="w-4 h-4" />,
    color: "text-primary",
    bg: "bg-primary/15",
    label: "Delivered",
  },
  cancelled: {
    icon: <XCircle className="w-4 h-4" />,
    color: "text-destructive",
    bg: "bg-destructive/15",
    label: "Cancelled",
  },
  paused: {
    icon: <PauseCircle className="w-4 h-4" />,
    color: "text-orange-600",
    bg: "bg-orange-600/15",
    label: "Paused",
  },
};

function formatDateTime(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function StatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] || STATUS_CONFIG.pending;
  return (
    <Badge className={`${config.bg} ${config.color} border-0 flex items-center gap-1.5 px-3 py-1`}>
      {config.icon}
      <span className="capitalize font-semibold">{config.label}</span>
    </Badge>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground truncate">{value}</p>
      </div>
    </div>
  );
}

function Timeline({ events }: { events: OrderStatusEvent[] }) {
  if (!events || events.length === 0) return null;

  const sorted = [...events].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div className="space-y-0">
      {sorted.map((event, index) => {
        const config = STATUS_CONFIG[event.status] || STATUS_CONFIG.pending;
        const isLast = index === sorted.length - 1;
        const isFirst = index === 0;

        return (
          <div key={index} className="flex gap-3">
            {/* Timeline line and dot */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isFirst ? `${config.bg} ${config.color}` : "bg-muted text-muted-foreground"
                }`}
              >
                {config.icon}
              </div>
              {!isLast && (
                <div className="w-0.5 h-full min-h-[2rem] bg-border" />
              )}
            </div>

            {/* Event content */}
            <div className={`pb-6 flex-1 ${isLast ? "pb-0" : ""}`}>
              <p className={`text-sm font-semibold ${isFirst ? "text-foreground" : "text-muted-foreground"}`}>
                {config.label}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {formatDateTime(event.timestamp)}
                {" · "}
                <span className="capitalize">{event.actor}</span>
              </p>
              {event.note && (
                <p className="text-xs text-foreground mt-1 bg-muted/50 rounded-md px-2 py-1 border border-border">
                  {event.note}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function OrderDetailModal({ order, open, onOpenChange }: OrderDetailModalProps) {
  if (!order) return null;

  // Build timeline from history or fallback to creation event
  const timeline: OrderStatusEvent[] = order.history?.length
    ? order.history
    : [{ status: order.status, timestamp: order.date, actor: "system" as const, note: "Order created" }];

  const totalAmount = order.pricePerDozen && order.quantity
    ? (order.pricePerDozen * order.quantity).toFixed(2)
    : null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto max-h-[85vh] overflow-y-auto rounded-xl">
        <DialogHeader className="space-y-3">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-foreground">
              Order Details
            </DialogTitle>
            <StatusBadge status={order.status} />
          </div>
          <DialogDescription className="text-xs text-muted-foreground">
            Order #{order.id.slice(0, 8).toUpperCase()} · {formatDate(order.date)}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 mt-2">
          {/* Order Summary Card */}
          <div className="bg-gradient-card rounded-xl p-4 border border-border space-y-1">
            <div className="flex justify-between items-baseline">
              <span className="text-3xl font-bold text-foreground">
                {order.quantity}
              </span>
              <span className="text-sm text-muted-foreground">
                dozen{order.quantity !== 1 ? "s" : ""}
              </span>
            </div>
            {totalAmount && (
              <p className="text-lg font-semibold text-primary">
                R {totalAmount}
              </p>
            )}
          </div>

          {/* Order Information */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Information
            </h3>
            <div className="space-y-3">
              <InfoRow
                icon={<User className="w-4 h-4" />}
                label="Supplier"
                value={order.farmerName}
              />
              {order.productName && (
                <InfoRow
                  icon={<Egg className="w-4 h-4" />}
                  label="Product"
                  value={`${order.productName}${order.productSize ? ` · ${order.productSize}` : ""}${order.packSize ? ` · ${order.packSize}` : ""}`}
                />
              )}
              {order.pricePerDozen && (
                <InfoRow
                  icon={<CreditCard className="w-4 h-4" />}
                  label="Price per Dozen"
                  value={`R ${order.pricePerDozen.toFixed(2)}`}
                />
              )}
              {order.deliveryMethod && (
                <InfoRow
                  icon={<Truck className="w-4 h-4" />}
                  label="Delivery"
                  value={`${order.deliveryMethod}${order.deliveryDate ? ` · ${formatDate(order.deliveryDate)}` : ""}`}
                />
              )}
              {order.paymentMethod && (
                <InfoRow
                  icon={<CreditCard className="w-4 h-4" />}
                  label="Payment"
                  value={order.paymentMethod}
                />
              )}
              <InfoRow
                icon={<Calendar className="w-4 h-4" />}
                label="Order Date"
                value={formatDateTime(order.date)}
              />
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground" />
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                    Notes
                  </h3>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 border border-border">
                  <p className="text-sm text-foreground leading-relaxed">{order.notes}</p>
                </div>
              </div>
            </>
          )}

          {/* Timeline */}
          <Separator />
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Order Timeline
            </h3>
            <Timeline events={timeline} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
