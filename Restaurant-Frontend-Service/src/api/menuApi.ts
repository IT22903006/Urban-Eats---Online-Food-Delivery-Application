import api from "./axios";

export const getMenuCardByRestaurant = async (restaurantId: string) => {
  const response = await api.get(`/restaurants/${restaurantId}/menu-card`);
  return response.data;
};

export const createMenuCard = async (
  restaurantId: string,
  data: { title: string; description?: string }
) => {
  const response = await api.post(`/restaurants/${restaurantId}/menu-card`, data);
  return response.data;
};

export const getMenuItemsByRestaurant = async (restaurantId: string) => {
  const response = await api.get(`/restaurants/${restaurantId}/menu-items`);
  return response.data;
};

export const createMenuItem = async (
  restaurantId: string,
  data: {
    name: string;
    description?: string;
    category: string;
    price: number;
    isAvailable: boolean;
  }
) => {
  const response = await api.post(`/restaurants/${restaurantId}/menu-items`, data);
  return response.data;
};

export const updateMenuItem = async (
  restaurantId: string,
  itemId: string,
  data: {
    name: string;
    description?: string;
    category: string;
    price: number;
    isAvailable: boolean;
  }
) => {
  const response = await api.put(
    `/restaurants/${restaurantId}/menu-items/${itemId}`,
    data
  );
  return response.data;
};

export const deleteMenuItem = async (restaurantId: string, itemId: string) => {
  const response = await api.delete(
    `/restaurants/${restaurantId}/menu-items/${itemId}`
  );
  return response.data;
};