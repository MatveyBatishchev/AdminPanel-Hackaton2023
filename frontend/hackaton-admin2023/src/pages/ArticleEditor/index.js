import React, {useEffect, useRef, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import classes from "./style.module.scss";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import ImageTool from "@editorjs/image";

const ArticleEditor = () => {

        const [info, setInfo] = useState(null)
        const {id} = useParams();

        const [message, setMessage] = useState('');
        const [type, setType] = useState(null);
        const [typeName, setTypeName] = useState('');
        const ejInstance = useRef();
        const [allTypes, setAllTypes] = useState(null);
        const [content, setContent] = useState(null);
        const [image, setImage] = useState(null);

        const change = useRef();

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
                .get('http://94.139.255.120/api/article_types')
                .then(data => {
                    setAllTypes(data.data);
                    console.log(data.data);
                })
        }, []);

        useEffect(() => {
            axios
                .get(`http://94.139.255.120/api/articles/${id}`)
                .then(data => {
                    setInfo(data.data);
                    setImage(data.data.image);
                    setType(data.data.articleType.id);
                    setTypeName(JSON.stringify(data.data.articleType.name))
                })
        }, []);

        useEffect(() => {

            const saveBtn = document.querySelector('.save-btn');

            if (saveBtn) {
                saveBtn.addEventListener('click', saveInformation, false);
            }

            if (info) {
                console.log(info)
                setMessage(info.name)
                let dataInfo = JSON.parse(info.content)
                let blocks = dataInfo.blocks
                console.log(blocks)
                const editor = new EditorJS({
                    holderID: 'editorjs',
                    onChange: async () => {
                        let content = await editor.saver.save();
                        setContent(content);
                    },
                    tools: {
                        header: Header,
                        paragraph: Paragraph,
                    },
                    data: blocks
                });

                editor.isReady.then(() => {
                    console.log('ok');
                    console.log(blocks);
                    editor.render({
                        blocks
                    });
                }).catch((err) => {
                    console.log(err);
                });
            }
        }, [info])

        function saveInformation() {
            axios
                .put(`http://94.139.255.120/api/articles/${id}`, {
                    name: message,
                    description: null,
                    image: image,
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
            console.log({
                name: message,
                description: null,
                image: image,
                published: true,
                content: JSON.stringify(content),
                articleType: {
                    id: type,
                    name: ""
                },
            })
        }

        return (
            <>
                {info ? (
                        <>
                            <div className={`${classes['article-editor-wrapper']} container`}>
                                <h1 className={classes['title']}>Редакторивание статьи</h1>
                                <select ref={change} id="select" onChange={handleChangeType}>
                                    {typeName && allTypes && allTypes.map(type => {
                                        return (
                                            <option id={type.id} key={type.id} value={type.id}
                                                    defaultValue={typeName}>{type.name}</option>
                                        )
                                    })}
                                </select>
                                <h2 className={classes['subtitle']}>Название статьи:</h2>
                                <form>
                                    <input className={classes['input']} type="text" name="name" placeholder="Название статьи"
                                           onInput={handleChange} value={message}/>
                                    <div id="editorjs" className={classes['editor-container']}>
                                    </div>
                                    <button className={classes['save-btn']} type="button" onClick={saveInformation}>Сохранить
                                        статью
                                    </button>
                                </form>
                            </div>
                        </>
                    ) :
                    (
                        <h1 className={`${classes['loading']} container`}>Привет! Page is Loading</h1>
                    )
                }
            </>
        );
    }
;

export default ArticleEditor;