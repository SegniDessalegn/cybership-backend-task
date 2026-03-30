export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface Package {
  weight: number; // in lbs
  length: number; // in inches
  width: number;
  height: number;
}

export interface RateRequest {
  origin: Address;
  destination: Address;
  packages: Package[];
  serviceLevel?: string; // optional, like 'GROUND', 'AIR', etc.
}

export interface Rate {
  service: string;
  cost: number;
  currency: string;
  estimatedDelivery: string; // ISO date string
}

export interface RateResponse {
  rates: Rate[];
}

export interface AuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  issued_at: number;
}