import axios from "axios"
import { base_url } from "../../utils/base_url"

const getProducts = async()=>{
    const response = await axios.get(`${base_url}/product`)
    return response.data
}

const product = {
    getProducts
}

export default product;

