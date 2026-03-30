import { useState, useMemo } from 'react';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

export default function WorldMap({ geoData }) {
  const [hoveredCountry, setHoveredCountry] = useState(null);
  const maxAttacks = useMemo(() => Math.max(...geoData.map(g => g.attacks)), [geoData]);

  return (
    <div className="w-full h-full">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 110, center: [0, 35] }}
        width={800}
        height={450}
        style={{ width: "100%", height: "100%" }}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: { fill: "#1a1c1e", outline: "none", stroke: "#3b4a3f", strokeWidth: 0.3 },
                  hover: { fill: "#282a2c", outline: "none", stroke: "#00ff9d", strokeWidth: 0.5 },
                  pressed: { fill: "#282a2c", outline: "none", stroke: "#00ff9d", strokeWidth: 0.5 },
                }}
              />
            ))
          }
        </Geographies>

        {geoData.map((loc, i) => {
          const intensity = loc.attacks / maxAttacks;
          const dotR = 2 + intensity * 6;
          const color = intensity > 0.6 ? '#ffb4ab' : intensity > 0.3 ? '#00ff9d' : '#00e3fd';
          const isHovered = hoveredCountry === loc.country;

          return (
            <Marker
              key={loc.country}
              coordinates={[loc.lng, loc.lat]}
              onMouseEnter={() => setHoveredCountry(loc.country)}
              onMouseLeave={() => setHoveredCountry(null)}
            >
              <circle
                r={dotR * (isHovered ? 2 : 1)}
                fill={color}
                opacity={0.5}
                className={isHovered ? '' : 'animate-pulse'}
              />
              <circle
                r={dotR * 0.4}
                fill="#ffffff"
                opacity={0.9}
              />

              {isHovered && (
                <g className="pointer-events-none">
                  <rect
                    x={10} y={-35}
                    width={140} height="40"
                    fill="#121416"
                    stroke={color}
                    strokeWidth="1"
                    className="opacity-90"
                    rx="2"
                  />
                  <text x={20} y={-22} fill="#e2e2e5" fontSize="10" className="font-headline">
                    {loc.country}
                  </text>
                  <text x={20} y={-8} fill={color} fontSize="10" className="font-body font-bold">
                    {loc.attacks.toLocaleString()} ATTACKS
                  </text>
                </g>
              )}
            </Marker>
          );
        })}
      </ComposableMap>
    </div>
  );
}
