'use client';

import type { PortOfCall } from '@/types';

// Port coordinates [latitude, longitude]
const PORT_COORDS: Record<string, [number, number]> = {
  'Yokohama': [35.44, 139.64],
  'Tokyo': [35.65, 139.84],
  'Shimizu': [35.02, 138.49],
  'Shimoda': [34.67, 138.95],
  'Kochi': [33.50, 133.53],
  'Iwakuni': [34.17, 132.22],
  'Kagoshima': [31.60, 130.55],
  'Ishigaki': [24.34, 124.16],
  'Miyakojima': [24.79, 125.28],
  'Naha': [26.21, 127.67],
  'Tateyama Bay': [34.98, 139.87],
  'Gamagori': [34.83, 137.22],
  'Ofunato': [39.08, 141.72],
  'Aomori': [40.82, 140.74],
  'Ishinomaki': [38.43, 141.30],
  'Hakodate': [41.77, 140.73],
  'Fushiki': [36.79, 137.06],
  'Sado': [38.02, 138.37],
  'Guam': [13.44, 144.79],
  'Chichijima (Ogasawara)': [27.09, 142.19],
  'Naze (Amami)': [28.38, 129.49],
  'Toba': [34.48, 136.84],
  'Yokkaichi': [34.97, 136.62],
  'Kobe': [34.68, 135.19],
  'Hakata': [33.60, 130.40],
  'Busan': [35.10, 129.03],
  'Kushiro': [42.98, 144.38],
  'Rishiri': [45.18, 141.24],
  'Wakkanai': [45.42, 141.68],
  'Rumoi': [43.94, 141.64],
  'Otaru': [43.19, 141.00],
  'Kanmon Straits': [33.95, 130.95],
  'Kumano': [33.89, 136.10],
  'Abashiri': [44.02, 144.27],
  'Muroran': [42.32, 140.97],
  'Hiroshima': [34.35, 132.45],
  'Jeju Island': [33.51, 126.53],
  'Wakayama': [34.23, 135.17],
  'Shodoshima': [34.50, 134.25],
  'Beppu': [33.28, 131.49],
  'Tanegashima': [30.73, 131.00],
  'Nagasaki': [32.74, 129.87],
  'Akita': [39.72, 140.10],
  'Miyako': [39.64, 141.97],
  'Kanazawa': [36.59, 136.63],
  'Sakai-Minato': [35.55, 133.23],
  'Matsuyama': [33.84, 132.77],
  'Hyuga': [32.42, 131.62],
  'Hitachinaka': [36.40, 140.63],
};

