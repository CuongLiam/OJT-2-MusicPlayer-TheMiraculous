export enum PaymentMethod {
  PAYPAL = 'PAYPAL',
  CREDIT_CARD = 'CREDIT_CARD',
  MOMO = 'MOMO',
  ZALO_PAY = 'ZALO_PAY'
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export interface Payment {
  id: number;
  user_id: number;
  plan_id: number;
  transaction_id: string;
  amount: number;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  payment_date: string;
}
