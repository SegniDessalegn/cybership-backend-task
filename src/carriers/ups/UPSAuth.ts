import { AuthToken } from '../../domain/types';

export class UPSAuth {
  private token: AuthToken | null = null;

  async getToken(): Promise<string> {
    if (this.token && this.isTokenValid()) {
      return this.token.access_token;
    }

    // Simple mocked auth flow (no real HTTP call).
    this.token = {
      access_token: 'mocked-token',
      token_type: 'Bearer',
      expires_in: 3600,
      issued_at: Date.now(),
    };

    return this.token.access_token;
  }

  private isTokenValid(): boolean {
    if (!this.token) return false;
    const expiresAt = this.token.issued_at + this.token.expires_in * 1000;
    return Date.now() < expiresAt - 60000;
  }
}

