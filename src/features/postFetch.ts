import api from "../api/api";
import { DocumentData, FetchPostResponse } from "../types/types";

export interface PostData {
  path: string,
  token: string,
  documentData?: DocumentData,
}


export default async function postFetch(postData: PostData): Promise<FetchPostResponse> {
  
    const response = await api.post<FetchPostResponse>(postData.path,postData.documentData, {withCredentials: false, headers: {"x-auth": postData.token, 'Content-Type': 'application/json'} });
    return response.data
}

