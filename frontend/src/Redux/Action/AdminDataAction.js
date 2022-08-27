export const adminUser = () =>{
    return{
        type : "GET-USER"
    }
}
export const adminLoginUser = (user) =>{
    return {
        type:"LOGIN-USER",
        payload: {
            user
        }
    }
}

export const adminLogoutUser = () =>{
    return {
        type:"LOGOUT-USER"
    }
}