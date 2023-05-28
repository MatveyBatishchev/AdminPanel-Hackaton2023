import React, {useEffect, useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import classes from './style.module.scss';
import axios from "axios";
import ImageTool from '@editorjs/image'
import queryString from 'query-string';



const CreateArticle = () => {

    const [message, setMessage] = useState('');
    const [type, setType] = useState(null);
    const ejInstance = useRef();
    const [allTypes, setAllTypes] = useState(null);
    const [content, setContent] = useState(null);
    const [arts, setArts] = useState(0);
    const [chosenArt, chooseArt] = useState([0]);
    const [image, setImage] = useState('');
    const [urlImage, setUrlImage] = useState(null);
    const [articleDescription, setDescription] = useState('');

    const change = useRef();

    let navigate = useNavigate();


    const handleChange = event => {
        setMessage(event.target.value);
    };

    const handleChangeDescription = event => {
        setDescription(event.target.value);
    }

    const handleChangeArt = event => {
        let id = event.target.value;
        let idInt = Number(id);
        chooseArt([idInt]);

    }

    const handleChangeType = event => {
        setType(event.target.value);
    }

    useEffect(() => {
        axios
            .get('http://94.139.255.120/api/article_types')
            .then(data => {
                setAllTypes(data.data);
                setType(data.data[0].id);
            })
    }, []);

    useEffect(() => {
        axios
            .get('http://94.139.255.120/api/arts')
            .then(data => {
                setArts(data.data);
                chooseArt(data.data[0].id);
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
                                formData.append('file_entity_marker', 'ARTICLE');
                                formData.append("file", file);
                                return axios.post('http://94.139.255.120/api/files', formData).then(response => response.data)
                            },
                        }
                    }
                },
            },
        });
    }, []);

    function saveArticleImage() {
        var imagefile = document.querySelector('#image-chooser');
        var formData = new FormData();
        formData.append('file_entity_marker', 'ARTICLE');
        formData.append("file", imagefile.files[0]);

        axios.post('http://94.139.255.120/api/files', formData
        )
            .then(function (response) {
                console.log(response);
                let url = response.data.file.url;
                if (url) {
                    setUrlImage(url);
                    console.log(url)
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    function saveInformation() {

        const checkboxes = document.getElementsByClassName('checkbox');
        const checkboxesChecked = [];
        for (let index = 0; index < checkboxes.length; index++) {
            if (checkboxes[index].checked) {
                let idNumber = Number(checkboxes[index].value);
                checkboxesChecked.push(idNumber);
            }
        }

        axios
            .post('http://94.139.255.120/api/articles', {
                name: message,
                description: articleDescription,
                image: urlImage,
                published: true,
                content: JSON.stringify(content),
                articleType: {
                    id: type,
                    name: ""
                },

            })
            .then(function (response) {
                console.log(response)
                let idArticle = response.data.id;
                console.log(chosenArt);
                console.log(typeof chosenArt);
                axios({
                    method: "put",
                    url: `http://94.139.255.120/api/articles/${idArticle}/arts`,
                    params: {
                        art_ids: checkboxesChecked,
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
        navigate("/articles")
        window.location.reload();
    }

    return (
        <>
            <div className={`${classes['create-wrapper']} container`}>
                <h1 className={classes['title']}>Добавление новой статьи</h1>
                <p className={classes['subtitle']}>Выберите категорию статьи:</p>
                <select ref={change} id="select" onChange={handleChangeType}>
                    {allTypes && allTypes.map(type => {
                        return (
                            <option id={type.id} key={type.id} value={type.id}>{type.name}</option>
                        )
                    })}
                </select>
                <div></div>
                <p className={classes['subtitle']}>Выберите направление статьи:</p>
                <div>
                    {arts && arts.map(art => {
                        return (
                            <div key={art.id} >
                                <input className="checkbox" type="checkbox" value={art.id}id={art.id}
                                       name={art.name}/>
                                <label htmlFor={art.name}>{art.name}</label>
                            </div>
                        )
                    })
                    }
                </div>
                <p className={classes['subtitle']}>Название статьи:</p>
                <form>
                    <input className={classes['input']} type="text" name="name" placeholder="Название статьи"
                           onInput={handleChange} value={message}/>
                    <p className={classes['subtitle']}>Описание статьи:</p>
                    <input className={classes['input']} type="text" name="description" placeholder="Короткое описание статьи"
                           onInput={handleChangeDescription} value={articleDescription}/>
                    <p className={classes['subtitle']}>Содержание статьи:</p>
                    <div id="editorjs" className={classes['editor-container']}>
                    </div>
                    <p className={classes['subtitle']}>Выгрузите фотографию для статьи: </p>
                    <input type="file" name='image-chooser' id="image-chooser" accept="image/*"
                           onInput={saveArticleImage}/>
                    <button className={classes['save-btn']} type="button" onClick={saveInformation}>Сохранить статью
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreateArticle;