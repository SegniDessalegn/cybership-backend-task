import axios, { AxiosInstance } from 'axios';
import { ICarrier } from '../index';
import { RateRequest, RateResponse, Rate, Package } from '../../domain/types';
import { ValidatedRateRequest, RateRequestSchema } from '../../domain/validation';
import { ValidationError, NetworkError, CarrierError } from '../../errors';
import { UPSAuth } from './UPSAuth';
import { UPSRateRequest, UPSRateResponse } from './types';
import { config } from '../../config';

export class UPSCarrier implements ICarrier {
  private http: AxiosInstance;
  private auth: UPSAuth;

  constructor() {
    this.http = axios.create({ baseURL: config.ups.baseUrl, timeout: 10000 });
    this.auth = new UPSAuth();
  }

  async getRates(request: RateRequest): Promise<RateResponse> {
    const validated: ValidatedRateRequest = RateRequestSchema.parse(request);
    const upsRequest = this.buildUPSRequest(validated);
    const token = await this.auth.getToken();

    try {
      const response = await this.http.post('/api/rating/v1/Rate', upsRequest, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return this.parseUPSResponse(response.data);
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 401) {
          throw new ValidationError('Invalid credentials or token expired');
        }
        throw new CarrierError(`UPS API error: ${JSON.stringify(error.response.data)}`, 'API_ERROR', error.response.status);
      }
      if (error.code === 'ECONNABORTED') {
        throw new NetworkError('Request timeout');
      }
      throw new NetworkError('Network error');
    }
  }

  private buildUPSRequest(request: ValidatedRateRequest): UPSRateRequest {
    return {
      origin: {
        address: request.origin.street,
        city: request.origin.city,
        state: request.origin.state,
        zip: request.origin.zip,
        country: request.origin.country,
      },
      destination: {
        address: request.destination.street,
        city: request.destination.city,
        state: request.destination.state,
        zip: request.destination.zip,
        country: request.destination.country,
      },
      packages: request.packages.map((pkg: Package) => ({
        weight: pkg.weight,
        dimensions: { length: pkg.length, width: pkg.width, height: pkg.height },
      })),
      service: request.serviceLevel,
    };
  }

  private parseUPSResponse(data: UPSRateResponse): RateResponse {
    const rates: Rate[] = data.rates.map((rate) => ({
      service: rate.service,
      cost: rate.cost,
      currency: rate.currency,
      estimatedDelivery: rate.deliveryDays.toString(),
    }));

    return { rates };
  }
}
