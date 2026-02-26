
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

export interface UserState {
  hasSpun: boolean;
  prize?: string;
  rating: number;
  feedback: string;
  shippingInfo?: {
    name: string;
    phone: string;
    province: string;
    city: string;
    address: string;
    zipCode: string;
  };
}
