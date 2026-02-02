import { apiAuth } from "../api";

export const getListRents = async (): Promise<any> => {
    try {
        const response = await apiAuth.get('/cars/rent');
        return response.data;
    }
    catch (error: any) {
        if (error.response) {
            const { status, data } = error.response;
            throw new Error(`Ошибка получения аренд (${status}): ${JSON.stringify(data)}`);
        }
        throw new Error(error.message);
    }
}