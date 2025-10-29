import { useState, useEffect } from 'react';
import './App.css';
import Map from './components/Map';
import type L from 'leaflet';

function App() {
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  // PC 환경 감지
  useEffect(() => {
    const checkDesktop = () => {
      // 터치스크린이 없고 화면이 충분히 큰 경우 PC로 간주
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isLargeScreen = window.matchMedia('(min-width: 768px)').matches;
      setIsDesktop(!hasTouch && isLargeScreen);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  const handleOptionsClick = () => {
    alert('옵션 메뉴 (추후 구현)');
  };

  const handleGpsClick = () => {
    alert('GPS 위치 찾기 (추후 구현)');
  };

  const handleZoomIn = () => {
    if (mapInstance) {
      mapInstance.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstance) {
      mapInstance.zoomOut();
    }
  };

  return (
    <div className="app">
      {/* 상단 헤더 */}
      <header className="header">
        <input
          type="text"
          className="search-input"
          placeholder="건물 검색 (추후 구현)"
          disabled
        />
        <button className="options-button" onClick={handleOptionsClick}>
          ⚙️
        </button>
      </header>

      {/* 지도 영역 */}
      <div className="map-container">
        <Map onMapReady={setMapInstance} />

        {/* 우하단 컨트롤 (줌 + GPS) */}
        <div className="bottom-right-controls">
          {/* 줌 컨트롤 (PC만) */}
          {isDesktop && (
            <div className="zoom-controls">
              <button className="zoom-button" onClick={handleZoomIn}>
                +
              </button>
              <button className="zoom-button" onClick={handleZoomOut}>
                −
              </button>
            </div>
          )}

          {/* GPS 버튼 */}
          <button className="gps-button" onClick={handleGpsClick}>
            📍
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
