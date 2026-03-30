export class CarrierError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'CarrierError';
  }
}

export class AuthError extends CarrierError {
  constructor(message: string) {
    super(message, 'AUTH_ERROR', 401);
  }
}

export class ValidationError extends CarrierError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400);
  }
}

export class NetworkError extends CarrierError {
  constructor(message: string) {
    super(message, 'NETWORK_ERROR', 500);
  }
}