// Simplified Japan coastline paths [lat, lng] - traced for SVG rendering
// Each array is a closed polygon for one landmass
const JAPAN_COASTLINE: [number, number][][] = [
  // Hokkaido
  [
    [43.39, 145.82], [43.08, 145.34], [42.48, 143.30], [42.00, 143.00],
    [41.99, 142.05], [41.38, 141.05], [41.50, 140.31], [41.78, 140.69],
    [42.10, 140.24], [42.49, 140.19], [42.80, 140.47], [43.05, 140.50],
    [43.20, 141.04], [43.32, 141.15], [43.36, 141.62], [43.57, 141.60],
    [43.80, 141.65], [44.36, 141.63], [44.78, 141.73], [45.15, 141.68],
    [45.50, 141.93], [45.50, 142.50], [44.88, 142.88], [44.45, 143.18],
    [44.38, 143.42], [44.07, 143.87], [43.66, 145.12], [43.40, 145.36],
    [43.39, 145.82],
  ],
  // Honshu
  [
    [41.10, 140.19], [40.87, 140.00], [40.35, 139.92], [39.94, 139.82],
    [39.44, 139.87], [39.00, 139.74], [38.81, 139.55], [38.55, 139.44],
    [38.02, 138.28], [37.90, 138.28], [37.72, 138.60], [37.55, 138.53],
    [37.06, 136.82], [36.54, 136.53], [36.29, 136.20], [35.95, 136.02],
    [35.66, 135.14], [35.48, 135.22], [35.37, 134.56], [35.54, 134.30],
    [35.63, 133.79], [35.45, 133.08], [35.38, 132.73], [34.79, 132.10],
    [34.46, 131.87], [34.11, 131.48], [34.05, 131.18], [34.18, 131.02],
    [33.97, 131.00], [33.95, 130.93], [33.95, 130.88], [34.30, 131.00],
    [34.39, 131.64], [34.26, 132.20], [34.14, 132.33], [33.93, 132.45],
    [33.76, 132.69], [33.55, 133.53], [33.28, 134.15], [33.52, 134.02],
    [33.84, 134.60], [34.09, 134.60], [34.27, 135.14], [34.30, 135.35],
    [34.64, 135.38], [34.76, 135.53], [34.68, 135.81], [34.59, 136.25],
    [34.65, 136.47], [34.92, 136.85], [35.17, 136.71], [35.07, 136.87],
    [35.03, 137.16], [34.68, 137.45], [34.62, 138.30], [34.82, 138.55],
    [35.00, 138.52], [35.14, 138.70], [35.05, 139.10], [35.15, 139.78],
    [35.27, 139.82], [35.33, 139.96], [35.68, 139.94], [35.82, 140.38],
    [36.30, 140.64], [36.85, 140.81], [37.42, 141.00], [38.28, 141.22],
    [38.88, 141.62], [39.02, 141.92], [39.52, 141.97], [39.92, 139.95],
    [40.18, 140.00], [40.48, 139.98], [40.66, 139.98], [40.80, 140.35],
    [40.77, 140.05], [40.73, 140.01], [40.53, 140.02], [40.20, 139.86],
    [39.73, 140.01], [39.63, 141.83], [40.04, 140.46], [40.14, 140.44],
    [40.55, 140.67], [41.10, 140.19],
  ],
  // Shikoku
  [
    [34.35, 134.03], [34.12, 133.59], [33.83, 133.55], [33.53, 133.47],
    [33.18, 132.82], [33.00, 132.72], [33.24, 132.02], [33.58, 132.42],
    [33.64, 132.74], [33.76, 132.80], [33.88, 133.05], [33.98, 133.57],
    [33.96, 133.93], [34.07, 134.20], [34.18, 134.38], [34.23, 134.67],
    [34.35, 134.03],
  ],
  // Kyushu
  [
    [33.87, 130.85], [33.31, 131.58], [33.02, 131.41], [32.70, 131.78],
    [32.42, 131.70], [31.90, 131.38], [31.42, 131.09], [31.14, 130.68],
    [31.28, 130.53], [31.56, 130.51], [31.81, 130.30], [32.19, 130.28],
    [32.58, 129.97], [32.66, 129.78], [33.00, 129.63], [33.17, 129.72],
    [33.20, 129.97], [33.44, 130.28], [33.59, 130.35], [33.87, 130.85],
  ],
  // Okinawa main island (simplified)
  [
    [26.87, 128.28], [26.65, 128.05], [26.34, 127.78], [26.08, 127.65],
    [26.33, 127.65], [26.60, 127.90], [26.87, 128.28],
  ],
];

// Convert lat/lng to SVG x/y
function project(
  lat: number,
  lng: number,
  bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number },
  width: number,
  height: number,
  padding: number
): [number, number] {
  const innerW = width - padding * 2;
  const innerH = height - padding * 2;
  const x = padding + ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * innerW;
  const y = padding + ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * innerH;
  return [x, y];
}

interface RouteMapProps {
  itinerary: PortOfCall[];
  className?: string;
}

