import { ProductVariant } from "@/types";

export const productVariants: ProductVariant[] = [
  // Small Eggs
  { id: "small-18", name: "Small Eggs (18-count)", size: "Small", packSize: "18-count", basePrice: 8.50 },
  { id: "small-30", name: "Small Eggs (30-count)", size: "Small", packSize: "30-count", basePrice: 14.00 },
  
  // Medium Eggs
  { id: "medium-18", name: "Medium Eggs (18-count)", size: "Medium", packSize: "18-count", basePrice: 10.00 },
  { id: "medium-30", name: "Medium Eggs (30-count)", size: "Medium", packSize: "30-count", basePrice: 16.50 },
  
  // Large Eggs
  { id: "large-18", name: "Large Eggs (18-count)", size: "Large", packSize: "18-count", basePrice: 12.00 },
  { id: "large-30", name: "Large Eggs (30-count)", size: "Large", packSize: "30-count", basePrice: 20.00 },
  
  // Extra Large Eggs
  { id: "xl-18", name: "Extra Large Eggs (18-count)", size: "Extra Large", packSize: "18-count", basePrice: 14.00 },
  { id: "xl-30", name: "Extra Large Eggs (30-count)", size: "Extra Large", packSize: "30-count", basePrice: 23.00 },
  
  // Jumbo Eggs
  { id: "jumbo-18", name: "Jumbo Eggs (18-count)", size: "Jumbo", packSize: "18-count", basePrice: 16.00 },
  { id: "jumbo-30", name: "Jumbo Eggs (30-count)", size: "Jumbo", packSize: "30-count", basePrice: 26.50 },
];