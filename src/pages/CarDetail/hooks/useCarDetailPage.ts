import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CarByIdDTO } from "../../../types/CarByIdDTO";
import { getCarById } from "../../../api/cars/getCarById";

export const useCarDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [loading, setLoading] = useState<boolean>(true);
    const [car, setCar] = useState<CarByIdDTO>(
        {
            id: '',
            bodyType: 'sedan',
            brand: 'Haval',
            color: 'black',
            location: '',
            media: [],
            name: '',
            price: 0,
            steering: 'left',
            transmission: 'automatic',
            rents: []
        }
    );

    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + 7);
    const formatter = new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long',
    });
    const formattedToday = formatter.format(today);
    const formattedFutureDate = formatter.format(futureDate);

    const getCar = async () => {
        try {
            const response = await getCarById(id);
            setCar(response.data);
            setLoading(true);
        }
        catch (err: any) {
            console.error(err);
            alert('Ошибка получения машины: ' + (err.message || 'Неизвестная ошибка'));
        }
        finally {
            setLoading(false);
        }
    };

    const back = () => { navigate('/cars'); };
    const rent = () => { navigate(`/car/rent/${car.id}`); };

    useEffect(() => {
        getCar();
    }, []);

    return {
        state: { loading, car, formattedToday, formattedFutureDate },
        functions: {
            back,
            rent
        }
    }
}