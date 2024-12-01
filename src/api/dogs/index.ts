
import { formAPI } from "../api"

export const postDogsProfile = async (body : FormData) => {
    const response = await formAPI.post('/dogs/profile', body)
    return response.data
}