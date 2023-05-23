import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import classes from './style.module.scss';
import axios from "axios";
import ImageTool from '@editorjs/image'

const CreateArticle = () => {

    const [message, setMessage] = useState('');
    const [type, setType] = useState(null);
    const ejInstance = useRef();
    const [allTypes, setAllTypes] = useState(null);
    const [content, setContent] = useState(null);

    const change = useRef();

    let navigate = useNavigate();

    const handleChange = event => {
        setMessage(event.target.value);
        console.log('value is:', event.target.value);
    };

    const handleChangeType = event => {
        setType(event.target.value);
        console.log('type is:', event.target.value);
    }

    useEffect(() => {
        axios
            .get('http://localhost:8080/api/article_types')
            .then(data => {
                setAllTypes(data.data);
                console.log(data.data);
            })
    }, []);

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
                            byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
                            byUrl: 'http://localhost:8008/fetchUrl', // Your endpoint that provides uploading by Url
                        }
                    }
                }
            },
        });
    }, []);


    function saveInformation() {
        axios
            .post('http://localhost:8080/api/articles', {
                name: message,
                description: null,
                image: "",
                published: true,
                content: JSON.stringify(content),
                articleType: {
                    id: type,
                    name: ""
                },

            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
        navigate("/articles")
        window.location.reload();
    }

    return (
        <>
            <div className={`${classes['create-wrapper']} container`}>
                <h1 className={classes['title']}>Добавление новой статьи</h1>
                <select ref={change} id="select" onChange={handleChangeType}>
                    {allTypes && allTypes.map(type => {
                        return (
                            <option id={type.id} key={type.id} value={type.id}>{type.name}</option>
                        )
                    })}
                </select>
                <h2 className={classes['subtitle']}>Название статьи:</h2>
                <form>
                    <input className={classes['input']} type="text" name="name" placeholder="Название статьи"
                           onInput={handleChange} value={message}/>
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