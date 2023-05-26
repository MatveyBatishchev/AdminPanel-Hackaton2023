import React, {useEffect, useState} from 'react';
import classes from "../Main/style.module.scss";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import CardComponent from "../../shared/ui/CardComponent";
import axios from "axios";

const src = 'http://localhost:8080/api/schools'

const Schools = () => {

    const [schools, setSchools] = useState(null);


    useEffect(() => {
        axios
            .get(src)
            .then(data => {
                setSchools(data.data);
                console.log(data.data);
            })
    }, []);

    return (
        <>
            <div className={`${classes['main-wrapper']} container`}>
                <h1 className={classes['title']}>Все школы</h1>
                <div className={classes['btn-row']}>
                    <AddCircleIcon style={{marginRight: '10px'}}/>
                    <Button variant="contained" color="success" className={classes['add']}><Link
                        to={'/articles/add_article'}> Добавить школу</Link></Button>
                </div>
                <div className={classes['content']}>
                    <div className={classes['first-row']}>
                        <p className={classes['subtitle']}>Название</p>
                        <p className={classes['subtitle']}>Email</p>
                        <p className={classes['subtitle']}>Адрес</p>
                        <p className={classes['subtitle']}>Номер телефона</p>
                        <p className={classes['subtitle']}>Округ</p>
                    </div>
                    <div className={classes['second-row']}>
                        {schools && schools.map(school => {
                            return (
                                <CardComponent id={school.id}
                                               key={school.id}
                                               name={school.name}
                                               email={school.email}
                                               address={school.address}
                                               phoneNumber={school.phoneNumber}
                                               district={school.district.name}/>
                            )
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Schools;