import React, {useEffect, useState} from 'react';
import classes from './style.module.scss';
import {Checkbox, FormControlLabel} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link} from "react-router-dom";

const CardComponent = (props) => {

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
                <CreateIcon style={{marginRight: '120px', marginLeft: '40px'}}/>
                <DeleteIcon style={{marginRight: '10px'}}/>
            </div>
        </>
    );
};

export default CardComponent;