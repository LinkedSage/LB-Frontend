
import Axios from "../../Axios";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { setCookies, getCurrentUser } from "../Cookies/Cookies"

export const onSubmitLogin = async (values) => {
    console.log("vvvv", values)
    const result = await axios.post(
        `${process.env.REACT_APP_API_URL}/users/login`, values);
        console.log("1stxxxxxxxxxxxxxxxxxxxxxxxxxxxx",result)
    if (result.data.status == 200) {
        // setCookies('data', result.data.data, { path: '/' })
        // const abcd = getCurrentUser();
        const currentUser = jwt_decode(result.data.data);
        console.log('user', currentUser.data)
        if (currentUser.data.is_verified) setCookies('data', result.data.data, { path: '/' })
        result.data.data = currentUser.data
    }

    console.log("result", result)
    return result.data
}
export const onSubmitSignup = async (values) => {
    console.log("vvvv", values)
    const result = await Axios.post(
        `${process.env.REACT_APP_API_URL}/users/register`, values);
    return result.data
}
export const verifyOTP = async (values) => {
    console.log("vvvv", values)
    const result = await Axios.post(
        `${process.env.REACT_APP_API_URL}/users/verify-otp`, values);
    console.log("otp", result.data)
    if (result.data.status == 200) {
        setCookies('data', result.data.data, { path: '/' })
    }
    return result.data
}

export const isExistUser = async (values) => {
    console.log("vvvv", values)
    const result = await Axios.get(
        `${process.env.REACT_APP_API_URL}/users/is-user-exists?email=${values.email}&phone=${values.phone}`);
    return result.data
}

export const forceRegister = async (temp) => {
    console.log("vvvv", temp)
    let values = {
        name:temp.name,
        phone:temp.phone,
        email:temp.email,
        city: temp.city,
        employeement_information:{
            job_location: temp.city,
            profession:temp.profession,
            salary_amount:parseInt(temp.salary),
            organization:temp.organization || ''
        }
    }
    // if(temp.organization) values['employeement_information']['company_name'] = temp.organization
    console.log("vallll",values)
    const result = await Axios.post(
        `${process.env.REACT_APP_API_URL}/users/force-register`,values);
    return result.data
}
