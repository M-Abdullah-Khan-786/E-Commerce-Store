import axios from "axios"
import { base_url } from "../../utils/base_url"

const getOrders = async()=>{
    const response = await axios.get(`${base_url}/orders`)
    return response.data
}

const order = {
    getOrders
}

export default order;