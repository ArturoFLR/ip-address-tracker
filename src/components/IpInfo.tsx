import styles from "./IpInfo.module.scss";
import { Oval } from "react-loading-icons";
import { ResponseObj } from "../lib/axios";

type IpInfoProps = {
	requestState: string,
	response: ResponseObj,
	responseError: string
}

const IpInfo = ( {requestState, response, responseError}: IpInfoProps ) => {

	return (
		<div className={styles.mainContainer}>
			<div className={`${styles.ipInfoFirstItemContainer} ${styles.ipInfoItem}`}>
				<p className={styles.ipInfoTitle}>IP ADDRESS</p>
				{
					requestState === "loading"
						? <Oval className={styles.loading} stroke="#8989e3" />
						: <p className={styles.ipInfoData}>
							{requestState === "ok"
								? response.ip
								: responseError}
						</p>
				}
			</div>

			<div className={styles.ipInfoItem}>
				<p className={styles.ipInfoTitle}>LOCATION</p>
				{
					requestState === "loading"
						? <Oval className={styles.loading} stroke="#8989e3" />
						: <p className={`${styles.ipInfoLocationData} ${styles.ipInfoData}`}>
							{requestState === "ok"
								? response.location.country
									? `${response.location.city}, ${response.location.region}, ${response.location.country}`
									: ""
								: responseError}
						</p>
				}
			</div>

			<div className={styles.ipInfoItem}>
				<p className={styles.ipInfoTitle}>TIMEZONE</p>
				{
					requestState === "loading"
						? <Oval className={styles.loading} stroke="#8989e3" />
						: <p className={styles.ipInfoData}>
							{requestState === "ok"
								? response.location.timezone
									? `UTC ${response.location.timezone}`
									: ""
								: responseError}
						</p>
				}
			</div>

			<div className={styles.ipInfoItem}>
				<p className={styles.ipInfoTitle}>ISP</p>
				{
					requestState === "loading"
						? <Oval className={styles.loading} stroke="#8989e3" />
						: <p className={styles.ipInfoData}>
							{requestState === "ok"
								? response.isp
								: responseError}
						</p>
				}
			</div>
		</div>
	);
};

export default IpInfo;
