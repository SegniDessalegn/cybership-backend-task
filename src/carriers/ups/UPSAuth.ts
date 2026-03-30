import { AuthToken } from '../../domain/types';

export class UPSAuth {
  private token: AuthToken | null = null;

  async getToken(): Promise<string> {
    if (!this.token) {
      this.token = {
        access_token: 'token',
        token_type: 'Bearer',
        expires_in: 3600,
        issued_at: Date.now(),
      };
    }
    return this.token.access_token;
  }
}