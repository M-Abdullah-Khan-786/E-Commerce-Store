import axios from "axios"
import { base_url } from "../../utils/base_url"

export const getInquirys = async()=>{
    const response = await axios.get(`${base_url}/inquiry`)
    return response.data
}

