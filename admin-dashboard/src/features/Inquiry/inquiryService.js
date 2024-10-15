import axios from "axios"
import { base_url } from "../../utils/base_url"

const getInquiry = async()=>{
    const response = await axios.get(`${base_url}/inquiry`)
    return response.data
}

const inquiry = {
    getInquiry
}

export default inquiry;

