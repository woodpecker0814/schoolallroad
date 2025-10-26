import { useEffect, useRef } from 'react';
import L from 'leaflet';
import buildingsData from '../data/buildings.json';

const Map = () => {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // 지도 초기화 (베이스맵 없이)
    const map = L.map(mapContainerRef.current, {
      center: [36.354, 127.425],
      zoom: 16,
      zoomControl: true,
      attributionControl: false
    });

    mapRef.current = map;

    // GeoJSON 레이어 추가
    const geoJsonLayer = L.geoJSON(buildingsData as any, {
      style: {
        fillColor: '#E8F4FD',
        fillOpacity: 0.7,
        color: '#2196F3',
        weight: 2
      },
      onEachFeature: (feature, layer) => {
        // 건물 번호 추출
        const properties = feature.properties || {};
        const buildingNumber = Object.keys(properties)[0] || '?';

        // 건물 중심점 계산
        const bounds = layer.getBounds();
        const center = bounds.getCenter();

        // 건물 번호 라벨 추가
        const label = L.marker(center, {
          icon: L.divIcon({
            className: 'building-label',
            html: `<div style="
              background: white;
              padding: 4px 8px;
              border-radius: 4px;
              font-size: 13px;
              font-weight: 600;
              color: #333;
              box-shadow: 0 1px 3px rgba(0,0,0,0.12);
              white-space: nowrap;
              pointer-events: none;
            ">${buildingNumber}</div>`,
            iconSize: [30, 20],
            iconAnchor: [15, 10]
          })
        }).addTo(map);

        // 건물 클릭 이벤트
        layer.on('click', () => {
          L.popup()
            .setLatLng(center)
            .setContent(`<strong>건물 번호: ${buildingNumber}</strong>`)
            .openOn(map);
        });
      }
    }).addTo(map);

    // 모든 건물이 보이도록 자동 맞춤
    const bounds = geoJsonLayer.getBounds();
    map.fitBounds(bounds, { padding: [50, 50] });

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return <div ref={mapContainerRef} id="map" />;
};

export default Map;
