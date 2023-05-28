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
import Category from "../pages/Category";
import Schools from "../pages/Schools";
import School from "../pages/School";
import Arts from "../pages/Arts";
import Users from "../pages/Users";
import Programs from "../pages/Programs";
import Districts from "../pages/Discricts";
import AddSchool from "../pages/AddSchool";
import AddCategory from "../pages/AddCategory";
import AddArt from "../pages/AddArt";

function App() {
    return (
        <>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Welcome />} />
                <Route path='/articles' element={<Main/>}/>
                <Route path="/articles/:id" element={<Article />} />
                <Route path="/categories/:id" element={<Category />} />
                <Route path="/articles_edit/:id" element={<ArticleEditor />} />
                <Route path="/categories/add_category" element={<AddCategory />} />
                <Route path='/categories' element={<Categories />}/>
                <Route path='/articles/add_article' element={<CreateArticle />} />
                <Route path='/tests' element={<Tests />} />
                <Route path='/tests/:id' element={<Test />} />
                <Route path='/tests/create_test' element={<CreateTest />} />
                <Route path='/schools' element={<Schools/>} />
                <Route path='/schools/:id' element={<School />} />
                <Route path='/schools/add_school' element={<AddSchool />} />
                <Route path='/arts' element={<Arts />} />
                <Route path='/arts/add_art' element={<AddArt />} />
                <Route path='/users' element={<Users />}/>
                <Route path='/programs' element={<Programs />} />
            </Routes>
        </>
    );
}

export default App;
