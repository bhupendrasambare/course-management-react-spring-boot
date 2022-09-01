import adminDetails from "./Reducer/AdminDate";
import mentorDetails from "./Reducer/MentorData";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    adminDetails,
    mentorDetails
})

export default rootReducer;