"use client";

import { Map as MapLibre } from "@vis.gl/react-maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

interface MapContainerProps {
  initialViewState?: {
    longitude: number;
    latitude: number;
    zoom: number;
  };
  mapStyle?: string;
  children?: React.ReactNode;
}

export default function MapContainer({
  initialViewState = {
    longitude: -100,
    latitude: 40,
    zoom: 3.5,
  },
  mapStyle = "https://demotiles.maplibre.org/style.json",
  children,
}: MapContainerProps) {
  return (
    <div className="relative w-full h-full bg-black rounded-lg overflow-hidden border border-blue-900/30 shadow-2xl">
      <MapLibre
        initialViewState={initialViewState}
        style={{ width: "100%", height: "100%" }}
        mapStyle={mapStyle}
      >
        {children}
      </MapLibre>

      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <button
          type="button"
          className="w-10 h-10 bg-black/80 backdrop-blur-sm border border-blue-500/50 rounded-md flex items-center justify-center text-blue-400 hover:bg-blue-900/30 hover:text-blue-300 hover:border-blue-400 transition-all duration-200 shadow-lg"
          onClick={() => {}}
          aria-label="Zoom in"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v12m6-6H6"
            />
          </svg>
        </button>
        <button
          type="button"
          className="w-10 h-10 bg-black/80 backdrop-blur-sm border border-blue-500/50 rounded-md flex items-center justify-center text-blue-400 hover:bg-blue-900/30 hover:text-blue-300 hover:border-blue-400 transition-all duration-200 shadow-lg"
          onClick={() => {}}
          aria-label="Zoom out"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20 12H4"
            />
          </svg>
        </button>
      </div>

      <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm border border-yellow-600/30 rounded px-3 py-2">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          <span className="text-xs text-yellow-400 font-medium">
            GeoHub Dashboard
          </span>
        </div>
      </div>
    </div>
  );
}
