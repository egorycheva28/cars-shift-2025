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

const Router = ({ toggleTheme, isDark }: { toggleTheme: () => void, isDark: boolean }) => {

    return (
        <>
            <Navbar onToggleTheme={toggleTheme} isDark={isDark} />
            <Routes>
                <Route path="/" element={<CarsPage isDark={isDark} />} />
                <Route path="/cars" element={<CarsPage isDark={isDark} />} />
                <Route path="/car/:id" element={<CarDetailPage isDark={isDark} />} />
                <Route path="/car/rent/:id" element={<CarRentalPage isDark={isDark} />} />
                <Route path="/car/rent" element={<CarRentPage isDark={isDark} />} />
                <Route path="/login" element={<AuthPage isDark={isDark} />} />
                <Route path="/profile" element={<ProfilePage isDark={isDark} />} />
                <Route path="/rents" element={<RentsPage isDark={isDark} />} />
                <Route path="/rent/:id" element={<RentDetailPage isDark={isDark} />} />
            </Routes>
        </>
    );
};

export default Router;