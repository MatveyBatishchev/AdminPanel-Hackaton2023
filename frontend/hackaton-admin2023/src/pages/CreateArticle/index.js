import React, {useEffect, useRef, useState} from 'react';
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import classes from './style.module.scss';
import axios from "axios";
import {FormControl, InputLabel, MenuItem, Select} from "@mui/material";

const CreateArticle = () => {

    const [message, setMessage] = useState('');
    const [type, setType] = useState(null);
    const ejInstance = useRef();

    const handleChange = event => {

        setMessage(event.target.value);
        console.log('value is:', event.target.value);
    };

    const handleChangeType = event => {
        setType(event.target.value);
        console.log('type is:', event.target.value);
    }

    // const initEditor = () => {
    //     const editor = new EditorJS({
    //         holder: 'editorjs',
    //         onReady: () => {
    //             ejInstance.current = editor;
    //         },
    //         autofocus: true,
    //         onChange: async () => {
    //             let content = await editor.saver.save();
    //             console.log(content);
    //         },
    //         tools: {
    //             header: Header,
    //         },
    //
    //     });
    // };

    const editor = new EditorJS({
        holder: 'editorjs',
        onReady: () => {
            ejInstance.current = editor;
        },
        autofocus: true,
        onChange: async () => {
            let content = await editor.saver.save();

            console.log(content);
        },
        tools: {
            header: Header,
        },
    });

    useEffect(() => {
        const saveBtn = document.querySelector('.save-btn');

        if (saveBtn) {
            saveBtn.addEventListener('click', saveInformation, false);
        }
    }, []);

    // useEffect(() => {
    //     if (ejInstance.current === null) {
    //         initEditor();
    //     }
    //
    //     return () => {
    //         ejInstance?.current?.destroy();
    //         ejInstance.current = null;
    //     };
    // }, []);

    function saveInformation() {
        axios
            .post('http://localhost:8080/articles', {
                message
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <div className={`${classes['create-wrapper']} container`}>
                <h1 className={classes['title']}>Добавление новой статьи</h1>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Тип статьи:</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={type}
                        label="type"
                        onChange={handleChange}
                    >
                        <MenuItem value={0}>Изобразительное искусство</MenuItem>
                        <MenuItem value={1}>Музыка</MenuItem>
                        <MenuItem value={2}>Цирк</MenuItem>
                    </Select>
                </FormControl>
                <h2 className={classes['subtitle']}>Название статьи:</h2>
                <form>
                    <input className={classes['input']} type="text" name="name" placeholder="Название статьи"
                           onInput={handleChangeType} value={message}/>
                    <div id="editorjs" className={classes['editor-container']}>
                    </div>
                    <button className={classes['save-btn']} type="button" onClick={saveInformation}>Сохранить статью
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreateArticle;