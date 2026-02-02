import { CarDTO } from "./CarDTO";

export interface RentDTO {
    _id: string;
    carInfo: CarDTO;
    status: number;
    pickupLocation: string;
    returnLocation: string;
    startDate: number;
    endDate: number;
    totalPrice: number;
    firstName: string;
    lastName: string;
    middleName?: string;
    birthDate: string;
    email: string;
    phone: string;
    comment?: string;
    created: string;
    updated: string;
}