import React, {useEffect, useState} from 'react';
import classes from './style.module.scss';
import {Checkbox, FormControlLabel} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link, useLocation} from "react-router-dom";
import axios from "axios";

const CardComponent = (props) => {

    const location = useLocation();

    function onClickDelete() {
        axios
            .delete(`http://localhost:8080/api${location.pathname}/${props.id}`)
            .then(function (response) {
                console.log(response);
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    return (
        <>
            <div className={classes['card-wrapper']}>
                <div className={classes['checkbox']}>
                    <FormControlLabel control={<Checkbox defaultChecked/>} />
                </div>
                <p className={classes['text-name']}>
                    <Link to={`${location.pathname}/${props.id}`}>
                        {props.name}
                    </Link>
                </p>
                <p className={classes['text-desc']}>{props.description}</p>
                <p className={classes['text-type']}>{props.articleType}</p>
                <p className={classes['text-created']}>{props.createdAt}</p>
                <Link to={`${location.pathname}_edit/${props.id}`}>
                    <CreateIcon style={{marginRight: '50px', marginLeft: '40px'}} />
                </Link>
                <DeleteIcon style={{marginRight: '10px'}} onClick={onClickDelete}/>
                <div className={classes['bottom']}></div>
            </div>
        </>
    );
};

export default CardComponent;