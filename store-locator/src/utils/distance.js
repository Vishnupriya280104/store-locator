// Haversine formula — calculates straight-line distance between two GPS points
export function getDistanceKm(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg) {
  return deg * (Math.PI / 180);
}

// Estimate travel time (assumes avg 25 km/h in city traffic)
export function getTravelTime(distanceKm) {
  const avgSpeedKmh = 25;
  const minutes = Math.round((distanceKm / avgSpeedKmh) * 60);
  if (minutes < 60) return `~${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `~${hours}h ${mins}min`;
}

// Sort stores by distance from user
export function sortStoresByDistance(stores, userLat, userLng) {
  return stores
    .map((store) => ({
      ...store,
      distance: getDistanceKm(userLat, userLng, store.lat, store.lng),
    }))
    .sort((a, b) => a.distance - b.distance);
}