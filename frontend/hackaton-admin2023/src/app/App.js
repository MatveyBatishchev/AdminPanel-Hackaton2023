import './App.scss';
import Navbar from "../shared/ui/Navbar";
import {Route, Routes} from "react-router-dom";
import Main from "../pages/Main";
import Article from "../pages/Article";
import Welcome from "../pages/Welcome";
import Categories from "../pages/Categories";
import CreateArticle from "../pages/CreateArticle";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Welcome />} />
                <Route path='/articles' element={<Main/>}/>
                <Route path="/articles/:id" element={<Article />} />
                <Route path='/categories' element={<Categories />}/>
                <Route path='/articles/add_article' element={<CreateArticle />} />
            </Routes>
        </>
    );
}

export default App;
