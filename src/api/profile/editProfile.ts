import { ProfileDTO } from "../../types/ProfileDTO";
import { apiAuth } from "../api";

export const editProfile = async (profileDTO: ProfileDTO): Promise<any> => {
    const body = {
        profile: {
            firstname: profileDTO.firstname,
            middlename: profileDTO.middlename,
            lastname: profileDTO.lastname,
            email: profileDTO.email,
            city: profileDTO.city
        },
        phone: profileDTO.phone
    }

    try {
        const response = await apiAuth.patch('/users/profile', body);
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