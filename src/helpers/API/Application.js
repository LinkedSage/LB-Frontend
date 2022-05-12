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

export const CarLoanApplicationAdd = async (values) => {
    console.log("application",values)
    const result = await axios.post(
        `${process.env.REACT_APP_API_URL}/carloanapplications/user/${values._id}`,{carLoanId: values.cardId}
        ,{
            headers: { 'Authorization': "Bearer "+ values.token }
        }
        );
    return result.data
}

export const HomeLoanApplicationAdd = async (values) => {
    console.log("application",values)
    const result = await axios.post(
        `${process.env.REACT_APP_API_URL}/homeloanapplications/user/${values._id}`,{homeLoanId: values.cardId}
        ,{
            headers: { 'Authorization': "Bearer "+ values.token }
        }
        );
    return result.data
}

export const personalLoanApplicationAdd = async (values) => {
    console.log("application",values)
    const result = await axios.post(
        `${process.env.REACT_APP_API_URL}/personalLoanApplications/user/${values._id}`,{personalLoanId: values.cardId}
        ,{
            headers: { 'Authorization': "Bearer "+ values.token }
        }
        );
    return result.data
}

export const getApplicationBYId = async (values) => {
    console.log("vvvv", values)
    const result = await Axios.get(
        `${process.env.REACT_APP_API_URL}/applications/users/${values}`);
    return result.data
}

export const PersonalLoanApplications = async (id,value) => {
    const result = await Axios.put(
        `${process.env.REACT_APP_API_URL}/personalLoanApplications/${id}`,{doccument_collection_schedule:value});
    return result.data
}

export const CreditCardApplications = async (id,value) => {
    const result = await Axios.put(
        `${process.env.REACT_APP_API_URL}/creditcardapplications/${id}`,{doccument_collection_schedule:value});
    return result.data
}

export const HomeloansApplication = async (id,value) => {
    const result = await Axios.put(
        `${process.env.REACT_APP_API_URL}/homeLoanapplications/${id}`,{doccument_collection_schedule:value});
    return result.data
}

export const CarLoanApplications = async (id,value) => {
    const result = await Axios.put(
        `${process.env.REACT_APP_API_URL}/carLoanApplications/${id}`,{doccument_collection_schedule:value});
    return result.data
}
