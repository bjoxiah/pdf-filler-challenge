import axios from "axios";
import { base_url } from "../constants";

let jwt = require('jsonwebtoken');
class UserService {
    static addUser = (data) => {
        return axios.post(base_url+'auth/register', data, { headers: 
            { 
              Authorization: 'Bearer ' + window.localStorage.token,
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
        })
        .then(
            (res) => {
                return res.data;
            }
        )
        .catch(err => {
            return err.response.data;
        })
    }

    static async getUserID() {
        // console.log(window.localStorage.token);
        // console.log(jwt.decode(window.localStorage.token));
        return jwt.decode(window.localStorage.token);
    }

    static fetchApplicants = () => {
        return axios.get(base_url+'pdf/applicants', { headers: 
            { 
              Authorization: 'Bearer ' + window.localStorage.token,
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
        })
        .then(
            (res) => {
                return res;
            }
        )
        .catch(err => {
            return err.response.data;
        })
    }

    static downLoadFile = (id) => {
        return axios.get(base_url+'pdf/getfile?applicantID=' + id, { headers: 
            { 
              Authorization: 'Bearer ' + window.localStorage.token,
              "Content-Type": "application/json",
              "Accept": "application/json"
            }
        })
        .then(
            (res) => {
                return res;
            }
        )
        .catch(err => {
            return err.response;
        })
    }
}

export default UserService;