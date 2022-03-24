
import { setCookies, removeCookies } from "../Cookies/Cookies"


// export const onSubmiting = async (values) => {
//     let user_data = {}


//     const form_data = {
//         email: values.email,
//         password: values.password
//     }

//     let baseURL = process.env.REACT_APP_LOCAL_BASE_URL
//     if (process.env.REACT_APP_ENVIRONMENT == "production") {
//         baseURL = process.env.REACT_APP_PRODUCTION_URL
//     } else if (process.env.REACT_APP_ENVIRONMENT == "development") {
//         baseURL = process.env.REACT_APP_BASE_URL
//     }

//     let result = await fetch(baseURL + ADMIN.login, MethodHeader('post', form_data, 'application/json'))
//         .then((response) => {
//             return response.json()
//         })
//         .catch((err) => {
//             console.log(err)
//         })

//     if (result.status === 'undefined') {
//         removeCookies('data', { path: '/' })
//         return false
//     } else {
//         if (result.status == 200) {
//             user_data.role = result.data.role
//             user_data.token = result.token
//             user_data.user = result.userAccess
//             user_data.permission = result.data.admin_dashbaord_permission

//             setCookies('data', user_data, { path: '/' })

//             return result
//         } else {
//             console.warn("Can't not login.")
//             return result
//         }
//     }
// }

export const onSubmitLogin = async (values) => {
    console.log("vvvv", values)

    let value = {
        data: values,
        status: 200,
        msg: 'Login success',
        token: 'C277CB47DEC48A3CCEFE63DF4742E'
    }
    setCookies('data', value, { path: '/' })
    return value

}

