import React, {useEffect, useState} from 'react';
import axios from "axios";
import classes from "../Categories/style.module.scss";
import CardComponentEmpty from "../../shared/ui/CardComponentEmpty";

const Districts = () => {

    const [districts, setDistricts] = useState(null);

    useEffect(() => {
        axios
            .get('http://94.139.255.120/api/districts')
            .then(data => {
                setDistricts(data.data);
                console.log(data.data);
            })
    }, []);



    return (
        <>
            <div className={`${classes['main-wrapper']} container`}>
                <h1 className={classes['title']}>Все округа</h1>
                <div className={classes['content']}>
                    <div className={classes['first-row']}>
                        <p className={classes['subtitle']}>Название</p>
                    </div>
                    {districts && districts.map(district => {
                        return (
                            <CardComponentEmpty id={district.id}
                                           key={district.id}
                                           name={district.name}/>
                        )
                    })}
                </div>
            </div>
        </>
    );
};

export default Districts;