import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';


export const Map = () => {
    const center = [41.390205, 2.154007];
    const [coordenadas, setCoordenadas] = useState([]);
    const [error, setError] = useState({});

    useEffect(() => {
        fetch('data/districtes_geo.json')
            .then(res => res.json())
            .then(({ features }) => {
                setCoordenadas([...features]);
            })
            .catch(error => {
                console.error(error);
                setError({
                    ...error,
                    'no-data': 'No se han podido obtener los datos recarga la aplicacion!'
                });
            });

    }, [setCoordenadas]);



    return (
        <>
            {
                'no-data' in error && <p>No se han podido obtener los datos recarga la aplicacion!</p>
            }
            {
                Object.keys(error).length === 0 &&
                <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={center}>
                        <Popup>
                            Te encuentras aqui!
                        </Popup>
                    </Marker>
                    {coordenadas.map((el) => {
                        return (
                            <GeoJSON key={el.properties.C_Distri} data={el} style={{ color: "black" }} />
                        );
                    })}
                </MapContainer>
            }
        </>
    );
};
