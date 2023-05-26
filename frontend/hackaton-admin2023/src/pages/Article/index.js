import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import classes from './style.module.scss';
import axios from "axios";
import Output from 'editorjs-react-renderer';


const Article = (props) => {

    const {id} = useParams();

    const [articleData, setData] = useState(null);
    const [contentData, setContentData] = useState(null);

    useEffect(() => {
        axios
            .get(`http://localhost:8080/api/articles/${id}`)
            .then(data => {
                setData(data.data);
                console.log(data.data);
            })
    }, []);

    useEffect(() => {
        if (articleData) {
            let information = JSON.parse(articleData.content);
            setContentData(information);
        }
    }, [articleData])

    return (
        <>
            <div className={`${classes['article-wrapper']} container`}>
                {articleData ? (
                        <>

                            <h1 className={classes['title']}>{articleData.name}</h1>
                            <h1 className={classes['subtitle']}>{articleData.desc}</h1>
                            <section><Output data={contentData}/></section>

                        </>
                    ) :
                    (
                        <h1 className={`${classes['loading']} container`}>Привет! Page is Loading</h1>
                    )
                }

                <button className={classes['back-btn']}><Link to={'/articles'}>Вернуться назад</Link></button>
            </div>
        </>
    );
};

export default Article;