import { LucideIcon } from "lucide-react";

export interface Event {
  id: number;
  title: string;
  description: string;
  thumbnail_url: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  limit: number;
  isAvailable: boolean;
  start_date: string;
  end_date: string;
  time: string;
  location: string;
  address: string;
  category: string;
  price: number;
  userId: number;
  user : User,
  Voucher : Voucher[]

}

 type User = {
  id: number;
  fullName: string;
  email: string;
  password: string;
  avatar: string | null;
  role: string;
  createdAt: string;
  updatedAt: string;
  referralCode: string;
  point: number;
  pointExpiredDate: string;
  userReward: boolean;
};

export type Voucher = {
  id: number;
  code: string;
  discountAmount: number;
  limit: number;
  expirationDate: string; 
  createdAt: string;     
  updatedAt: string;    
  userId: number;
  eventId: number;
};

export type ShareSocialMedia = {
  Image : LucideIcon,
  link : string
}

export type MoreInformation = {
  Image  : LucideIcon
  text : string
  desc  : string
}

export type TCoupon = {
  id: number;
  code: string;
  expirationDate: string;
  discountAmount: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  isUse: boolean;
}



export type Transaction = {
  id: number;
  invoice: string;
  createdAt: string;
  updatedAt: string;
  status: "EXPIRED" | "PENDING" | "PAID" | "CANCELLED";
  total: number;
  userId: number;
  eventId: number;
  paymentProof: string;
  userCouponId: number | null;
  userVoucherId: number | null;
  qty: number;
  isPointUse: boolean;
  isUseCoupon: boolean;
  isUseVoucher: boolean;
  user: User;
  event: Event;
};
