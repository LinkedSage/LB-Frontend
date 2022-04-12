
import Axios from "../../Axios";

export const getAllCards = async () => {
    const result = await Axios.get(
        `${process.env.REACT_APP_API_URL}/cards`);

    console.log("all card",result.data)
    return result.data
}
export const getCardById = async (value) => {
    const result = await Axios.get(
        `${process.env.REACT_APP_API_URL}/cards/${value}`);

    console.log("all card",result.data)
    return result.data
}