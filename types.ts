export enum Step {
  LANDING = 'LANDING',
  LOGIN = 'LOGIN',
  GAME = 'GAME',
  FEEDBACK = 'FEEDBACK',
  SHIPPING = 'SHIPPING',
  SUCCESS = 'SUCCESS',
  ORDERS = 'ORDERS',
  PROFILE = 'PROFILE',
  SETTINGS = 'SETTINGS',
}

export interface ShippingInfo {
  name: string;
  initials: string;
  phone: string;
  province: string;
  city: string;
  address: string;
  address2?: string;
  zipCode: string;
  location: string;
}

export interface UserState {
  hasSpun: boolean;
  rating: number;
  feedback: string;
  prize?: string;
  shippingInfo?: ShippingInfo;
}

export interface Order {
  id: number;
  prize: string;
  order_no: string;
  created_at: string;
}
