import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import districtData from "../../data/warehouses.json";

// Fix default icon issue in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// 🔁 Component to control the map
const MapController = ({ target }) => {
  const map = useMap();

  useEffect(() => {
    if (target) {
      map.flyTo([target.latitude, target.longitude], 10, {
        duration: 1.5,
      });
    }
  }, [target, map]);

  return null;
};

const Coverage = () => {
  const [search, setSearch] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();

    const found = districtData.find((d) =>
      d.district.toLowerCase().includes(search.toLowerCase())
    );

    if (found) {
      setSelectedDistrict(found);
    } else {
      alert("District not found!");
    }
  };

  return (
    <div className="min-h-screen bg-base-100 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold text-center text-primary">
          We are available in 64 districts
        </h2>

        {/* 🔍 Search Box */}
        <form
          onSubmit={handleSearch}
          className="flex justify-center gap-4 items-center max-w-lg mx-auto"
        >
          <input
            type="text"
            placeholder="Search district name..."
            className="input input-bordered w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-primary">Search</button>
        </form>

        {/* 🗺 Map */}
        <div className="mt-6 h-[600px] w-full rounded-xl overflow-hidden shadow-lg border">
          <MapContainer
            center={[23.685, 90.3563]}
            zoom={7}
            scrollWheelZoom={true}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* 🚀 Control map fly-to */}
            <MapController target={selectedDistrict} />

            {/* 📍 Render all markers */}
            {districtData.map((district, index) => (
              <Marker
                key={index}
                position={[district.latitude, district.longitude]}
              >
                <Popup
                  autoOpen={district === selectedDistrict ? true : false}
                >
                  <strong>{district.district}</strong>
                  <br />
                  <span className="text-sm text-gray-600">
                    {district.covered_area.join(", ")}
                  </span>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Coverage;
