import api from "../api/api";
import { PATHS } from "../api/urls";
import { FetchDataResponse } from "../types/types";

export interface DataFetch {
  path: typeof PATHS[keyof typeof PATHS],
  token: string,
}


export default async function dataFetch({path, token}: DataFetch): Promise<FetchDataResponse> {
    const response = await api.get<FetchDataResponse>(path, {withCredentials: false, headers: {"x-auth": token, 'Content-Type': 'application/json'} });
    return response.data
}

