const initialmentor = {};

const mentorDetails = (state = initialmentor,action) =>{
    switch(action.type){
        case "GET-MENTOR" : {
            return state;
        }

        case "LOGIN-MENTOR" :{
            return action.payload
        }

        case "LOGOUT-MENTOR" : {
            return {};
        }

        default :return state;
    }
} 

export default mentorDetails;