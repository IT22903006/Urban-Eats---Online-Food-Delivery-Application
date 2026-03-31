export interface Restaurant {
  _id: string;
  name: string;
  description?: string;
  cuisine: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  isOpen: boolean;
}