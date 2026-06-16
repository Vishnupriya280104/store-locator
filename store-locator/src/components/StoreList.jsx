import React from "react";
import StoreCard from "./StoreCard";

function StoreList({ stores }) {
  if (!stores || stores.length === 0) return null;

  return (
    <div>
      <p style={{ fontSize: "13px", color: "#6b7280", marginBottom: "12px" }}>
        Showing {stores.length} stores sorted by distance
      </p>
      {stores.map((store, index) => (
        <StoreCard
          key={store.id}
          store={store}
          rank={index + 1}
          isNearest={index === 0}
        />
      ))}
    </div>
  );
}

export default StoreList;
