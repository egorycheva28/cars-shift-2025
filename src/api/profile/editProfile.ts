import { ProfileDTO } from "../../types/ProfileDTO";
import { apiAuth } from "../axios/axios";

export const editProfile = async (profileDTO: ProfileDTO): Promise<any> => {
    const body = {
        profile: {
            firstName: profileDTO.firstName,
            middleName: profileDTO.middleName,
            lastName: profileDTO.lastName,
            email: profileDTO.email,
            city: profileDTO.city
        },
        phone: profileDTO.phone
    }

    try {
        const response = await apiAuth.patch('/users/profile', {
            profile: {
                firstName: profileDTO.firstName,
                middleName: profileDTO.middleName,
                lastName: profileDTO.lastName,
                email: profileDTO.email,
                city: profileDTO.city
            },
            phone: profileDTO.phone
        });
        return response.data;
    }
    catch (error: any) {
        if (error.response) {
            const { status, data } = error.response;
            throw new Error(`Ошибка редактирования профиля (${status}): ${JSON.stringify(data)}`);
        }
        throw new Error(error.message);
    }
}