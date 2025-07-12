import { apiAuth } from "../api";

export const getProfile = async (): Promise<any> => {
    try {
        const response = await apiAuth.get('/users/session');
        return response.data;
    }
    catch (error: any) {
        if (error.response) {
            const { status, data } = error.response;
            throw new Error(`Ошибка получения сессии (${status}): ${JSON.stringify(data)}`);
        }
        throw new Error(error.message);
    }
}