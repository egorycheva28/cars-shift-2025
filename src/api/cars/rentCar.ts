import { CarRentalDTO } from "../../types/CarRentalDTO";
import { api } from "../axios/axios";

export async function rentCar(carRentalDTO: CarRentalDTO): Promise<any> {
    try {
        const response = await api.post('/cars/rent', carRentalDTO);
        return response.data;
    }
    catch (error: any) {
        if (error.response) {
            const { status, data } = error.response;
            throw new Error(`Ошибка аренды автомобиля (${status}): ${JSON.stringify(data)}`);
        }
        throw new Error(error.message);
    }
}