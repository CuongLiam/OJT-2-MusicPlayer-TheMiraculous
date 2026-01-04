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
            if (!('password' in userData.data[0])){
                throw({ message: 'Test user has no password set in db.json. Add a `password` field for test users.' , data: null});
            }
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
            // Map roles array to a simple role string for compatibility
            const userRecord = userData.data[0];
            const rolesArr = userRecord.roles || [];
            let mappedRole = 'USER';
            if (rolesArr.includes('ROLE_ADMIN')) mappedRole = 'ADMIN';
            else if (rolesArr.includes('ROLE_MASTER')) mappedRole = 'MASTER';
            // Attach role to the user object so UI code can read `role`
            userRecord.role = mappedRole;
            return {
                message: "Login successfully!",
                data: userRecord
            }
        }
    }
    ,
    signup: async (data: { name: string; email: string; username?: string; password: string }) : Promise<{
        message: string,
        data: any
    }> => {
        // check existing by email or username
        const byEmail = await axios.get(`${import.meta.env.VITE_SV_HOST}/users?email=${data.email}`);
        if (byEmail.data && byEmail.data.length > 0) {
            throw({ message: 'Email already registered', data: null });
        }
        if (data.username) {
            const byUsername = await axios.get(`${import.meta.env.VITE_SV_HOST}/users?username=${data.username}`);
            if (byUsername.data && byUsername.data.length > 0) {
                throw({ message: 'Username already taken', data: null });
            }
        }

        // create user (json-server style)
        const names = (data.name || '').trim().split(/\s+/);
        const first_name = names.shift() || '';
        const last_name = names.join(' ') || '';
        const created = await axios.post(`${import.meta.env.VITE_SV_HOST}/users`, {
            first_name,
            last_name,
            email: data.email,
            username: data.username || data.email,
            password: data.password,
            profile_image: null,
            bio: null,
            status: 'ACTIVE',
            roles: ['ROLE_USER'],
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        });

        // created.data is the created user object
        const createdUser = created && created.data ? created.data : null;
        if (createdUser) createdUser.role = 'USER';
        return { message: 'Registration successful', data: createdUser };
    }
}