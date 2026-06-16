import React from "react";
import { getTravelTime } from "../utils/distance";

function StoreCard({ store, rank, isNearest }) {
  return (
    <div
      style={{
        background: isNearest ? "#f0fdf4" : "#ffffff",
        border: isNearest ? "2px solid #16a34a" : "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "16px",
        marginBottom: "12px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.07)",
        transition: "transform 0.15s",
        cursor: "default",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
            <span
              style={{
                background: isNearest ? "#16a34a" : "#6366f1",
                color: "white",
                borderRadius: "50%",
                width: "24px",
                height: "24px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                fontWeight: "bold",
                flexShrink: 0,
              }}
            >
              {rank}
            </span>
            <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "600", color: "#111827" }}>
              {store.name}
            </h3>
            {isNearest && (
              <span
                style={{
                  background: "#dcfce7",
                  color: "#15803d",
                  fontSize: "11px",
                  padding: "2px 8px",
                  borderRadius: "999px",
                  fontWeight: "600",
                }}
              >
                Nearest
              </span>
            )}
            <span
              style={{
                background: "#ede9fe",
                color: "#6d28d9",
                fontSize: "11px",
                padding: "2px 8px",
                borderRadius: "999px",
              }}
            >
              {store.type}
            </span>
          </div>
          <p style={{ margin: "4px 0", fontSize: "13px", color: "#6b7280" }}>📍 {store.address}</p>
          <p style={{ margin: "4px 0", fontSize: "13px", color: "#6b7280" }}>📞 {store.phone}</p>
          <p style={{ margin: "4px 0", fontSize: "13px", color: "#6b7280" }}>🕐 {store.hours}</p>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0, marginLeft: "12px" }}>
          <p style={{ margin: 0, fontSize: "20px", fontWeight: "700", color: "#111827" }}>
            {store.distance.toFixed(1)} km
          </p>
          <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#9ca3af" }}>
            {getTravelTime(store.distance)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default StoreCard;
