import React, {useState} from 'react';
import classes from "../Main/style.module.scss";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AddCategory = () => {

    const [name, setName] = useState(null)

    let navigate = useNavigate();


    function addCategory(event) {
        let category = event.target.value;
        setName(category)
    }

    function saveCategory() {
        axios
            .post(`http://94.139.255.120/api/article_types`,
                {name: name})
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        navigate("/categories")
        window.location.reload();
    }

    return (
        <>
            <div className={`${classes['main-wrapper']} container`}>
                <h1>Добавление новой категории</h1>
                <input onInput={addCategory} placeholder="Название категории"/>
                <button style={{maxWidth: '150px', padding: '5px', marginTop: '30px'}} onClick={saveCategory}>Сохранить категорию</button>
            </div>
        </>
    );
};

export default AddCategory;