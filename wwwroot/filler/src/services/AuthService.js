import axios from "axios";
import { base_url } from "../constants";
import { toast } from "react-toastify";

class AuthService {

    static checkAuth = () => {
        return axios.get(base_url+'?id=check_auth')
            .then(
                (res) => {
                    return res.data;
                }
            )
    }

    static signOut = () => {
        window.localStorage.clear();
    }

    static tokenExist = ()  => {
        if (window.localStorage.getItem('token') === null) {
            toast.dismiss();
            toast.error('⚠️ This view is protected!');
            return false;
        }
        return true;
    }

}

export default AuthService;