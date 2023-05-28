import React, {useEffect, useState} from 'react';
import axios from "axios";
import CardComponent from "../../shared/ui/CardComponent";
import classes from './style.module.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";

const src = 'http://94.139.255.120/api/articles'

const Main = () => {

    const [articles, setArticles] = useState(null);


    useEffect(() => {
        axios
            .get(src, {
                params: {
                    per_page: 100
                }
        })
            .then(data => {
                setArticles(data.data);
                console.log(data.data);
            })
    }, []);


    return (
        <>
            <div className={`${classes['main-wrapper']} container`}>
                <h1 className={classes['title']}>Все статьи</h1>
                <div className={classes['btn-row']}>
                    <AddCircleIcon style={{marginRight: '10px'}}/>
                    <Button variant="contained" color="success" className={classes['add']}><Link
                        to={'/articles/add_article'}> Добавить статью</Link></Button>
                </div>
                <div className={classes['content']}>
                    <div className={classes['first-row']}>
                        <p className={classes['subtitle-name']}>Название</p>
                        <p className={classes['subtitle-desc']}>Описание</p>
                        <p className={classes['subtitle-cat']}>Категория</p>
                        <p className={classes['subtitle-date']}>Дата создания</p>
                    </div>
                    <div className={classes['second-row']}>
                        {articles && articles.map(article => {
                            return (
                                <CardComponent id={article.id}
                                               key={article.id}
                                               name={article.name}
                                               description={article.description}
                                               articleType={article.articleType.name}
                                               createdAt={article.createdAt}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Main;