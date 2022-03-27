
import  Axios  from "../../Axios";
import { setCookies, getCurrentUser } from "../Cookies/Cookies"

export const onSubmitLogin = async (values) => {
    console.log("vvvv", values)
    const result = await Axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,values );
    if(result.data.status == 200){
        setCookies('data', result.data.data, { path: '/' })
        const abcd = getCurrentUser();
        result.data.data = abcd.data
    }

    console.log("result",result)
    return result.data
}
export const onSubmitSignup = async (values) => {
    console.log("vvvv", values)
    const result = await Axios.post(
        `${process.env.REACT_APP_API_URL}/users/register`,values );
    return result.data
}
export const verifyOTP = async (values) => {
    console.log("vvvv", values)
    const result = await Axios.post(
        `${process.env.REACT_APP_API_URL}/users/verify-otp`,values );
    return result.data
}

