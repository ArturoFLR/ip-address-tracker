import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.scss";
import { icon } from "leaflet";

type MapProps = {
	lat: number,
	lng: number,
	ip: string,
}

const Map = ( { lat, lng, ip }: MapProps ) => {
	const defaultLat = 51.505;
	const defaultLng = -0.09;
	let latToShow = defaultLat;
	let lngToShow = defaultLng;

	if (lat !== 0 || lng !== 0) {
		latToShow = lat;
		lngToShow = lng;
	}

	function MyComponent() {
		const map = useMap();
		map.setView([latToShow, lngToShow]);
		return null;
	}

	return (
		<div className={styles.mainContainer}>
			<MapContainer className={styles.map} center={{ lat: latToShow, lng: lngToShow }} zoom={13} scrollWheelZoom={false}>
				<MyComponent />
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={{ lat: latToShow, lng: lngToShow }} icon={icon(
					{
						iconUrl: "../../public/icon/icon-location.svg",
						iconSize: [58, 68],
					}
				)} 
				>
					<Popup >
						{ip ? ip : "No IP / Domain selected"}
					</Popup>
				</Marker>
			</MapContainer>
		</div>
	);
};

export default Map;
