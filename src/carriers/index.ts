import { RateRequest, RateResponse } from '../domain/types';

export interface ICarrier {
  getRates(request: RateRequest): Promise<RateResponse>;
}