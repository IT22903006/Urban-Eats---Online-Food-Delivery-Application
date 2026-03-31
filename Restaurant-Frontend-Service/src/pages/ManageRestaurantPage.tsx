import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteRestaurant,
  getRestaurantById,
  updateRestaurant,
} from "../api/restaurantApi";
import RestaurantMapPicker from "../components/restaurant/RestaurantMapPicker";
import type { Restaurant } from "../types/restaurant.types";

const ManageRestaurantPage = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();

  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    if (restaurantId) {
      fetchRestaurant();
    }
  }, [restaurantId]);

  const fetchRestaurant = async () => {
    if (!restaurantId) return;

    try {
      setLoading(true);
      setError("");

      const data = await getRestaurantById(restaurantId);
      const r: Restaurant = data.restaurant;

      setRestaurant(r);
      setName(r.name);
      setDescription(r.description || "");
      setCuisine(r.cuisine);
      setPhone(r.phone);
      setEmail(r.email || "");
      setAddress(r.address);
      setCity(r.city);
      setLatitude(r.latitude);
      setLongitude(r.longitude);
      setIsOpen(r.isOpen);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch restaurant");
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  const handleSave = async () => {
    if (!restaurantId) return;

    if (latitude === null || longitude === null) {
      setError("Please select the restaurant location from the map.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      const data = await updateRestaurant(restaurantId, {
        name,
        description,
        cuisine,
        phone,
        email,
        address,
        city,
        latitude,
        longitude,
        isOpen,
      });

      setRestaurant(data.restaurant);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to update restaurant");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!restaurantId) return;

    const confirmed = window.confirm(
      "Are you sure you want to delete this restaurant?"
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      setError("");

      await deleteRestaurant(restaurantId);
      navigate("/restaurants");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to delete restaurant");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f6]">
      <div className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div>
            <h1 className="text-xl font-bold text-neutral-950">
              Manage Restaurant
            </h1>
            <p className="text-sm text-neutral-500">
              Edit restaurant details, location, and availability
            </p>
          </div>

          <div className="flex gap-2">
            {restaurantId ? (
              <Link
                to={`/restaurants/${restaurantId}/menu`}
                className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
              >
                Go to menu
              </Link>
            ) : null}

            <Link
              to="/restaurants"
              className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              Back
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {error ? (
          <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="rounded-3xl border border-neutral-200 bg-white p-10 text-center text-neutral-500">
            Loading restaurant...
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-6">
              <div className="rounded-3xl border border-neutral-200 bg-white p-6">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm text-neutral-500">Restaurant</p>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-neutral-950">
                      {restaurant?.name || "Restaurant"}
                    </h2>
                    <p className="mt-2 text-sm text-neutral-500">
                      Update the core business information below
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      isOpen
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {isOpen ? "Open" : "Closed"}
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Restaurant name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="h-14 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none focus:border-neutral-950"
                      placeholder="Restaurant name"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Description
                    </label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="min-h-[110px] w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-950"
                      placeholder="Short description"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Cuisine
                    </label>
                    <input
                      type="text"
                      value={cuisine}
                      onChange={(e) => setCuisine(e.target.value)}
                      className="h-14 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none focus:border-neutral-950"
                      placeholder="Cuisine"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Phone
                    </label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="h-14 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none focus:border-neutral-950"
                      placeholder="Phone"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none focus:border-neutral-950"
                      placeholder="Email"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-neutral-700">
                      City
                    </label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="h-14 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none focus:border-neutral-950"
                      placeholder="City"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-sm font-medium text-neutral-700">
                      Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="h-14 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none focus:border-neutral-950"
                      placeholder="Address"
                    />
                  </div>
                </div>

                <div className="mt-6 rounded-2xl border border-neutral-200 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-neutral-900">
                        Availability status
                      </p>
                      <p className="mt-1 text-xs text-neutral-500">
                        Toggle whether this restaurant is currently open
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsOpen((prev) => !prev)}
                      className={`inline-flex rounded-full px-4 py-2 text-sm font-medium ${
                        isOpen
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {isOpen ? "Open" : "Closed"}
                    </button>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex h-14 flex-1 items-center justify-center rounded-2xl bg-[#06C167] px-4 text-sm font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
                  >
                    {saving ? "Saving changes..." : "Save changes"}
                  </button>

                  <button
                    onClick={handleDelete}
                    disabled={deleting}
                    className="flex h-14 items-center justify-center rounded-2xl border border-red-200 px-6 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-60"
                  >
                    {deleting ? "Deleting..." : "Delete restaurant"}
                  </button>
                </div>
              </div>
            </div>

            <div>
              <RestaurantMapPicker
                latitude={latitude}
                longitude={longitude}
                onLocationSelect={handleLocationSelect}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageRestaurantPage;