export const userUser = () =>{
    return{
        type : "GET-USER"
    }
}
export const userLoginUser = (user) =>{
    return {
        type:"LOGIN-USER",
        payload: {
            user
        }
    }
}

export const userLogoutUser = () =>{
    return {
        type:"LOGOUT-USER"
    }
}