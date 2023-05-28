import React, {useEffect, useRef, useState} from 'react';
import classes from "../CreateArticle/style.module.scss";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import ImageTool from "@editorjs/image";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import queryString from "query-string";

const AddSchool = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [program, setProgram] = useState([0]);
    const ejInstance = useRef();
    const [allPrograms, setAllPrograms] = useState(0);
    const [content, setContent] = useState(null);
    const [arts, setArts] = useState(0);
    const [chosenArt, chooseArt] = useState([0]);
    const [allDistricts, setAllDistricts] = useState(0);
    const [districtId, setDistrict] = useState(0);

    let navigate = useNavigate();

    const handleChange = event => {
        setName(event.target.value);
    };

    const handleChangeEmail = event => {
        setEmail(event.target.value);
    };

    const handleChangePhone = event => {
        setPhone(event.target.value);
    };

    const handleChangeAddress = event => {
        setAddress(event.target.value);
    };

    const handleChangeArt = event => {
        let id = event.target.value;
        let idInt = Number(id);
        chooseArt([idInt]);

    }

    const handleChangeProgram = event => {
        let id = event.target.value;
        let idInt = Number(id);
        setProgram([idInt]);
    }

    const handleChangeDist = event => {
        let id = event.target.value;
        setDistrict(id);
        console.log(id)
    }

    useEffect(() => {
        axios
            .get('http://94.139.255.120/api/arts')
            .then(data => {
                setArts(data.data);
                chooseArt(data.data[0].id);
            })
    }, [])

    useEffect(() => {
        axios
            .get('http://94.139.255.120/api/study-programs')
            .then(data => {
                setAllPrograms(data.data);
                setProgram(data.data[0].id);
            })
    }, [])

    useEffect(() => {
        axios
            .get('http://94.139.255.120/api/districts')
            .then(data => {
                setAllDistricts(data.data);
                setDistrict(data.data[0].id);
            })
    }, [])

    useEffect(() => {
        const saveBtn = document.querySelector('.save-btn');

        if (saveBtn) {
            saveBtn.addEventListener('click', saveInformation, false);
        }

        const editor = new EditorJS({
            holder: 'editorjs',
            onReady: () => {
                ejInstance.current = editor;
            },
            autofocus: true,
            onChange: async () => {
                let content = await editor.saver.save();
                setContent(content);
            },
            tools: {
                header: Header,
                paragraph: Paragraph,
                image: {
                    class: ImageTool,
                    config: {
                        endpoints: {
                            byFile: 'http://94.139.255.120/api/files',
                        },
                        uploader: {
                            uploadByFile(file) {
                                var formData = new FormData();
                                formData.append('file_entity_marker', 'SCHOOL');
                                formData.append("file", file);
                                return axios.post('http://94.139.255.120/api/files', formData).then(response => response.data)
                            },
                        }
                    }
                },
            },
        });
    }, []);

    function saveInformation() {
        axios
            .post('http://94.139.255.120/api/schools', {
                name: name,
                email: email,
                address: address,
                phoneNumber: phone,
                content: JSON.stringify(content),
                district: {
                    id: districtId,
                    name: ""
                },

            })
            .then(function (response) {
                console.log(response)
                let idSchool = response.data.id;
                console.log(chosenArt);
                console.log(typeof chosenArt);
                axios({
                    method: "put",
                    url: `http://94.139.255.120/api/schools/${idSchool}/arts`,
                    params: {
                        art_ids: chosenArt,
                    },
                    paramsSerializer: params => {
                        return queryString.stringify(params)
                    }
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                axios({
                    method: "put",
                    url: `http://94.139.255.120/api/schools/${idSchool}/study-programs`,
                    params: {
                        study_program_ids: program,
                    },
                    paramsSerializer: params => {
                        return queryString.stringify(params)
                    }
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            })
            .catch(function (error) {
                console.log(error);
            });
        navigate("/schools")
        window.location.reload();
    }

    return (
        <>
            <div className={`${classes['add-wrapper']} container`}>
                <p className={classes['subtitle']}>Основная информация о школе:</p>
                <form>
                    <input className={classes['input']} type="text" name="name" placeholder="Название школы"
                           onInput={handleChange} value={name}/>
                    <input className={classes['input']} type="text" name="email" placeholder="Адрес email"
                           onInput={handleChangeEmail} value={email}/>
                    <input className={classes['input']} type="text" name="address" placeholder="Физический адрес"
                           onInput={handleChangeAddress} value={address}/>
                    <input className={classes['input']} type="text" name="phone" placeholder="Телефонный номер"
                           onInput={handleChangePhone} value={phone}/>
                    <p className={classes['subtitle']}>Выберите направление обучения:</p>
                    <select onChange={handleChangeArt}>
                        {arts && arts.map(art => {
                            return (
                                <option value={art.id} key={art.id}>{art.name}</option>
                            )
                        })
                        }
                    </select>
                    <p className={classes['subtitle']}>Выберите программы обучения:</p>
                    <select onChange={handleChangeProgram}>
                        {allPrograms && allPrograms.map(program => {
                            return (
                                <option value={program.id} key={program.id}>{program.name}</option>
                            )
                        })
                        }
                    </select>
                    <p className={classes['subtitle']}>Выберите округ, в котором находится школа:</p>
                    <select onChange={handleChangeDist}>
                        {allDistricts && allDistricts.map(district => {
                            return (
                                <option value={district.id} key={district.id}>{district.name}</option>
                            )
                        })
                        }
                    </select>
                    <p className={classes['subtitle']}>Дополнительная информация о школе (обязательно к заполнению):</p>
                    <div id="editorjs" className={classes['editor-container']}>
                    </div>
                    <button className={classes['save-btn']} type="button" onClick={saveInformation}>Добавить школу
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddSchool;