
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
export const getAutoLoanById = async (value) => {
    const result = await Axios.get(
        `${process.env.REACT_APP_API_URL}/carloans/${value}`);

    console.log("all card",result.data)
    return result.data
}
export const getPersonalLoanById = async (value) => {
    const result = await Axios.get(
        `${process.env.REACT_APP_API_URL}/personalloans/${value}`);

    console.log("all card",result.data)
    return result.data
}
export const getHomeLoanById = async (value) => {
    const result = await Axios.get(
        `${process.env.REACT_APP_API_URL}/homeloans/${value}`);

    console.log("all card",result.data)
    return result.data
}