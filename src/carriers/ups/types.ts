// Simplified UPS types for demonstration
export interface UPSRateRequest {
  origin: {
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  destination: {
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  packages: Array<{
    weight: number;
    dimensions: {
      length: number;
      width: number;
      height: number;
    };
  }>;
  service?: string;
}

export interface UPSRateResponse {
  rates: Array<{
    service: string;
    cost: number;
    currency: string;
    deliveryDays: number;
  }>;
}