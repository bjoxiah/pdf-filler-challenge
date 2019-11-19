import axios from 'axios';
let ls = require('local-storage');

export default function execute() {
    axios.interceptors.request.use(
        config => {
            const token = window.localStorage.getItem('token');

            if ( token != null ) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }, 
        err => {
            console.log(err);
            if (err.response.status === 401) {
                console.log("Session Expired");
                //window.location = '/login'
            } else {
                return Promise.reject(err);
            }
        }
    );
}