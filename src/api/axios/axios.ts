import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://shift-intensive.ru/api',
    headers: {
        'Content-Type': 'application/json',
    },
});


const token = localStorage.getItem('token');

export const apiAuth = axios.create({
    baseURL: 'https://shift-intensive.ru/api',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
});