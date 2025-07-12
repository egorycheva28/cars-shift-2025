import { api } from "../api";

export const createOtpCode = async (phone: string): Promise<any> => {
    try {
        const response = await api.post('/auth/otp', { phone: phone });
        return response.data;
    }
    catch (error: any) {
        if (error.response) {
            const { status, data } = error.response;
            throw new Error(`Ошибка получения кода (${status}): ${JSON.stringify(data)}`);
        }
        throw new Error(error.message);
    }
}