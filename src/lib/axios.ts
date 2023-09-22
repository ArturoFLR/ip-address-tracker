import { AxiosError } from "axios";
import { axiosIpify } from "./axios.config";

export type ResponseObj = {
	ip: string,
	location: {
		country:string,
		region: string,
		city: string,
		lat: number,
		lng: number,
		postalCode: string,
		timezone: string
	},
	isp: string
}

export async function axiosCall (searchParam: string, paramType: string) {
	try {
		const axiosResponse = await axiosIpify.get("", {
			params: {
				[paramType]: searchParam
			}
		});
		
		const responseData: ResponseObj = {
			ip: axiosResponse.data.ip,
			location: {
				country: axiosResponse.data.location.country,
				region: axiosResponse.data.location.region,
				city: axiosResponse.data.location.city,
				lat: axiosResponse.data.location.lat,
				lng: axiosResponse.data.location.lng,
				postalCode: axiosResponse.data.location.postalCode,
				timezone: axiosResponse.data.location.timezone
			},
			isp: axiosResponse.data.isp

		};

		return responseData;

	} catch (error) {
		if (error instanceof AxiosError) {
			switch (error.response?.data.code) {
			case 400:
				return "IP/Domain not found.";
				break;
			
			case 403:
				return "API key credits exhausted :(";
				break;

			default:
				return "Network error.";
				break;
			}
		} else if (error instanceof Error) {
			return "Unexpected Error :(";
		} else {
			return "Unexpected Error :(";
		}
	}
}
