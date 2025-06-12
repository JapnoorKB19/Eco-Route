import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";

export default function PlanRoute() {
  const [formData, setFormData] = useState({
    distance_km: "",
    elevation_gain_m: "",
    traffic_level: "",
    vehicle_type: "electric",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          distance_km: parseFloat(formData.distance_km),
          elevation_gain_m: parseFloat(formData.elevation_gain_m),
          traffic_level: parseFloat(formData.traffic_level),
          vehicle_type: formData.vehicle_type,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-8">
      <h2 className="text-2xl font-bold mb-4">Plan Your Eco Route</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Distance (km)</label>
          <input
            type="number"
            step="any"
            name="distance_km"
            value={formData.distance_km}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Elevation Gain (m)</label>
          <input
            type="number"
            step="any"
            name="elevation_gain_m"
            value={formData.elevation_gain_m}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Traffic Level (0-10)</label>
          <input
            type="number"
            step="any"
            min="0"
            max="10"
            name="traffic_level"
            value={formData.traffic_level}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-medium">Vehicle Type</label>
          <select
            name="vehicle_type"
            value={formData.vehicle_type}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="electric">Electric</option>
            <option value="petrol">Petrol</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {loading ? "Calculating..." : "Get Prediction"}
        </button>
      </form>

      {error && <p className="text-red-600 mt-4">{error}</p>}

      {result && (
        <div className="mt-6 p-4 bg-green-100 rounded">
          <p><strong>Estimated Fuel Used (L):</strong> {result.fuel_used_l}</p>
          <p><strong>Estimated CO₂ Emissions (kg):</strong> {result.co2_emitted_kg}</p>
        </div>
      )}
    </div>
  );
}
