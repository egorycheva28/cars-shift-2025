import { Slider, Tab, Tabs } from "@mui/material";
import { bodyTypeOptions, brandOptions, colors } from "../../../components/Constants";
import InputForm from "../../../components/InputForm";
import SubmitButton from "../../../components/SubmitButton";
import { FiltersDTO } from "../../../types/FiltersDTO";

interface FiltersProps {
    filters: FiltersDTO;
    loading: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    chooseTransmission: (newValue: any) => void;
    chooseColor: (newValue: any) => void;
    cancelFilters: () => void;
    applyFilters: () => void;
}

const Filters: React.FC<FiltersProps> = ({ filters, loading, handleChange, chooseTransmission, chooseColor, cancelFilters, applyFilters }) => {
    return (
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
                <SubmitButton text="Сбросить все фильтры" colorScheme="secondary" onClick={cancelFilters} disabled={loading} width="35%" />
                <SubmitButton text="Показать" colorScheme="primary" onClick={applyFilters} disabled={loading} width="35%" />
            </div>
        </div>
    );
};

export default Filters;