import React, {useEffect, useState} from 'react';
import classes from './style.module.scss';
import {Checkbox, FormControlLabel} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from "react-router-dom";
import axios from "axios";

const CardComponent = (props) => {

    function onClickDelete() {
        axios
            .delete(`http://localhost:8080/api/articles/${props.id}`)
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
                    <FormControlLabel control={<Checkbox defaultChecked/>}/>
                </div>
                <p className={classes['text-name']}><Link to={`/articles/${props.id}`}>{props.name}</Link></p>
                <p className={classes['text-desc']}>{props.description}</p>
                <p className={classes['text-type']}>{props.articleType}</p>
                <p className={classes['text-created']}>{props.createdAt}</p>
                <Link to={`/articles/edit/${props.id}`}><CreateIcon style={{marginRight: '120px', marginLeft: '40px'}} /></Link>
                <DeleteIcon style={{marginRight: '10px'}} onClick={onClickDelete}/>
            </div>
        </>
    );
};

export default CardComponent;