import { apiAuth } from "../api";

export const cancelRent = async (carRentId: string | undefined): Promise<any> => {
    try {
        const response = await apiAuth.put('/cars/rent/cancel', { carRentId: carRentId });
        return response.data;
    }
    catch (error: any) {
        if (error.response) {
            const { status, data } = error.response;
            throw new Error(`Ошибка отмены аренды автомобиля (${status}): ${JSON.stringify(data)}`);
        }
        throw new Error(error.message);
    }
}