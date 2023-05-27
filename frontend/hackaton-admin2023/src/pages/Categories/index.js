import React, {useEffect, useState} from 'react';
import axios from "axios";
import classes from "./style.module.scss";
import CardComponent from "../../shared/ui/CardComponent";

const Categories = () => {

    const [categories, setCategories] = useState(null);

    useEffect(() => {
        axios
            .get('http://94.139.255.120/api/article_types')
            .then(data => {
                setCategories(data.data);
                console.log(data.data);
            })
    }, []);



    return (
        <>
            <div className={`${classes['main-wrapper']} container`}>
                <h1 className={classes['title']}>Все категории</h1>
                <div className={classes['content']}>
                    <div className={classes['first-row']}>
                        <p className={classes['subtitle']}>Название</p>
                    </div>
                    {categories && categories.map(category => {
                        return (
                            <CardComponent id={category.id}
                                           key={category.id}
                                           name={category.name}/>
                        )
                    })}
                </div>
            </div>
        </>
    );
};

export default Categories;