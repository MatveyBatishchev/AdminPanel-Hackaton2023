import React, {useEffect, useState} from 'react';
import classes from './style.module.scss';
import {Checkbox, FormControlLabel} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import {Link} from "react-router-dom";

const CardComponent = (props) => {

    const src = 'http://localhost:8080/api/articles'

    const [id, setId] = useState(null);

    useEffect(() => {
        axios
            .get(src)
            .then(data => {
                setId(data.data.id);
                console.log(data.data.id);
            })
    }, []);

    return (
        <>
            <div className={classes['card-wrapper']}>
                <div className={classes['checkbox']}>
                    <FormControlLabel control={<Checkbox defaultChecked />} />
                </div>
                <p className={classes['text']}><Link to={`/articles/${id}`} key={props.id} />{props.name}</p>
            <p className={classes['text']}>{props.description}</p>
                <p className={classes['text']}>{props.articleType}</p>
                <p className={classes['text']}>{props.createdAt}</p>
                <CreateIcon style={{marginRight: '120px', marginLeft: '40px'}}/>
                <DeleteIcon style={{marginRight: '10px'}}/>
            </div>
        </>
    );
};

export default CardComponent;