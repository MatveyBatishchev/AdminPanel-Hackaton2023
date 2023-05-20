import React, {useEffect, useState} from 'react';
import axios from "axios";
import CardComponent from "../../shared/ui/CardComponent";
import classes from './style.module.scss';

const src = 'http://localhost:8080/api/articles'

const Main = () => {

    const [articles, setArticles] = useState(null);

    useEffect(() => {
        axios
            .get(src)
            .then(data => {
                setArticles(data.data);
                console.log(data.data);
            })
    }, []);

    return (
        <>
            <div className={`${classes['main-wrapper']} container`}>
                <h1 className={classes['title']}>Все статьи</h1>
                <div className={classes['content']}>
                    <div className={classes['first-row']}>
                        <p className={classes['subtitle']}>Название</p>
                        <p className={classes['subtitle']}>Описание</p>
                        <p className={classes['subtitle']}>Категория</p>
                        <p className={classes['subtitle']}>Дата создания</p>
                    </div>
                    {articles && articles.map(article => {
                        return (
                            <CardComponent id={article.id} name={article.name} description={article.description}
                                           articleType={article.articleType.name} createdAt={article.createdAt}/>
                        )
                    })}
                </div>
            </div>
        </>
    );
};

export default Main;