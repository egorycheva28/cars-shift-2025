import React, { useEffect, useState } from "react";
import { CarDTO } from "../../types/CarDTO";
import CarCard from "./components/CarCard";
import { getListCars } from "../../api/cars/getListCars";
import { PaginationDTO } from "../../types/PaginationDTO";
import InputForm from "../../components/InputForm";
import SubmitButton from "../../components/SubmitButton";
import { Slider, Tab, Tabs } from "@mui/material";
import { FiltersDTO } from "../../types/FiltersDTO";
import CancelButton from "../../components/CancelBurron";
import { bodyTypeOptions, brandOptions, colors } from "../../components/Consts";

const CarsListPage = () => {
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [pagination, setPagination] = useState<PaginationDTO>(
        {
            limit: 10,
            page: 1,
            total: 16,
            totalPages: 2
        }
    );
    const [isFilter, setIsFilter] = useState<boolean>(false);
    const [filters, setFilters] = useState<FiltersDTO>(
        {
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
            top: 125,
            flexDirection: 'column'
        }}>
            <div style={{
                backgroundColor: '#F3F4F6', height: '74px', borderRadius: '16px', display: 'flex', flexDirection: 'row', gap: '16px',
                paddingTop: '16px', paddingBottom: '24px', paddingLeft: '24px', paddingRight: '24px', alignItems: 'center'
            }}>
                <div style={{ flex: 1 }}>
                    <InputForm
                        label="Поиск"
                        name="search"
                        type="text"
                        value={filters.search || ''}
                        placeholder="Поиск"
                        onChange={handleChange}
                        helperText={''}
                        width="100%"
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <InputForm
                        label="Даты аренды"
                        name="date"
                        type="date"
                        value={''}
                        placeholder="Даты аренды"
                        onChange={handleChange}
                        helperText={''}
                        width="100%"
                    />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    height: '100%',
                }}>
                    <button style={{
                        backgroundColor: '#344051', borderRadius: '16px', display: 'flex',
                        gap: '8px', border: 'none', padding: '16px 32px', alignItems: 'center', cursor: 'pointer'
                    }} onClick={chooseFilters}>
                        <img src="../filtersWhite.png" style={{ height: '20px', width: '20px' }} />
                        <span style={{ color: '#FFFFFF', fontSize: '16px' }}>Фильтры</span>
                    </button>
                </div>
            </div>
            {isFilter ? (
                <div style={{
                    backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #CED2DA', padding: '32px', display: 'flex',
                    gap: '24px', flexDirection: 'column'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '24px' }}>
                        <div style={{ flex: 1 }}>
                            <InputForm
                                label="Марка"
                                name="brand"
                                type="text"
                                placeholder="Марка"
                                value={filters.brand || ''}
                                onChange={handleChange}
                                options={brandOptions}
                                helperText={''}
                                width="100%"
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <InputForm
                                label="Тип кузова"
                                name="bodyType"
                                type="text"
                                placeholder="Тип кузова"
                                value={filters.bodyType || ''}
                                onChange={handleChange}
                                options={bodyTypeOptions}
                                helperText={''}
                                width="100%"
                            />
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '24px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                            <label style={{ color: '#141C24', fontSize: '16px' }}>Руль</label>
                            <Tabs value={filters.transmission} centered style={{ borderRadius: '16px', backgroundColor: ' #F3F4F6', padding: '2px' }}>
                                <Tab label="Любой" style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', width: '33%' }} />
                                <Tab label="Левый" style={{ width: '33%' }} />
                                <Tab label="Правый" style={{ width: '34%' }} />
                            </Tabs>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                            <label style={{ color: '#141C24', fontSize: '16px' }}>Коробка передач</label>
                            <Tabs value={filters.transmission} centered style={{ borderRadius: '16px', backgroundColor: ' #F3F4F6', padding: '2px' }}>
                                <Tab label="Любой" style={{ backgroundColor: filters.transmission === '' ? '#FFFFFF' : '#F3F4F6', borderRadius: '16px', width: '33%' }} onClick={() => chooseTransmission('')} />
                                <Tab label="Автомат" style={{ backgroundColor: filters.transmission === 'automatic' ? '#FFFFFF' : '#F3F4F6', borderRadius: '16px', width: '33%' }} onClick={() => chooseTransmission('automatic')} />
                                <Tab label="Механика" style={{ backgroundColor: filters.transmission === 'manual' ? '#FFFFFF' : '#F3F4F6', borderRadius: '16px', width: '34%' }} onClick={() => chooseTransmission('manual')} />
                            </Tabs>
                        </div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '24px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                            <label style={{ color: '#141C24', fontSize: '16px' }}>Стоимость</label>

                            <Slider disabled defaultValue={30} aria-label="Disabled slider" style={{ cursor: 'pointer' }} />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                            <label style={{ color: '#141C24', fontSize: '16px' }}>Цвет</label>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    gap: '8px'
                                }}
                            >
                                {colors.map((color) => (
                                    <div
                                        key={color.value}
                                        onClick={() => chooseColor(color.name)}
                                        style={{
                                            width: '40px',
                                            height: '40px',
                                            borderRadius: '50%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: filters.color === color.name ? '1px solid #FF5252' : '1px solid #E0E0E0',
                                            cursor: 'pointer',
                                            boxSizing: 'border-box',
                                            transition: 'border 0.2s',
                                        }}
                                        title={color.name}
                                    >
                                        <div
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '50%',
                                                background: color.value
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <CancelButton text="Сбросить все фильтры" onClick={cancelFilters} disabled={loading} width="35%" />
                        <SubmitButton text="Показать" onClick={applyFilters} disabled={loading} width="35%" />
                    </div>
                </div>
            ) : (
                null
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {cars.map(car => (
                    <CarCard key={car.id} loading={loading} car={car} />
                ))}
            </div>
        </div>
    );
};

export default CarsListPage;