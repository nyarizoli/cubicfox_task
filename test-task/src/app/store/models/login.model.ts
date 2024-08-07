export interface LoginCredentials {
  client_id: string;
  client_secret: string;
}

export interface TokenResponse {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
}
