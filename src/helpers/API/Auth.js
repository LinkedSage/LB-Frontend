
import  Axios  from "../../Axios";
import jwt_decode from "jwt-decode";
import { setCookies, getCurrentUser } from "../Cookies/Cookies"

export const onSubmitLogin = async (values) => {
    console.log("vvvv", values)
    const result = await Axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`,values );
    if(result.data.status == 200){
        // setCookies('data', result.data.data, { path: '/' })
        // const abcd = getCurrentUser();
        const currentUser = jwt_decode(result.data.data);
      console.log('user',currentUser.data)
      if(currentUser.data.is_verified) setCookies('data', result.data.data, { path: '/' })
      result.data.data = currentUser.data
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
    console.log("otp",result.data)
    if(result.data.satatus == 200) setCookies('data', result.data.data, { path: '/' })
    return result.data
}

