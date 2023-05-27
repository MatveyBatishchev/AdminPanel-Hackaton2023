import React, {useEffect, useState} from 'react';
import classes from './style.module.scss';
import CardComponent from "../../shared/ui/CardComponent";
import axios from "axios";

const Tests = () => {

    const [tests, setTests] = useState(null);

    useEffect(() => {
        axios
            .get('http://94.139.255.120/api/tests')
            .then(data => {
                setTests(data.data);
                console.log(data.data);
            })
    }, []);

    return (
        <>
            <div className={`${classes['main-wrapper']} container`}>
                <h1 className={classes['title']}>Все тесты</h1>
                <div className={classes['content']}>
                    <div className={classes['first-row']}>
                        <p className={classes['subtitle-name']}>Название</p>
                        <p className={classes['subtitle-dif']}>Сложность</p>
                        <p className={classes['subtitle-art']}>Направление</p>
                    </div>
                    {tests && tests.map(test => {
                        return (
                            <CardComponent id={test.id}
                                           key={test.id}
                                           name={test.title}
                                           dif={test.difficulty}
                                           art={test.art.name}
                            />
                        )
                    })}
                </div>
            </div>

        </>
    );
};

export default Tests;