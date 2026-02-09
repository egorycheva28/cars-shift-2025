import { getListCars } from "../../../api/cars/getCars";
import React, { useEffect, useState } from "react";
import { CarDTO } from "../../../types/CarDTO";
import { PaginationDTO } from "../../../types/PaginationDTO";
import { FiltersDTO } from "../../../types/FiltersDTO";
import { useLocation, useNavigate } from "react-router-dom";

export const useCarsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pagination, setPagination] = useState<PaginationDTO>(
        {
            limit: 10,
            page: Number(queryParams.get('page')) || 1,
            total: 16,
            totalPages: 2
        }
    );
    const [isFilter, setIsFilter] = useState<boolean>(false);
    const [filters, setFilters] = useState<FiltersDTO>(
        {
            search: queryParams.get('search') || '',
            maxPrice: '',
            minPrice: '',
            transmission: queryParams.get('transmission') || '',
            bodyType: queryParams.get('bodyType') || '',
            brand: queryParams.get('brand') || '',
            color: queryParams.get('color') || '',
            limit: 10,
            page: Number(queryParams.get('page')) || 1
        });

    const updateUrl = () => {
        const params = new URLSearchParams();

        if (filters.search) {
            params.set('search', filters.search);
        }

        if (filters.bodyType) {
            params.set('bodyType', filters.bodyType);
        }

        if (filters.brand) {
            params.set('brand', filters.brand);
        }

        if (filters.transmission) {
            params.set('transmission', filters.transmission);
        }

        if (filters.color) {
            params.set('color', filters.color);
        }

        if (filters.page) {
            params.set('page', pagination.page.toString());
        }

        navigate(`/cars?${params.toString()}`);
    };

    const chooseFilters = () => {
        setIsFilter(!isFilter);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const chooseTransmission = (newValue: any) => {
        setFilters({ ...filters, transmission: newValue });
    };

    const handleChangePage = (newValue: any) => {
        setFilters({ ...filters, page: newValue });
        setPagination({ ...pagination, page: newValue });
    };

    const chooseColor = (newValue: any) => {
        setFilters({ ...filters, color: newValue });
    };

    const getCars = async () => {
        try {
            const result = await getListCars(filters);
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

    const applyFilters = () => {
        getCars();
        updateUrl();
    };

    const cancelFilters = () => {
        setFilters({
            ...filters,
            search: '',
            maxPrice: '',
            minPrice: '',
            transmission: '',
            bodyType: '',
            brand: '',
            color: '',
            limit: 10,
            page: 1
        });
        getCars();
        updateUrl();
    };

    useEffect(() => {
        getCars();
        updateUrl();
    }, [pagination.page]);

    return {
        state: { cars, isFilter, filters, loading, pagination },
        functions: {
            chooseFilters,
            handleChange,
            chooseColor,
            applyFilters,
            cancelFilters,
            chooseTransmission,
            handleChangePage
        }
    }
}