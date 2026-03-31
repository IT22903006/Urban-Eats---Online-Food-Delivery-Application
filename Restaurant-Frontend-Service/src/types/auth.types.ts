export interface Owner {
  id: string;
  name: string;
  email: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  owner: Owner;
}