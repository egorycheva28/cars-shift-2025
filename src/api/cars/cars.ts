import { api } from "../axios/axios";
import { apiAuth } from "../axios/axios";

export async function getListCars(): Promise<any> {
    try {
        const response = await api.get('/cars/info');
        return response.data;
    }
    catch (error: any) {
        if (error.response) {
            const { status, data } = error.response;
            throw new Error(`Ошибка получения списка автомобилей (${status}): ${JSON.stringify(data)}`);
        }
        throw new Error(error.message);
    }
}