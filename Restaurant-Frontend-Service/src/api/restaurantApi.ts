import api from "./axios";

export const getMyRestaurants = async () => {
  const response = await api.get("/restaurants");
  return response.data;
};

export const getRestaurantById = async (restaurantId: string) => {
  const response = await api.get(`/restaurants/${restaurantId}`);
  return response.data;
};

export const createRestaurant = async (data: {
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
}) => {
  const response = await api.post("/restaurants", data);
  return response.data;
};

export const updateRestaurant = async (
  restaurantId: string,
  data: {
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
) => {
  const response = await api.put(`/restaurants/${restaurantId}`, data);
  return response.data;
};

export const deleteRestaurant = async (restaurantId: string) => {
  const response = await api.delete(`/restaurants/${restaurantId}`);
  return response.data;
};