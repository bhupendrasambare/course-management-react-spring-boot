export const mentorUser = () =>{
    return{
        type : "GET-MENTOR"
    }
}
export const mentorLoginUser = (mentor) =>{
    return {
        type:"LOGIN-MENTOR",
        payload: {
            mentor
        }
    }
}

export const mentorLogoutUser = () =>{
    return {
        type:"LOGOUT-MENTOR"
    }
}