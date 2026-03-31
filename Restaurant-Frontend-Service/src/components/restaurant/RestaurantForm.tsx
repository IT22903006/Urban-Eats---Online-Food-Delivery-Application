import { useState } from "react";
import type { FormEvent } from "react";
import { createRestaurant } from "../../api/restaurantApi";
import RestaurantMapPicker from "./RestaurantMapPicker";

interface RestaurantFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

const RestaurantForm = ({ onSuccess, onClose }: RestaurantFormProps) => {
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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLocationSelect = (lat: number, lng: number) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (latitude === null || longitude === null) {
      setError("Please select the restaurant location from the map.");
      return;
    }

    setLoading(true);

    try {
      await createRestaurant({
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

      onSuccess();
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to create restaurant");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-neutral-200 px-6 py-5">
          <div>
            <h2 className="text-2xl font-bold text-neutral-950">
              Add restaurant
            </h2>
            <p className="mt-1 text-sm text-neutral-500">
              Create a restaurant and pin its exact location on the map.
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
          >
            Close
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-6 p-6 lg:grid-cols-[1fr_1fr]"
        >
          <div className="space-y-4">
            {error ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            ) : null}

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium text-neutral-700">
                  Restaurant name
                </label>
                <input
                  type="text"
                  placeholder="Spice Garden"
                  className="h-14 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none focus:border-neutral-950"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium text-neutral-700">
                  Description
                </label>
                <textarea
                  placeholder="Short description about the restaurant"
                  className="min-h-[110px] w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none focus:border-neutral-950"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">
                  Cuisine
                </label>
                <input
                  type="text"
                  placeholder="Sri Lankan"
                  className="h-14 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none focus:border-neutral-950"
                  value={cuisine}
                  onChange={(e) => setCuisine(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">
                  Phone
                </label>
                <input
                  type="text"
                  placeholder="0771234567"
                  className="h-14 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none focus:border-neutral-950"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="restaurant@example.com"
                  className="h-14 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none focus:border-neutral-950"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-neutral-700">
                  City
                </label>
                <input
                  type="text"
                  placeholder="Colombo"
                  className="h-14 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none focus:border-neutral-950"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium text-neutral-700">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="123 Main Street"
                  className="h-14 w-full rounded-2xl border border-neutral-200 px-4 text-sm outline-none focus:border-neutral-950"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-neutral-900">
                    Restaurant status
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    Set whether the restaurant is currently open.
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

            <button
              type="submit"
              disabled={loading}
              className="flex h-14 w-full items-center justify-center rounded-2xl bg-[#06C167] px-4 text-sm font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
            >
              {loading ? "Creating restaurant..." : "Create restaurant"}
            </button>
          </div>

          <div>
            <RestaurantMapPicker
              latitude={latitude}
              longitude={longitude}
              onLocationSelect={handleLocationSelect}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestaurantForm;