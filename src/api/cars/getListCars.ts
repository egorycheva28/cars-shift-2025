import { FiltersDTO } from "../../types/FiltersDTO";
import { api } from "../api";

export const getListCars = async (filters: FiltersDTO): Promise<any> => {
    try {
        const params: Record<string, any> = {};

        if (filters.search) params.search = filters.search;
        if (filters.maxPrice) params.maxPrice = filters.maxPrice;
        if (filters.minPrice) params.minPrice = filters.minPrice;
        if (filters.transmission) params.transmission = filters.transmission;
        if (filters.bodyType) params.bodyType = filters.bodyType;
        if (filters.brand) params.brand = filters.brand;
        if (filters.color) params.color = filters.color;
        if (filters.limit && filters.limit !== 10) params.limit = filters.limit;
        if (filters.page && filters.page !== 1) params.page = filters.page;

        const response = await api.get('/cars/info', { params });
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