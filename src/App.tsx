import styles from "./App.module.scss";
import SearchBar from "./components/SearchBar";
import IpInfo from "./components/IpInfo";
import Map from "./components/Map";
import { axiosCall } from "./lib/axios";
import { useRef, useState } from "react";
import { ResponseObj } from "./lib/axios";

function App() {

	const initialResponseObj: ResponseObj = {
		ip: "",
		location: {
			country: "",
			region: "",
			city: "",
			lat: 0,
			lng: 0,
			postalCode: "",
			timezone: ""
		},
		isp: ""
	};
	const response = useRef(initialResponseObj);
	const responseError = useRef("");
	const [requestState, setRequestState] = useState("ok");

	function handleNewSearch (searchParam: string, searchParamType: string): void {
		setRequestState("loading");
		axiosCall(searchParam, searchParamType)
			.then( (responseData) => {
				if (typeof responseData === "object") {
					response.current = responseData;
					setRequestState("ok");
				}else if (typeof responseData === "string") {
					responseError.current = responseData;
					setRequestState("error");
				}
			});
	}

	return (
		<>
			<header className={styles.header}>
				<h1>IP Address Tracker</h1>
				<div className={styles.isearchBarContainer}>
					<SearchBar handleNewSearch={handleNewSearch} />
				</div>
			</header>

			<main className={styles.main}>

				<div className={styles.ipInfoContainer}>
					<IpInfo requestState={requestState} response={response.current} responseError={responseError.current}/>
				</div>
				
				<div className={styles.mapContainer}>
					<Map lat={response.current.location.lat} lng={response.current.location.lng} ip={response.current.ip}/>
				</div>

			</main>
		</>
	);
}

export default App;
