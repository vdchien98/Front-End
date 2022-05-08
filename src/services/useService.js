import axios from '../axios';
//axios cos chuc nang la gui req len server
const handleLoginApi = (userEmail, userPassword) => {
    //userEmail va userPassword là những giá trị tuyền vào
    return axios.post('/api/login', {
        email: userEmail,
        password: userPassword,
    });
};

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
};

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
};

export { handleLoginApi, getAllUsers, createNewUserService };
