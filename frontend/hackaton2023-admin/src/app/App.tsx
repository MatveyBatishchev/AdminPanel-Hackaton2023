import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Admin, Resource } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';
import './App.css';
import News from "../pages/News";
import NewsList from "../widgets/NewsList";

function App() {
    return (
        <div className="App">
            <Admin dataProvider={simpleRestProvider('http://localhost:8080/api')}>
                <Resource name="news" list={NewsList} />
            </Admin>
        </div>
    );
}

export default App;
