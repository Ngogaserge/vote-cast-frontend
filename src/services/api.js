import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Replace with your backend's base URL

export const getVoterDashboardData = async () => {
    return await axios.get(`${BASE_URL}/voter/dashboard`);
};

export const updateUser = async (userData) => {
    return await axios.post(`${BASE_URL}/admin/users/update`, userData);
};
