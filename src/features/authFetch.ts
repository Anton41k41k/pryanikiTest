import api from "../api/api";
import { PATHS } from "../api/urls";
import { AuthorizationData, AuthResponse } from "../types/types";


export default async function authFetch(user: AuthorizationData): Promise<AuthResponse> {
    const response = await api.post<AuthResponse>(PATHS.auth, user, {withCredentials: false });
    return response.data
}