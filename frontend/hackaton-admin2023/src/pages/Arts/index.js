import React, {useEffect, useState} from 'react';
import classes from "../Categories/style.module.scss";
import CardComponent from "../../shared/ui/CardComponent";
import axios from "axios";


const Arts = () => {


    const [arts, setArts] = useState(null);

    useEffect(() => {
        axios
            .get('http://94.139.255.120/api/arts')
            .then(data => {
                setArts(data.data);
                console.log(data.data);
            })
    }, []);

    return (
        <>
            <div className={`${classes['main-wrapper']} container`}>
                <h1 className={classes['title']}>Все направления</h1>
                <div className={classes['content']}>
                    <div className={classes['first-row']}>
                        <p className={classes['subtitle']}>Название</p>
                    </div>
                    {arts && arts.map(art => {
                        return (
                            <CardComponent id={art.id}
                                           key={art.id}
                                           name={art.name}/>
                        )
                    })}
                </div>
            </div>
        </>
    );
};

export default Arts;