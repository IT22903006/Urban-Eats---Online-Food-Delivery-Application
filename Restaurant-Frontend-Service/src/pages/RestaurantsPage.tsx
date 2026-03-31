import { useEffect, useState } from "react";
import { getMyRestaurants } from "../api/restaurantApi";
import { useAuth } from "../hooks/useAuth";
import type { Restaurant } from "../types/restaurant.types";
import RestaurantForm from "../components/restaurant/RestaurantForm";
import { Link } from "react-router-dom";

const RestaurantsPage = () => {
  const { owner, logout } = useAuth();

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      setLoading(true);
      const data = await getMyRestaurants();
      setRestaurants(data.restaurants || []);
    } catch (err) {
      console.error("Error fetching restaurants", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-neutral-950">
              Your restaurants
            </h1>
            <p className="text-sm text-neutral-500">
              {owner?.name} ({owner?.email})
            </p>
          </div>

          <button
            onClick={logout}
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-neutral-950">
              Restaurants
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Create, manage, and control your restaurant details.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="rounded-2xl bg-[#06C167] px-5 py-3 text-sm font-semibold text-white transition hover:brightness-95"
          >
            + Add restaurant
          </button>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-neutral-200 bg-white p-10 text-center text-neutral-500">
            Loading restaurants...
          </div>
        ) : restaurants.length === 0 ? (
          <div className="rounded-3xl border border-neutral-200 bg-white p-12 text-center">
            <h3 className="text-xl font-semibold text-neutral-950">
              No restaurants yet
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-neutral-500">
              Start by creating your first restaurant. You’ll be able to set the
              exact location from the map and manage the menu after that.
            </p>

            <button
              onClick={() => setShowCreateModal(true)}
              className="mt-6 rounded-2xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white"
            >
              Create restaurant
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {restaurants.map((restaurant) => (
              <div
                key={restaurant._id}
                className="rounded-3xl border border-neutral-200 bg-white p-5 transition hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-950">
                      {restaurant.name}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500">
                      {restaurant.cuisine}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      restaurant.isOpen
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {restaurant.isOpen ? "Open" : "Closed"}
                  </span>
                </div>

                <div className="mt-5 space-y-2 text-sm text-neutral-600">
                  <p>
                    <span className="font-medium text-neutral-800">City:</span>{" "}
                    {restaurant.city}
                  </p>
                  <p>
                    <span className="font-medium text-neutral-800">Phone:</span>{" "}
                    {restaurant.phone}
                  </p>
                  <p className="line-clamp-2">
                    <span className="font-medium text-neutral-800">Address:</span>{" "}
                    {restaurant.address}
                  </p>
                </div>

                <div className="mt-5 flex gap-2">
                  <Link
                    to={`/restaurants/${restaurant._id}/manage`}
                    className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
                  >
                    Manage
                  </Link>
                  <Link
                    to={`/restaurants/${restaurant._id}/menu`}
                    className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50"
                  >
                    Menu
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showCreateModal ? (
        <RestaurantForm
          onSuccess={fetchRestaurants}
          onClose={() => setShowCreateModal(false)}
        />
      ) : null}
    </div>
  );
};

export default RestaurantsPage;