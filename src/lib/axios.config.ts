import axios from "axios";

export const axiosIpify = axios.create(
	{				//https://geo.ipify.org/api/v2/country,city
		baseURL: "https://geo.ipify.org/api/v2/country,city",
		responseType: "json",
		method: "get",
		timeout: 4000,
		params: 
			{
				apiKey : "at_IG0l2yfU4jG5gAMXtx6Wmh6jTe1wZ"
				// at_IG0l2yfU4jG5gAMXtx6Wmh6jTe1wZ
			}
	}
);