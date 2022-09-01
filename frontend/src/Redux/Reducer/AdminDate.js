const initialuser = {};

const adminDetails = (state = initialuser,action) =>{
    switch(action.type){
        case "GET-ADMIN" : {
            return state;
        }

        case "LOGIN-ADMIN" :{
            return action.payload
        }

        case "LOGOUT-ADMIN" : {
            return null;
        }

        default :return state;
    }
} 

export default adminDetails;