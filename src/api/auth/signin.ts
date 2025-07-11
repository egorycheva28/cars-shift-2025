import { api } from "../axios/axios";

export async function signin(phone: string | undefined, code: number): Promise<any> {
    try {
        const response = await api.post('/users/signin', { phone: phone, code: code });
        return response.data;
    }
    catch (error: any) {
        if (error.response) {
            const { status, data } = error.response;
            throw new Error(`Ошибка авторизации (${status}): ${JSON.stringify(data)}`);
        }
        throw new Error(error.message);
    }
}