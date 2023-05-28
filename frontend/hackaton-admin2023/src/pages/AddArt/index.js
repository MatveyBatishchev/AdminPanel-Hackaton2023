import React, {useState} from 'react';
import classes from "../Main/style.module.scss";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const AddArt = () => {

    const [name, setName] = useState(null)

    let navigate = useNavigate();


    function addArt(event) {
        let art = event.target.value;
        setName(art)
    }

    function saveArt() {
        axios
            .post(`http://94.139.255.120/api/arts`,
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
                <h1>Добавление нового направления</h1>
                <input onInput={addArt} placeholder="Название направления"/>
                <button style={{maxWidth: '200px', padding: '5px', marginTop: '30px'}} onClick={saveArt}>Сохранить направление</button>
            </div>
        </>
    );
};

export default AddArt;