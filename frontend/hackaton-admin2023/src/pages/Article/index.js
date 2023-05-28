import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import classes from './style.module.scss';
import axios from "axios";
import Output from 'editorjs-react-renderer';


const Article = (props) => {

    const {id} = useParams();

    const [articleData, setData] = useState(null);
    const [contentData, setContentData] = useState(null);
    const [artData, setArtData] = useState(null);

    useEffect(() => {
        axios
            .get(`http://94.139.255.120/api/articles/${id}`)
            .then(data => {
                setData(data.data);
                console.log(data.data);
            })
    }, []);

    useEffect(() => {
        if (articleData) {
            let information = JSON.parse(articleData.content);
            setContentData(information);
            setArtData(articleData.arts);
        }
    }, [articleData])

    return (
        <>
            <div className={`${classes['article-wrapper']} container`}>
                {articleData ? (
                        <>
                            <h1 className={classes['title']}>{articleData.name}</h1>
                            <div></div>
                            <h3 className={classes['paragraph']}>Направления</h3>
                                {artData && artData.map(art => {
                                    return (
                                        <p className={classes['subtitle']}>{art.name}</p>
                                    )
                                })
                                }
                            <h3 className={classes['subtitle']}>Категории: </h3>
                            <p className={classes['subtitle']}> {articleData.articleType.name}</p>
                            <h3 className={classes['subtitle']}>Описание статьи: </h3>
                            <p className={classes['subtitle']}>{articleData.description}</p>
                            <h3 className={classes['subtitle']}>Содержание: </h3>
                            <section><Output data={contentData}/></section>
                            <div className={classes['image-container']}>
                                <img className={classes['article-image']} src={articleData.image}/>
                            </div>
                        </>
                    ) :
                    (
                        <h1 className={`${classes['loading']} container`}>Пожалуйста, подождите. Страница загружается.</h1>
                    )
                }

                <button className={classes['back-btn']}><Link to={'/articles'}>Вернуться назад</Link></button>
            </div>
        </>
    );
};

export default Article;