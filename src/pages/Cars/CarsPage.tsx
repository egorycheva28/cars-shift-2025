import CarCard from "./components/CarCard";
import InputForm from "../../components/InputForm";
import { Pagination } from "@mui/material";
import { useCarsPage } from "./hooks/useCarsPage";
import Filters from "./components/Filters";

const CarsPage = () => {

    const { state, functions } = useCarsPage();

    if (state.loading) {
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
                        value={state.filters.search || ''}
                        placeholder="Поиск"
                        onChange={functions.handleChange}
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
                        onChange={functions.handleChange}
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
                    }} onClick={functions.chooseFilters}>
                        <img src="../filtersWhite.png" style={{ height: '20px', width: '20px' }} />
                        <span style={{ color: '#FFFFFF', fontSize: '16px' }}>Фильтры</span>
                    </button>
                </div>
            </div>
            {state.isFilter ? (
                <Filters filters={state.filters} loading={state.loading} handleChange={functions.handleChange} chooseTransmission={functions.chooseTransmission}
                    chooseColor={functions.chooseColor} cancelFilters={functions.cancelFilters} applyFilters={functions.applyFilters} />
            ) : (
                null
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {state.cars.map(car => (
                    <CarCard key={car.id} loading={state.loading} car={car} />
                ))}
            </div>
            <div style={{ marginBottom: '25px', display: 'flex', justifyContent: 'center' }}>
                <Pagination
                    count={state.pagination.totalPages}
                    page={state.pagination.page}
                    onChange={(event, newPage) => functions.handleChangePage(newPage)}
                    variant="outlined"
                    shape="rounded"
                />
            </div>
        </div>
    );
};

export default CarsPage;