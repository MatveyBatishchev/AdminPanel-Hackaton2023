import './App.scss';
import Navbar from "../shared/ui/Navbar";
import {Route, Routes} from "react-router-dom";
import Main from "../pages/Main";
import Article from "../pages/Article";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path='/articles' element={<Main/>}/>
                <Route path='/articles/:id' element={<Article/>}/>
            </Routes>
        </>
    );
}

export default App;
