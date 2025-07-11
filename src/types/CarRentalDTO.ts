export interface CarRentalDTO {
    carId: string | undefined;
    pickupLocation: string;
    returnLocation: string;
    startDate?: number;
    endDate?: number;
    firstName: string;
    lastName: string;
    middleName: string;
    birthDate: string;
    email: string;
    phone: string;
    comment: string;
}