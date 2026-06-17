import React, { useState, useCallback } from "react";
import Map from "./components/Map";
import StoreList from "./components/StoreList";
import storesData from "./data/stores";
import { sortStoresByDistance } from "./utils/distance";
import "./App.css";

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [sortedStores, setSortedStores] = useState(storesData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [manualInput, setManualInput] = useState("");

  // GPS auto-detect
  const handleDetectLocation = useCallback(() => {
    setError("");
    setLoading(true);
    if (!navigator.geolocation) {
      setError("Your browser does not support location detection.");
      setLoading(false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        setSortedStores(sortStoresByDistance(storesData, loc.lat, loc.lng));
        setSearched(true);
        setLoading(false);
      },
      () => {
        setError("Location access denied. Please allow location or use manual search.");
        setLoading(false);
      }
    );
  }, []);

  // Manual lat,lng input (for demo/testing)
  const handleManualSearch = useCallback(() => {
    setError("");
    const parts = manualInput.split(",").map((s) => parseFloat(s.trim()));
    if (parts.length !== 2 || isNaN(parts[0]) || isNaN(parts[1])) {
      setError("Please enter coordinates as: latitude, longitude  (e.g. 12.9716, 77.5946)");
      return;
    }
    const loc = { lat: parts[0], lng: parts[1] };
    setUserLocation(loc);
    setSortedStores(sortStoresByDistance(storesData, loc.lat, loc.lng));
    setSearched(true);
  }, [manualInput]);

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", background: "#f8fafc" }}>
      {/* Header */}
      <header
        style={{
          background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
          color: "white",
          padding: "20px 32px",
          boxShadow: "0 2px 8px rgba(99,102,241,0.3)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "22px", fontWeight: "700" }}>🏪 Store Locator</h1>
        <p style={{ margin: "4px 0 0", fontSize: "13px", opacity: 0.85 }}>
          Find the nearest store to you across Bengaluru
        </p>
      </header>

      {/* Search Bar */}
      <div
        style={{
          background: "white",
          padding: "20px 32px",
          borderBottom: "1px solid #e5e7eb",
          display: "flex",
          gap: "12px",
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {/* GPS Button */}
        <button
          onClick={handleDetectLocation}
          disabled={loading}
          style={{
            background: loading ? "#a5b4fc" : "#6366f1",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "10px 20px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            transition: "background 0.2s",
          }}
        >
          {loading ? "⏳ Detecting..." : "📍 Use My Location"}
        </button>

        <span style={{ alignSelf: "center", color: "#9ca3af", fontSize: "13px" }}>or</span>

        {/* Manual Input */}
        <div style={{ display: "flex", gap: "8px", flex: 1, minWidth: "260px" }}>
          <input
            type="text"
            placeholder="Enter coordinates: 12.9716, 77.5946"
            value={manualInput}
            onChange={(e) => setManualInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleManualSearch()}
            style={{
              flex: 1,
              padding: "10px 14px",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              fontSize: "14px",
              outline: "none",
            }}
          />
          <button
            onClick={handleManualSearch}
            style={{
              background: "#f3f4f6",
              border: "1px solid #d1d5db",
              borderRadius: "8px",
              padding: "10px 16px",
              fontSize: "14px",
              cursor: "pointer",
              fontWeight: "600",
              color: "#374151",
            }}
          >
            Search
          </button>
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              width: "100%",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#b91c1c",
              borderRadius: "8px",
              padding: "10px 14px",
              fontSize: "13px",
            }}
          >
            ⚠️ {error}
          </div>
        )}
      </div>

      {/* Main Content */}
<div
  style={{
    display: "flex",
    flexDirection: window.innerWidth < 768 ? "column-reverse" : "row",
    height: "calc(100vh - 160px)",
  }}
>
  {/* Map - shows on top in mobile */}
  <div
    style={{
      flex: window.innerWidth < 768 ? "none" : 1,
      height: window.innerWidth < 768 ? "40vh" : "100%",
      position: "relative",
    }}
  >
    <Map
      stores={searched ? sortedStores : storesData}
      userLocation={userLocation}
    />
  </div>

  {/* Store List - shows below map in mobile */}
  <div
    style={{
      width: window.innerWidth < 768 ? "100%" : "380px",
      height: window.innerWidth < 768 ? "60vh" : "100%",
      overflowY: "auto",
      padding: "16px",
      background: "#f8fafc",
      borderTop: window.innerWidth < 768 ? "1px solid #e5e7eb" : "none",
      borderLeft: window.innerWidth < 768 ? "none" : "1px solid #e5e7eb",
      flexShrink: 0,
    }}
  >
    {!searched ? (
      <div style={{ textAlign: "center", marginTop: "40px", color: "#9ca3af" }}>
        <p style={{ fontSize: "40px", margin: 0 }}>🗺️</p>
        <p style={{ fontSize: "15px", marginTop: "12px" }}>
          Use your location or enter coordinates to find nearby stores
        </p>
      </div>
    ) : (
      <StoreList stores={sortedStores} />
    )}
  </div>

        {/* Left: Store List */}
        <div
          style={{
            width: window.innerWidth < 768 ? "100%" : "380px",
            height: window.innerWidth < 768 ? "auto" : "auto",
            overflowY: "auto",
            padding: "20px 16px",
            background: "#f8fafc",
            borderRight: window.innerWidth < 768 ? "none" : "1px solid #e5e7eb",
            borderBottom: window.innerWidth < 768 ? "1px solid #e5e7eb" : "none",
            flexShrink: 0,
          }}
        >
        
          {!searched ? (
            <div style={{ textAlign: "center", marginTop: "60px", color: "#9ca3af" }}>
              <p style={{ fontSize: "40px", margin: 0 }}>🗺️</p>
              <p style={{ fontSize: "15px", marginTop: "12px" }}>
                Use your location or enter coordinates to find nearby stores
              </p>
            </div>
          ) : (
            <StoreList stores={sortedStores} />
          )}
        </div>

        {/* Right: Map */}
        <div style={{ 
          flex: 1, 
          position: "relative",
          height: window.innerWidth < 768 ? "400px" : "auto",
          minHeight: "350px",
        }}>
          <Map
            stores={searched ? sortedStores : storesData}
            userLocation={userLocation}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
