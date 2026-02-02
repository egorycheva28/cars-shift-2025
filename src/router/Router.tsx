import { Routes, Route } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import CarsPage from '../pages/Cars/CarsPage';
import CarDetailPage from '../pages/CarDetail/CarDetailPage';
import CarRentalPage from '../pages/CarRental/CarRentalPage';
import CarRentPage from '../pages/CarRental/components/CarRent/CarRentPage';
import AuthPage from '../pages/Auth/AuthPage';
import ProfilePage from '../pages/Profile/ProfilePage';
import RentsPage from '../pages/Rents/RentsPage';
import RentDetailPage from '../pages/RentDetail/RentDetailPage';

const Router = () => {

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<CarsPage />} />
                <Route path="/cars" element={<CarsPage />} />
                <Route path="/car/:id" element={<CarDetailPage />} />
                <Route path="/car/rent/:id" element={<CarRentalPage />} />
                <Route path="/car/rent" element={<CarRentPage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/rents" element={<RentsPage />} />
                <Route path="/rent/:id" element={<RentDetailPage />} />
            </Routes>
        </>
    );
};

export default Router;