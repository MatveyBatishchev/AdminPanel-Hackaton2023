import React, {useEffect, useState} from 'react';
import classes from "../Categories/style.module.scss";
import CardComponent from "../../shared/ui/CardComponent";
import axios from "axios";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {Button} from "@mui/material";
import {Link} from "react-router-dom";


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
                <div className={classes['btn-row']}>
                    <AddCircleIcon style={{marginRight: '10px'}}/>
                    <Button variant="contained" color="success" className={classes['add']}><Link
                        to={'/arts/add_art'}> Добавить новое направление</Link></Button>
                </div>
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