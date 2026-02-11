
export enum Step {
  LANDING = 'LANDING',
  GAME = 'GAME',
  FEEDBACK = 'FEEDBACK',
  SHIPPING = 'SHIPPING',
  SUCCESS = 'SUCCESS',
  ORDERS = 'ORDERS',
  PROFILE = 'PROFILE',
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
