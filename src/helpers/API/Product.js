
import Axios from "../../Axios";

export const getAllCards = async () => {
    const result = await Axios.get(
        `${process.env.REACT_APP_API_URL}/cards`);

    console.log("all card",result.data)
    return result.data
}