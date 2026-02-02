import { useEffect, useState } from "react";
import { getListRents } from "../../../api/rents/getListRents";
import { RentDTO } from "../../../types/RentDTO";

export const useRentsPage = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [rents, setRents] = useState<RentDTO[]>([]);

    const getRents = async () => {
        try {
            const result = await getListRents();
            setRents(result.rents);
            setLoading(true);
        }
        catch (err: any) {
            console.error(err);
            alert('Ошибка получения списка аренд: ' + (err.message || 'Неизвестная ошибка'));
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getRents();
    }, []);

    return {
        state: { loading, rents }
    }
}