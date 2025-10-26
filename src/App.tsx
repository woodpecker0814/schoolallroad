import './App.css';
import Map from './components/Map';

function App() {
  const handleOptionsClick = () => {
    alert('옵션 메뉴 (추후 구현)');
  };

  const handleGpsClick = () => {
    alert('GPS 위치 찾기 (추후 구현)');
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
        <Map />

        {/* GPS 버튼 */}
        <button className="gps-button" onClick={handleGpsClick}>
          📍
        </button>
      </div>
    </div>
  );
}

export default App;
