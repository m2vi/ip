import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const Map = ({ loc }: { loc: number[] }) => {
  return (
    <MapContainer
      center={{ lat: loc[0], lng: loc[1] }}
      zoom={9}
      scrollWheelZoom={true}
      zoomControl={false}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png'
        maxZoom={18}
      />

      <Marker position={{ lat: loc[0], lng: loc[1] }}>
        <Popup>{loc.join(', ')}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
