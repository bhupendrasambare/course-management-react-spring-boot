import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import User from "./User/User"
import Admin from "./Admin/Admin"
import Local from "./Local/Local"
import Mentor from "./Mentor/Mentor"
import PageNotFound from "./OffPage/PageNotFound"
function App() {
    return (
        <>
            <HashRouter>
              <Routes>
                    <Route path="/*" element={<Local/>}/>
                    <Route path="/user/*" element={<User/>} />
                    <Route path="/admin/*" element={<Admin/>} />
                    <Route path="/mentor/*" element={<Mentor/>} />
                    <Route path="*" element={<PageNotFound/>} />
              </Routes>
            </HashRouter>
        </>
    );
}

export default App;
