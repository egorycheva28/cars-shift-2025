import { useEffect, useState } from "react";
import { cancelRent } from "../../../api/rents/cancelRent";
import { getRentById } from "../../../api/rents/getRentById";
import { useParams } from "react-router-dom";
import { RentDTO } from "../../../types/RentDTO";

export const useRentDetailPage = () => {
    const { id } = useParams();

    const [loading, setLoading] = useState<boolean>(true);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [rent, setRent] = useState<RentDTO>(
        {
            _id: '',
            carInfo: {
                id: '',
                bodyType: 'sedan',
                brand: 'Haval',
                color: 'black',
                location: '',
                media: [],
                name: '',
                price: 0,
                steering: 'left',
                transmission: 'automatic'
            },
            status: 0,
            pickupLocation: '',
            returnLocation: '',
            startDate: 0,
            endDate: 0,
            totalPrice: 0,
            firstName: '',
            lastName: '',
            middleName: '',
            birthDate: '',
            email: '',
            phone: '',
            comment: '',
            created: '',
            updated: ''
        }
    );

    const handleIsOpenModal = (isOpen: boolean) => {
        setIsOpen(isOpen);
    };

    const getRent = async () => {
        try {
            const response = await getRentById(id);
            setRent(response);
            setLoading(true);
        }
        catch (err: any) {
            console.error(err);
            alert('Ошибка получения аренды: ' + (err.message || 'Неизвестная ошибка'));
        }
        finally {
            setLoading(false);
        }
    };

    const cancelRents = async () => {
        try {
            await cancelRent(id);
            getRent();
            handleIsOpenModal(false);
            setLoading(true);
        }
        catch (err: any) {
            console.error(err);
            alert('Ошибка отмены аренды: ' + (err.message || 'Неизвестная ошибка'));
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getRent();
    }, []);

    return {
        state: { loading, rent, isOpen },
        functions: {
            cancelRents,
            handleIsOpenModal
        }
    }
}