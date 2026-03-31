export interface MenuCard {
  _id: string;
  restaurantId: string;
  title: string;
  description?: string;
}

export interface MenuItem {
  _id: string;
  menuCardId: string;
  restaurantId: string;
  name: string;
  description?: string;
  category: string;
  price: number;
  isAvailable: boolean;
}