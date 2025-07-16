import { createFileRoute } from "@tanstack/react-router";
import { useGeolocated } from "react-geolocated";
import { calculateDistance } from "../utils/calculateDistance";
import { useEvents } from "../utils/fetch/useEvents";

export const Route = createFileRoute("/presensi/$id")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();
	const { data } = useEvents(id);

	const geo = useGeolocated({
		positionOptions: {
			enableHighAccuracy: true,
		},
	});
	const radius = 1; //1km
	const latitude = data?.data.latitude || 0;
	const longitude = data?.data.longitude || 0;

	return geo.isGeolocationEnabled && geo.coords ? (
		<div>
			Geolocation is available
			<div>Latitude: {geo.coords.latitude}</div>
			<div>Latitude al Wali: {latitude}</div>
			<div>Longitude: {geo.coords.longitude}</div>
			<div>Longitude al Wali: {longitude}</div>
			{calculateDistance(
				geo.coords.latitude,
				geo.coords.longitude,
				latitude,
				longitude,
			) <= radius ? (
				<div>Anda berada di Rajawali</div>
			) : (
				<div>Anda tidak berada di Rajawali</div>
			)}
		</div>
	) : (
		<div>Geolocation is not available</div>
	);
}
