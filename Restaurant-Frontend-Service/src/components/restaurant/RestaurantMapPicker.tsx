import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { useMemo } from "react";
import L from "leaflet";

interface RestaurantMapPickerProps {
  latitude: number | null;
  longitude: number | null;
  onLocationSelect: (lat: number, lng: number) => void;
}

const markerIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function MapClickHandler({
  onLocationSelect,
}: {
  onLocationSelect: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng.lat, e.latlng.lng);
    },
  });

  return null;
}

const RestaurantMapPicker = ({
  latitude,
  longitude,
  onLocationSelect,
}: RestaurantMapPickerProps) => {
  const center = useMemo<[number, number]>(() => {
    if (latitude !== null && longitude !== null) {
      return [latitude, longitude];
    }

    return [6.9271, 79.8612];
  }, [latitude, longitude]);

  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
      <div className="border-b border-neutral-200 px-4 py-3">
        <h3 className="text-sm font-semibold text-neutral-900">
          Pick restaurant location
        </h3>
        <p className="mt-1 text-xs text-neutral-500">
          Click anywhere on the map to set latitude and longitude.
        </p>
      </div>

      <div className="h-[320px] w-full">
        <MapContainer
          center={center}
          zoom={13}
          scrollWheelZoom
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapClickHandler onLocationSelect={onLocationSelect} />

          {latitude !== null && longitude !== null ? (
            <Marker position={[latitude, longitude]} icon={markerIcon} />
          ) : null}
        </MapContainer>
      </div>

      <div className="grid grid-cols-2 gap-3 border-t border-neutral-200 px-4 py-3 text-sm">
        <div className="rounded-xl bg-neutral-50 px-3 py-2">
          <p className="text-xs text-neutral-500">Latitude</p>
          <p className="mt-1 font-medium text-neutral-900">
            {latitude !== null ? latitude.toFixed(6) : "Not selected"}
          </p>
        </div>

        <div className="rounded-xl bg-neutral-50 px-3 py-2">
          <p className="text-xs text-neutral-500">Longitude</p>
          <p className="mt-1 font-medium text-neutral-900">
            {longitude !== null ? longitude.toFixed(6) : "Not selected"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMapPicker;