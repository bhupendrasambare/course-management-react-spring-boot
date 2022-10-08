const initialuser = {};

const userDetails = (state = initialuser,action) =>{
    switch(action.type){
        case "GET-USER" : {
            return state;
        }

        case "LOGIN-USER" :{
            return action.payload
        }

        case "LOGOUT-USER" : {
            return {};
        }

        default :return state;
    }
} 

export default userDetails;