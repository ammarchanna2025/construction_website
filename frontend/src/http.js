export const apiUrl = 'http://localhost:8000/api/';
export const fileUrl = 'http://localhost:8000/uploads/';

export const token = () => {
    try {
        const userInfo = localStorage.getItem('userInfo');
        if (userInfo) {
            const data = JSON.parse(userInfo);
            return data.token;
        }
    } catch (error) {
        console.error('Error parsing user info:', error);
    }
    return null;
};
