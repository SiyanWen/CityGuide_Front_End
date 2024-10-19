import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import { useMapsLibrary, useMap } from "@vis.gl/react-google-maps";

const RoutesRender = () => {
  const map = useMap();
  const routesLib = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  useEffect(() => {
    if (!routesLib || !map) return;
    setDirectionsService(new routesLib.DirectionsService());
    setDirectionsRenderer(new routesLib.DirectionsRenderer({ map }));
  }, [routesLib, map]);

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return;

    directionsService
      .route({
        origin: "Space Needle, 400 Broad St, Seattle",
        destination: "Seattle Aquarium, 1483 Alaskan Way Pier 59, Seattle",
        travelMode: 'DRIVING',
        provideRouteAlternatives: true,
      })
      .then((response) => {
        // console.log(response);
        // console.log(JSON.stringify(response));
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });

    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="directions">
      <h2>{selected.summary}</h2>
      <p>
        {leg.start_address.split(',')[0]} to {leg.end_address.split(',')[0]}
      </p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>

      <h2>Other Routes</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={route.summary}>
            <button onClick={() => setRouteIndex(index)}>
              {route.summary}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoutesRender;
