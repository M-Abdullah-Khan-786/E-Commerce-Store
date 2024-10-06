import axios from "axios"
import { base_url } from "../../utils/base_url"

const login = async(userData)=>{
    const response = await axios.post(`${base_url}/user/login-admin`, userData)
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const auth = {
    login
}

export default auth;

