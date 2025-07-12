import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import CarsListPage from '../pages/Cars/CarsListPage';
import CarByIdPage from '../pages/Cars/CarByIdPage';
import CarRentalPage from '../pages/CarRental/CarRentalPage';
import CarRentPage from '../pages/CarRental/CarRentPage';
import AuthPage from '../pages/Auth/AuthPage';
import ProfilePage from '../pages/Profile/ProfilePage';

const Router: React.FC = () => {

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<CarsListPage />} />
                <Route path="/cars" element={<CarsListPage />} />
                <Route path="/car/:id" element={<CarByIdPage />} />
                <Route path="/car/rent/:id" element={<CarRentalPage />} />
                <Route path="/car/rent" element={<CarRentPage />} />
                <Route path="/login" element={<AuthPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </>
    );
};

export default Router;