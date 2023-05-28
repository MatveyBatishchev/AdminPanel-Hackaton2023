import React from 'react';
import classes from './style.module.scss';
import {Link} from "react-router-dom";

const Welcome = () => {
    return (
        <>
            <div className={`${classes['welcome-wrapper']} container`}>
                <h1 className={classes['title']}>Добро пожаловать!</h1>
                <h2 className={classes['subtitle']}>Вы находитесь в административной панели приложения Мос.Культура</h2>
                <p className={classes['paragraph']}>Навигация по сайту:</p>
                <p className={classes['text']}><Link to={'/articles'}>Статьи</Link></p>
                <p className={classes['text']}><Link to={'/categories'}>Категории статей</Link></p>
                <p className={classes['text']}><Link to={'/arts'}>Направления</Link></p>
                <p className={classes['text']}><Link to={'/schools'}>Школы</Link></p>
                <p className={classes['text']}><Link to={'/tests'}>Тесты</Link></p>
                <p className={classes['text']}><Link to={'/users'}>Пользователи</Link></p>
                <p className={classes['text']}><Link to={'/programs'}>Учебные программы школ</Link></p>
            </div>
        </>
    );
};

export default Welcome;