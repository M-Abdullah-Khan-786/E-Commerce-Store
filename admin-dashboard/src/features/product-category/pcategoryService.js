import axios from "axios"
import { base_url } from "../../utils/base_url"

const getCproducts = async()=>{
    const response = await axios.get(`${base_url}/product-category`)
    return response.data
}

const productCategory = {
    getCproducts
}

export default productCategory;

