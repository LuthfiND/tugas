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
  user : User
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

export type ShareSocialMedia = {
  Image : LucideIcon,
  link : string
}
