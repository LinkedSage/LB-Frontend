
import Axios from "../../Axios";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { setCookies, getCurrentUserData } from "../Cookies/Cookies"

export const onSubmitLogin = async (values) => {
    console.log("vvvv", values)
    const result = await Axios.post(
        `${process.env.REACT_APP_API_URL}/user/login`, values);
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
        `${process.env.REACT_APP_API_URL}/user/register`, values);
    return result.data
}
export const verifyOTP = async (values) => {
    console.log("vvvv", values)
    const result = await Axios.post(
        `${process.env.REACT_APP_API_URL}/user/verify-otp`, values);
    console.log("otp", result.data)
    if (result.data.status == 200) {
        setCookies('data', result.data.data, { path: '/' })
        let userdata = result.data
           userdata.userData =  getCurrentUserData(result.data.data).data
           console.log("userdata",userdata)
        return userdata
    }
    else return result.data
   
}

export const isExistUser = async (values) => {
    console.log("vvvv", values)
    const result = await Axios.get(
        `${process.env.REACT_APP_API_URL}/user/is-user-exists?email=${values.email}&phone=${values.phone}`);
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
        `${process.env.REACT_APP_API_URL}/user/force-register`,values);
       let userdata
       if(result.data.status === 200)
       userdata =  getCurrentUserData(result.data.data)
       userdata.token = result.data
    
    return userdata
}



export const userUpdate = async (values,value) => {
    console.log("vvvv", values)
    const result = await axios.post(
        `${process.env.REACT_APP_API_URL}/user/update/${value._id}`,values,
        {
            headers: { 'Authorization': "Bearer "+ value.token }
        }
        );
        if (result.data.status == 200) {
            setCookies('data', result.data.data, { path: '/' })
        }

    console.log("otp", result.data)
    return  result.data
}


export const resetPassword = async (values) => {
    console.log("vvvv", values)
    // const result = await Axios.post(
    //     `${process.env.REACT_APP_API_URL}/user/force-register`,values);
       
    // return result
}


