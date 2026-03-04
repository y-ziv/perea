import mongoose, { Schema, type Document, type Types } from "mongoose";

export interface IOrderItem {
  wineId: Types.ObjectId;
  wineSlug: string;
  name: string;
  priceAgorot: number;
  quantity: number;
}

export interface IOrder extends Document {
  orderId: string;
  status: "PENDING" | "PAID" | "FAILED";
  items: IOrderItem[];
  totalAgorot: number;
  customer: {
    name: string;
    phone: string;
    email: string;
    address?: string;
    notes?: string;
  };
  deliveryMethod: "pickup" | "shipping";
  lowProfileCode?: string;
  cardcomTransactionId?: string;
  paymentVerifiedAt?: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    wineId: { type: Schema.Types.ObjectId, required: true, ref: "Wine" },
    wineSlug: { type: String, required: true },
    name: { type: String, required: true },
    priceAgorot: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, required: true, unique: true, index: true },
    status: {
      type: String,
      required: true,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },
    items: { type: [OrderItemSchema], required: true },
    totalAgorot: { type: Number, required: true, min: 0 },
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
      address: { type: String },
      notes: { type: String },
    },
    deliveryMethod: {
      type: String,
      required: true,
      enum: ["pickup", "shipping"],
    },
    lowProfileCode: { type: String },
    cardcomTransactionId: { type: String },
    paymentVerifiedAt: { type: Date },
  },
  { timestamps: true }
);

export const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);
