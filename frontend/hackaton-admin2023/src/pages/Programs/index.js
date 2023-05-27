import React, {useEffect, useState} from 'react';
import axios from "axios";
import classes from "../Categories/style.module.scss";
import CardComponent from "../../shared/ui/CardComponent";

const Programs = () => {

    const [programs, setPrograms] = useState(null);

    useEffect(() => {
        axios
            .get('http://94.139.255.120/api/study-programs')
            .then(data => {
                setPrograms(data.data);
                console.log(data.data);
            })
    }, []);



    return (
        <>
            <div className={`${classes['main-wrapper']} container`}>
                <h1 className={classes['title']}>Все учебные программы</h1>
                <div className={classes['content']}>
                    <div className={classes['first-row']}>
                        <p className={classes['subtitle']}>Название</p>
                    </div>
                    {programs && programs.map(program => {
                        return (
                            <CardComponent id={program.id}
                                           key={program.id}
                                           name={program.name}/>
                        )
                    })}
                </div>
            </div>
        </>
    );
};

export default Programs;