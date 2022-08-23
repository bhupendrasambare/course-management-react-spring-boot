import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./User/User"
import Admin from "./Admin/Admin"
import Local from "./Local/Local"
import Mentor from "./Mentor/Mentor"
import PageNotFound from "./OffPage/PageNotFound"
function App() {
    return (
        <>
            <BrowserRouter>
              <Routes>
                    <Route path="/local" element={<Local/>}/>
                    <Route path="/user" element={<User/>} />
                    <Route path="/admin" element={<Admin/>} />
                    <Route path="/mentor" element={<Mentor/>} />
                    <Route path="*" element={<PageNotFound/>} />
              </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
