import './App.scss';
import Navbar from "../shared/ui/Navbar";
import {Route, Routes} from "react-router-dom";
import Main from "../pages/Main";
import Article from "../pages/Article";
import Welcome from "../pages/Welcome";
import Categories from "../pages/Categories";
import CreateArticle from "../pages/CreateArticle";
import ArticleEditor from "../pages/ArticleEditor";
import Tests from "../pages/Tests";
import Test from "../pages/Test";
import CreateTest from "../pages/CreateTest";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Welcome />} />
                <Route path='/articles' element={<Main/>}/>
                <Route path="/articles/:id" element={<Article />} />
                <Route path="/articles/edit/:id" element={<ArticleEditor />} />
                <Route path='/categories' element={<Categories />}/>
                <Route path='/articles/add_article' element={<CreateArticle />} />
                <Route path='/tests' element={<Tests />} />
                <Route path='/tests/:id' element={<Test />} />
                <Route path='/tests/create_test' element={<CreateTest />} />
            </Routes>
        </>
    );
}

export default App;
