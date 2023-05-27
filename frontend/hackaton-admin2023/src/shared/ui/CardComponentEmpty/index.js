import React from 'react';
import classes from './style.module.scss';

const CardComponentEmpty = (props) => {

    return (
        <>
            <div className={classes['card-wrapper']}>
                <ul className={classes['districts-info']}>
                    <li className={classes['text-name-districts']}>
                            {props.name}
                    </li>
                </ul>
            </div>


        </>
    );
};

export default CardComponentEmpty;