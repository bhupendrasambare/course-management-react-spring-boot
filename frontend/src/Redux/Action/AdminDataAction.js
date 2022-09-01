export const adminUser = () =>{
    return{
        type : "GET-ADMIN"
    }
}
export const adminLoginUser = (admin) =>{
    return {
        type:"LOGIN-ADMIN",
        payload: {
            admin
        }
    }
}

export const adminLogoutUser = () =>{
    return {
        type:"LOGOUT-ADMIN"
    }
}