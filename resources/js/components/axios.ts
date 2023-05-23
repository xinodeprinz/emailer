import axios from 'axios';
import sweetAlert from './alert';

axios.interceptors.request.use(request => {
    return request;
}, error => {
    sweetAlert({ icon: 'error', title: "An error occured! Please try again." });
    return Promise.reject(error);
});

axios.interceptors.response.use(response => {
    return response;
}, error => {
    sweetAlert({ icon: 'error', title: error.response.data.message });
    return Promise.reject(error);
});


export default axios;