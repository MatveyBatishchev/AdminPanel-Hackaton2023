import React, {useEffect, useState} from 'react';
import classes from "./style.module.scss";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import Output from "editorjs-react-renderer";


const School = (props) => {

    const {id} = useParams();

    const [schoolData, setSchoolData] = useState(null);
    const [contentData, setContentData] = useState(null);
    const [artData, setArtData] = useState(null);
    const [programsData, setProgramsData] = useState(null);

    useEffect(() => {
        axios
            .get(`http://94.139.255.120/api/schools/${id}`)
            .then(data => {
                setSchoolData(data.data);
                console.log(data.data);
                setArtData(data.data.arts);
                setProgramsData(data.data.studyPrograms);
            })
    }, []);

    useEffect(() => {
        if (schoolData) {
            let information = JSON.parse(schoolData.content);
            setContentData(information);
            console.log(information)
            console.log(schoolData.name, schoolData.email, schoolData.address, schoolData.district)
        }
    }, [schoolData])

    return (
        <>
            <div className={`${classes['main-wrapper']} container`}>
                {schoolData ? (
                    <>
                        <h1 className={classes['title']}>{schoolData.name}</h1>
                        <div className={classes['school-wrapper']}>
                            <div className={classes['school-info']}>
                                <div className={classes['column-1']}>
                                    <h3 className={classes['subtitle']}>Адрес email школы:</h3>
                                    <h3 className={classes['subtitle']}>Физический адрес
                                        школы:</h3>
                                    <h3 className={classes['subtitle']}>Номер телефона школы:</h3>
                                    <h3 className={classes['subtitle']}>Адрес email школы:</h3>
                                </div>
                                <div className={classes['column-2']}>
                                    <p className={classes['subtitle']}>{schoolData.email}</p>
                                    <p className={classes['subtitle']}>{schoolData.address}, {schoolData.district.name}</p>
                                    <p className={classes['subtitle']}>{schoolData.phoneNumber}</p>
                                    <p className={classes['subtitle']}>{schoolData.email}</p>
                                </div>
                            </div>
                        </div>
                        <h3 className={classes['paragraph']}>Реализуемые направления</h3>
                        <div className={classes['arts-row']}>
                            {artData && artData.map(art => {
                                return (

                                    <p className={classes['subtitle']}>{art.name}</p>

                                )
                            })
                            }
                        </div>
                        <h3 className={classes['paragraph']}>Реализуемые программы</h3>
                        <div className={classes['programs-row']}>
                            {programsData && programsData.map(program => {
                                return (

                                    <p className={classes['subtitle']}>{program.name}</p>

                                )
                            })
                            }
                        </div>
                        <h3 className={classes['paragraph']}>Дополнительная информация о школе</h3>
                        <section>
                            <Output data={contentData}/>
                        </section>
                    </>
                ) : (
                    <h1 className={`${classes['loading']} container`}>Пожалуйста, подождите. Страница загружается.</h1>
                )
                }
                <button style={{padding: '5px', marginTop: '15px', width: '200px'}} className={classes['back-btn']}><Link to={'/schools'}>Вернуться назад</Link></button>
            </div>
        </>
    );
};

export default School;