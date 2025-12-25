import axios from "axios"

export interface UserSigninDTO{ //data transfer object
    emailOrUserName: string
    password: string
}

export const UserApi = {
    signin: async (data : UserSigninDTO): Promise<{
        message: string,
        data: any 
    }> =>{
        let userData = await axios.get(`${import.meta.env.VITE_SV_HOST}/users?email=${data.emailOrUserName}`);
        if (userData.data.length === 0) {
            // Try username if not found by email
            userData = await axios.get(`${import.meta.env.VITE_SV_HOST}/users?username=${data.emailOrUserName}`);
        }

        if(userData.data.length == 0){
            // return {
            //     message: "cannot find that user, please try again!",
            //     data: null
            // }

            throw({

                message: "cannot find that user, please try again!",
                data: null
            
            });
        } else{
            if(userData.data[0].password != data.password){
                // return {
                //     message: "Wrong password",
                //     data: null
                // }

                throw({
                    message: "Wrong password",
                    data: null
                })
            }
            return {
                message: "Login successfully!",
                data: userData
            }
        }
    }
}