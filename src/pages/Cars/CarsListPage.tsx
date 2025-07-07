import React, { useEffect, useState } from "react";
import { CarDTO } from "../../types/CarDTO";
import CarCard from "./components/CarCard";
import { getListCars } from "../../api/cars/cars";
import { PaginationDTO } from "../../types/PaginationDTO";

const CarsListPage: React.FC = () => {
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState<PaginationDTO>();

    const getCars = async () => {
        try {
            const result = await getListCars();
            setCars(result.data);
            setPagination(result.meta);
            setLoading(true);
        }
        catch (err: any) {
            console.error(err);
            alert('Ошибка получения списка машин: ' + (err.message || 'Неизвестная ошибка'));
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCars();
    }, []);

    if (loading) {
        return <div style={{ position: 'relative', top: 100, display: 'flex', justifyContent: 'center' }}>Загрузка...</div>;
    }

    return (
        <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            paddingRight: '240px',
            paddingLeft: '240px',
            position: 'relative',
            top: 100
        }}>
            {cars.map(car => (
                <CarCard key={car.id} loading={loading} car={car} />
            ))}
        </div>
    );
};

export default CarsListPage;