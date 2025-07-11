import { api } from "../api";

export const getCarById = async (carId: string | undefined): Promise<any> => {
    try {
        const response = await api.get(`/cars/info/${carId}`);
        return response.data;
    }
    catch (error: any) {
        if (error.response) {
            const { status, data } = error.response;
            throw new Error(`Ошибка получения автомобия (${status}): ${JSON.stringify(data)}`);
        }
        throw new Error(error.message);
    }
}