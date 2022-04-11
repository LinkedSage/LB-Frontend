
import Axios from "../../Axios";

export const cardApplicationAdd = async () => {
    const result = await Axios.get(
        `${process.env.REACT_APP_API_URL}/creditcardapplications/user/${values._id}`,{cardId: values.cardId});
    return result.data
}