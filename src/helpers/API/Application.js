import Axios from "../../Axios";
import axios from "axios";

export const cardApplicationAdd = async (values) => {
    console.log("application",values)
    const result = await axios.post(
        `${process.env.REACT_APP_API_URL}/creditcardapplications/user/${values._id}`,{cardId: values.cardId}
        ,{
            headers: { 'Authorization': "Bearer "+ values.token }
        }
        );
    return result.data
}

export const personalLoanApplicationAdd = async (values) => {
    console.log("application",values)
    const result = await axios.post(
        `${process.env.REACT_APP_API_URL}/personalLoanApplications/user/${values._id}`,{cardId: values.cardId}
        ,{
            headers: { 'Authorization': "Bearer "+ values.token }
        }
        );
    return result.data
}

export const getApplicationBYId = async (values) => {
    console.log("vvvv", values)
    const result = await Axios.get(
        `${process.env.REACT_APP_API_URL}/creditcardapplications/users/${values}`);
    return result.data
}
