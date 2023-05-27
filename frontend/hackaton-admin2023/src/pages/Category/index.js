import React, {useEffect, useState} from 'react';
import classes from "../Article/style.module.scss";
import Output from "editorjs-react-renderer";
import {Link, useParams} from "react-router-dom";
import axios from "axios";

const Category = () => {

    const {id} = useParams();

    const [categoriesData, setData] = useState(null);

    useEffect(() => {
        axios
            .get(`http://94.139.255.120/api/article_types/${id}`)
            .then(data => {
                setData(data.data);
                console.log(data.data);
            })
    }, []);

    return (
        <>
            <div className={`${classes['categories-wrapper']} container`}>
                {categoriesData ? (
                        <>

                            <h1 className={classes['title']}>{categoriesData.name}</h1>
                            <h1 className={classes['subtitle']}>{categoriesData.desc}</h1>

                        </>
                    ) :
                    (
                        <h1 className={`${classes['loading']} container`}>Привет! Page is Loading</h1>
                    )
                }

                <button className={classes['back-btn']}><Link to={'/categories'}>Вернуться назад</Link></button>
            </div>
        </>
    );
};
export default Category;