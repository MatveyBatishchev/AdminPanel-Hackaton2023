import React, {useEffect, useState} from 'react';
import classes from './style.module.scss';
import {Checkbox, FormControlLabel} from "@mui/material";
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import {Link, useLocation} from "react-router-dom";
import axios from "axios";

const CardComponent = (props) => {

    const location = useLocation();

    const formatDate = (date) => {
        const options = Intl.DateTimeFormatOptions = { day: 'numeric', month: 'numeric', year: 'numeric',};
        return new Date(date).toLocaleDateString("ru-RU", options);
    }


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
                    <FormControlLabel control={<Checkbox defaultChecked/>}/>
                </div>
                {
                    location.pathname === '/articles' && <div>
                        <div className={classes['articles-info']}>
                            <p className={classes['text-name']}>
                                <Link to={`${location.pathname}/${props.id}`}>
                                    {props.name}
                                </Link>
                            </p>
                            <p className={classes['text-desc']}>{props.description}</p>
                            <p className={classes['text-type']}>{props.articleType}</p>
                            <p className={classes['text-created']}>{formatDate(props.createdAt)}</p>
                        </div>
                    </div>
                }
                {
                    location.pathname === '/categories' && <div>
                        <div className={classes['categories-info']}>
                            <p className={classes['text-name-cat']}>
                                <Link to={`${location.pathname}/${props.id}`}>
                                    {props.name}
                                </Link>
                            </p>
                        </div>
                    </div>
                }
                {
                    location.pathname === '/schools' && <div>
                        <div className={classes['schools-info']}>
                            <p className={classes['text-name-sc']}>
                                <Link to={`${location.pathname}/${props.id}`}>
                                    {props.name}
                                </Link>
                            </p>
                            <p className={classes['text-email']}>{props.email}</p>
                            <p className={classes['text-address']}>{props.address}</p>
                            <p className={classes['text-phone']}>{props.phoneNumber}</p>
                            <p className={classes['text-dist']}>{props.district.name}</p>
                        </div>
                    </div>
                }

                <Link to={`${location.pathname}_edit/${props.id}`}>
                    <CreateIcon style={{marginRight: '50px', marginLeft: '40px'}}/>
                </Link>
                <DeleteIcon onClick={onClickDelete}/>
                <div className={classes['bottom']}></div>
            </div>
        </>
    );
};

export default CardComponent;