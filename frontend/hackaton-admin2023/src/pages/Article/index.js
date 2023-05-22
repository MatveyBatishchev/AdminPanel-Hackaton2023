import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import classes from './style.module.scss';
import axios from "axios";


const Article = (props) => {

    const {id} = useParams();

    console.log(id)

    const [articleData, setData] = useState(null);


    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/articles/${id}`)
            .then(data => {
                setData(data.data);
                console.log(data.data);
            })
    }, []);

    return (
        <>
            {articleData ? (
                <>
                    <h1 className={`${classes['title']} container`}>{articleData.name}</h1>
                    <h1 className={`${classes['title']} container`}>{articleData.desc}</h1>
                    <h1 className={`${classes['title']} container`}>{articleData.content}</h1>
                </>
                ) :
                (
                    <h1 className={`${classes['loading']} container`}>Привет! Page is Loading</h1>
                )
            }


        </>
    );
};

export default Article;