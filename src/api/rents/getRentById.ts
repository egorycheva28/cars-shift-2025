import { apiAuth } from "../api";

export const getRentById = async (carRentId: string | undefined): Promise<any> => {
    try {
        const response = await apiAuth.get(`/cars/rent/${carRentId}`);
        return response.data;
    }
    catch (error: any) {
        if (error.response) {
            const { status, data } = error.response;
            throw new Error(`Ошибка получения аренды (${status}): ${JSON.stringify(data)}`);
        }
        throw new Error(error.message);
    }
}