import adminDetails from "./Reducer/AdminDate";
import mentorDetails from "./Reducer/MentorData";
import userDetails from "./Reducer/UserData"
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    adminDetails,
    mentorDetails,
    userDetails
})

export default rootReducer;