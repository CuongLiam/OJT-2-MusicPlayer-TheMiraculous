export enum SubscriptionPlan {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
  ARTIST = 'ARTIST'
}

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED'
}

export interface Subscription {
  id: number;
  user_id: number;
  plan: SubscriptionPlan;
  start_time: string;
  end_time: string;
  status: SubscriptionStatus;
}
