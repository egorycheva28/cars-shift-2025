import React from "react";
import { useNavigate } from "react-router-dom";
import { RentDTO } from "../../../types/RentDTO";
import { translateStatus } from "../../../components/Constants";
import { activeCar, formatTimestampToDate } from "../../../components/CommonFunctions";

interface CarCardProps {
    rent: RentDTO;
    isDark: boolean;
}

const RentCard: React.FC<CarCardProps> = ({ rent, isDark }) => {

    const navigate = useNavigate();

    return (
        <div style={{
            borderTop: '1px solid #E3E5E5',
            paddingTop: '16px',
            paddingBottom: '16px',
            width: '100%',
            display: 'flex',
            gap: '24px',
            flexDirection: 'row',
            alignItems: 'center'
        }}
        >
            <div style={{ display: 'flex', gap: '2px', width: '150px' }}>
                <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24' }}>{rent.carInfo.name}</span>
            </div>
            <div style={{ display: 'flex', gap: '8px', width: '428px' }}>
                <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24' }}>{formatTimestampToDate(rent.startDate)} - {formatTimestampToDate(rent.endDate)}</span>
            </div>
            <div style={{ display: 'flex', gap: '12px', flexDirection: 'row', width: '160px', alignItems: 'center' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: activeCar(rent.status, rent.startDate, rent.endDate) ? '#4ECF53' : (rent.status == 0 ? '#FDD442' : '#F64C4C') }}></div>
                <span style={{ fontSize: '16px', color: isDark ? '#FFFFFF' : '#141C24' }}>{activeCar(rent.status, rent.startDate, rent.endDate) ? 'Активна' : translateStatus[rent.status]}</span>
            </div>
            <span style={{ fontSize: '12px', color: '#97A1AF', textDecoration: 'underline', fontWeight: 400, cursor: 'pointer' }} onClick={() => navigate(`/rent/${rent._id}`)}>Подробнее</span>
        </div >
    );
};

export default RentCard;