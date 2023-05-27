import React, {useEffect, useState} from 'react';
import axios from "axios";
import classes from "./style.module.scss";
import CardComponent from "../../shared/ui/CardComponent";

const Users = () => {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        axios
            .get('http://94.139.255.120/api/users')
            .then(data => {
                setUsers(data.data);
                console.log(data.data);
            })
    }, []);


    return (
        <>
            <div className={`${classes['main-wrapper']} container`}>
                <h1 className={classes['title']}>Все пользователи</h1>
                <div className={classes['content']}>
                    <div className={classes['first-row']}>
                        <p className={classes['subtitle-name']}>Имя</p>
                        <p className={classes['subtitle-sc']}>Очки</p>
                        <p className={classes['subtitle-em']}>Email</p>
                        <p className={classes['subtitle-role']}>Роль</p>
                    </div>
                    {users && users.map(user => {
                        return (
                            <CardComponent id={user.id}
                                           key={user.id}
                                           name={user.name}
                                           email={user.email}
                                           score={user.score}
                                           roles={user.roles}/>
                        )
                    })}
                </div>
            </div>
        </>
    );
};

export default Users;