export function RouteMap({ itinerary, className }: RouteMapProps) {
  // Get unique ports with coordinates (in order, skip sea days)
  const routePorts: { name: string; coords: [number, number] }[] = [];
  const seen = new Set<string>();
  for (const stop of itinerary) {
    if (stop.isSeaDay || !PORT_COORDS[stop.port]) continue;
    // Allow revisiting same port (departure/return)
    const key = `${stop.port}-${stop.day}`;
    if (seen.has(key)) continue;
    seen.add(key);
    routePorts.push({ name: stop.port, coords: PORT_COORDS[stop.port] });
  }

  if (routePorts.length < 2) return null;

  // Calculate bounds from ports with padding
  const lats = routePorts.map(p => p.coords[0]);
  const lngs = routePorts.map(p => p.coords[1]);
  const latRange = Math.max(...lats) - Math.min(...lats);
  const lngRange = Math.max(...lngs) - Math.min(...lngs);
  const padFactor = 0.25;

  const bounds = {
    minLat: Math.min(...lats) - Math.max(latRange * padFactor, 1.5),
    maxLat: Math.max(...lats) + Math.max(latRange * padFactor, 1.5),
    minLng: Math.min(...lngs) - Math.max(lngRange * padFactor, 2),
    maxLng: Math.max(...lngs) + Math.max(lngRange * padFactor, 2),
  };

  const width = 600;
  const height = 500;
  const padding = 40;

  const proj = (lat: number, lng: number) => project(lat, lng, bounds, width, height, padding);

  // Generate coastline paths (only show islands within bounds)
  const coastPaths = JAPAN_COASTLINE.map(island => {
    const visible = island.some(
      ([lat, lng]) =>
        lat >= bounds.minLat - 2 && lat <= bounds.maxLat + 2 &&
        lng >= bounds.minLng - 2 && lng <= bounds.maxLng + 2
    );
    if (!visible) return null;
    const points = island.map(([lat, lng]) => proj(lat, lng));
    return points.map(([x, y]) => `${x},${y}`).join(' ');
  }).filter(Boolean);

  // Generate route line
  const routePoints = routePorts.map(p => proj(p.coords[0], p.coords[1]));

  // Build route path
  const routePath = routePoints
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`)
    .join(' ');

  // Calculate label positions (alternate above/below to avoid overlap)
  const labels = routePorts.map((port, i) => {
    const [x, y] = routePoints[i];
    // Check if any previous label is too close
    let offsetY = -12;
    for (let j = 0; j < i; j++) {
      const [px, py] = routePoints[j];
      if (Math.abs(x - px) < 50 && Math.abs(y - py) < 30) {
        offsetY = 18;
        break;
      }
    }
    return { name: port.name, x, y, offsetY, isFirst: i === 0, isLast: i === routePorts.length - 1 };
  });

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full rounded-xl border border-gray-200"
        style={{ background: 'linear-gradient(180deg, #EBF0F7 0%, #D6E0ED 100%)' }}
      >
        {/* Ocean pattern */}
        <defs>
          <pattern id="waves" x="0" y="0" width="40" height="8" patternUnits="userSpaceOnUse">
            <path d="M0 4 Q10 0 20 4 Q30 8 40 4" fill="none" stroke="#C2D1E2" strokeWidth="0.5" opacity="0.5" />
          </pattern>
        </defs>
        <rect x="0" y="0" width={width} height={height} fill="url(#waves)" rx="12" />

        {/* Coastline */}
        {coastPaths.map((points, i) => (
          <polygon
            key={i}
            points={points!}
            fill="#F5F0E8"
            stroke="#C9BFA8"
            strokeWidth="1"
          />
        ))}

        {/* Route line - shadow */}
        <path
          d={routePath}
          fill="none"
          stroke="#1B2A4A"
          strokeWidth="3"
          opacity="0.15"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Route line - dashed */}
        <path
          d={routePath}
          fill="none"
          stroke="#C9A96E"
          strokeWidth="2.5"
          strokeDasharray="8,4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Port dots and labels */}
        {labels.map((label, i) => (
          <g key={i}>
            {/* Port dot */}
            <circle
              cx={label.x}
              cy={label.y}
              r={label.isFirst || label.isLast ? 6 : 4}
              fill={label.isFirst || label.isLast ? '#C9A96E' : '#1B2A4A'}
              stroke="#fff"
              strokeWidth="2"
            />
            {/* Label background */}
            <text
              x={label.x}
              y={label.y + label.offsetY}
              textAnchor="middle"
              fontSize="10"
              fontWeight={label.isFirst || label.isLast ? '700' : '500'}
              fill="#1B2A4A"
              stroke="#F5F0E8"
              strokeWidth="3"
              paintOrder="stroke"
              fontFamily="Inter, system-ui, sans-serif"
            >
              {label.name}
            </text>
          </g>
        ))}

        {/* Start/End markers */}
        {routePoints.length > 0 && (
          <>
            <circle cx={routePoints[0][0]} cy={routePoints[0][1]} r="9" fill="none" stroke="#C9A96E" strokeWidth="2" opacity="0.5" />
            <circle cx={routePoints[routePoints.length - 1][0]} cy={routePoints[routePoints.length - 1][1]} r="9" fill="none" stroke="#C9A96E" strokeWidth="2" opacity="0.5" />
          </>
        )}
      </svg>
    </div>
  );
}
