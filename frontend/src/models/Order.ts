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
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    wineId: { type: Schema.Types.ObjectId, required: true, ref: "Wine" },
    wineSlug: { type: String, required: true },
    name: { type: String, required: true },
    priceAgorot: { type: Number, required: true, min: 1 },
    quantity: { type: Number, required: true, min: 1, max: 100 },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    orderId: { type: String, required: true, unique: true },
    status: {
      type: String,
      required: true,
      enum: ["PENDING", "PAID", "FAILED"],
      default: "PENDING",
    },
    items: {
      type: [OrderItemSchema],
      required: true,
      validate: {
        validator: (v: IOrderItem[]) => v.length > 0,
        message: "Order must have at least one item",
      },
    },
    totalAgorot: { type: Number, required: true, min: 0 },
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      email: {
        type: String,
        required: true,
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
      },
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

OrderSchema.index({ status: 1, createdAt: -1 });
OrderSchema.index({ lowProfileCode: 1 });

export const Order =
  (mongoose.models.Order as mongoose.Model<IOrder>) ||
  mongoose.model<IOrder>("Order", OrderSchema);
