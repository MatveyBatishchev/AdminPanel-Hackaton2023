import React, {useEffect, useRef, useState} from 'react';
import classes from './style.module.scss';
import QuestionComponent from "../../shared/ui/QuestionComponent";
import axios from "axios";
import {useNavigate} from "react-router-dom";


//TODO: сделать для сложности вывод на русском

const CreateTest = () => {


        // const [components, setComponents] = useState([]);

        const [inputs, setInputs] = useState([])
        const [amount, setAmount] = useState("")
        const [renderInputs, setRenderInputs] = useState(false);


        const [questionName, setQuestionName] = useState(null);
        const [questionDesc, setQuestionDesc] = useState(null);
        const [questionScore, setQuestionScore] = useState(0);


        const [difficultyParams, setDifficulty] = useState("LITE");

        const [isAction, setAction] = useState(false);

        const [artType, setArtType] = useState([0]);
        const [allTypes, setAllTypes] = useState(null);


        const [questions, setQuestions] = useState([{}]);

        let navigate = useNavigate();

        function handleChangeScore(event) {
            let score = event.target.value;
            setQuestionScore(Number(score));
        }

        function handleChangeName(event) {
            let name = event.target.value;
            setQuestionName(name);
        }

        function handleChangeDesc(event) {
            let desc = event.target.value;
            setQuestionDesc(desc);
        }


        const difficulty = [{
            id: 0,
            value: "LITE",
            valueRu: "Низкая сложность"
        },
            {
                id: 1,
                value: "INTERMEDIATE",
                valueRu: "Средняя сложность"
            },
            {
                id: 2,
                value: "HARD",
                valueRu: "Высокая сложность"
            }]

        async function saveAnswers(event) {
            event.preventDefault();

            let isReady = false;
            // let imageReady = false;
            // let allData = new FormData(event.target);

            //let allData = new FormData(event.target);

            // for (let allDatum of allData) {
            //     let result_aud = allDatum[0].indexOf('audio');
            //     let result_vid = allDatum[0].indexOf('video');
            //     let result_img = allDatum[0].indexOf('image');
            //     if (result_aud !== -1 || result_vid !== -1 || result_img !== -1) {
            //         let source = new FormData()
            //         source.append("file", allDatum[1]);
            //         source.append('file_entity_marker', 'TEST')
            //         const response = await axios.post('http://94.139.255.120/api/files', source)
            //         let url = response.data.file.url;
            //         if (url) {
            //             allDatum.push(url);
            //         }
            //     } else {
            //         console.log('Нет видео или аудио')
            //     }
            //_____________ПРОВЕРКА___________________________________________________
            //     console.log(allDatum)
            //     for (let searchDatum of allData) {
            //         console.log('enter')
            //         let result_aud = searchDatum[0].indexOf('audio');
            //         let result_vid = searchDatum[0].indexOf('video');
            //         let result_img = searchDatum[0].indexOf('image');
            //         console.log(result_img, result_aud, result_vid)
            //         if (result_aud !== -1 || result_vid !== -1 || result_img !== -1) {
            //             if (searchDatum[2] !== undefined)
            //             {
            //                 console.log('true')
            //             }
            //         }
            //     }
            // }
            //_______________КОНЕЦ ПРОВЕРКИ_______________________________________________
            // imageReady = true;
            // if (imageReady) {
            //____________________РАБОЧИЙ КОД: СОЗДАНИЕ ОБЪЕКТА_____________________________
            //     const object = {questions: []}
            //     for (let allDatum of allData) {
            //         let result_quest = allDatum[0].split('_');
            //         if (result_quest[0] === 'text' && result_quest[1] === 'quest') {
            //             const questId = result_quest[2];
            //             const question = {answers: []};
            //             question.text = allDatum[1];
            //             for (let fileDatum of allData) {
            //                 let result_quest_f = fileDatum[0].split('_');
            //                 if (result_quest_f[0] !== 'text' && result_quest_f[1] === 'quest' && result_quest_f[2] === questId) {
            //                     if (result_quest_f[0] === 'audio') {
            //                         question.audio = fileDatum[2];
            //                     } else {
            //                         question.audio = null;
            //                     }
            //                     if (result_quest_f[0] === 'video') {
            //                         question.video = fileDatum[2];
            //                     } else {
            //                         question.video = null;
            //                     }
            //                     if (result_quest_f[0] === 'image') {
            //                         question.image = fileDatum[2];
            //                     } else {
            //                         question.image = null;
            //                     }
            //                 }
            //             }
            //             for (let expDatum of allData) {
            //                 let result_exp = expDatum[0].split('_');
            //                 if (result_exp[1] === 'exp' && result_exp[2] === questId) {
            //                     question.explanation = expDatum[1];
            //                 }
            //             }
            //             for (let ansDatum of allData) {
            //                 let result_answer = ansDatum[0].split('_');
            //                 const answer = {}
            //                 if (result_answer[2] === questId && result_answer[1] === 'answer') {
            //                     answer.isCorrect = result_answer[3] === '1';
            //                     if (result_answer[0] === 'text') {
            //                         answer.text = ansDatum[1];
            //                     } else {
            //                         answer.text = null;
            //                     }
            //                     if (result_answer[0] === 'audio') {
            //                         answer.audio = ansDatum[2];
            //                     } else {
            //                         answer.audio = null;
            //                     }
            //                     if (result_answer[0] === 'video') {
            //                         answer.video = ansDatum[2];
            //                     } else {
            //                         answer.video = null;
            //                     }
            //                     if (result_answer[0] === 'image') {
            //                         answer.image = ansDatum[2];
            //                     } else {
            //                         answer.image = null;
            //                     }
            //                 }
            //                 if (Object.keys(answer).length !== 0) {
            //                     question.answers.push(answer);
            //                 }
            //
            //             }
            //             if (Object.keys(question).length !== 0) {
            //                 object.questions.push(question);
            //             }
            //         }
            //     }
            //     object.title = questionName;
            //     object.description = questionDesc;
            //     object.image = "string";
            //     object.scorePerQuestion = questionScore;
            //     object.difficulty = difficultyParams;
            //     object.art = {id: artType};
            //     if (object.title !== null && object.description !== null && object.scorePerQuestion !== 0 && object.difficulty !== "") {
            //         isReady = true;
            //     }
            //     if (isReady) {
            //         console.log(object);
            //         const response = await axios.post(`http://94.139.255.120/api/tests`, {object})
            //         console.log(response);
            // }
            //_______________КОНЕЦ СОЗДАНИЯ ОБЪЕКТА__________________________-
        }

        //_____________СТАРЫЕ ЗАПРОСЫ AXIOS__________________
        // axios
        //     .post(`http://94.139.255.120/api/tests`, {
        //         object
        //     })
        //     .then((response) => {
        //         console.log(response);
        //     }).catch((err) => {
        //     console.log(err);
        // });
        // }

        // navigate("/test")
        // window.location.reload();
        // axios.post('http://94.139.255.120/api/files', source
        // )
        //     .then(function (response) {
        //         console.log(response);
        //         let url = response.data.file.url;
        //         if (url) {
        //             allDatum.push(url);
        //         }
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     });

        //__________________КОНЕЦ_____________________

            //     if (result_aud !==-1 || result_vid !== -1 || result_img !== -1) {
            //         console.log(allDatum)
            //         let source = new FormData()
            //         source.append("file", allDatum[1]);
            //         source.append('file_entity_marker', 'TEST')
            //         axios.post('http://94.139.255.120/api/files', source
            //         )
            //             .then(function (response) {
            //                 console.log(response);
            //                 let url = response.data.file.url;
            //                 if (url) {
            //                     allDatum.push(url);
            //                     console.log(url);
            //                     console.log(allDatum);
            //                 }
            //             })
            //             .catch(function (error) {
            //                 console.log(error);
            //             });
            //     }
            //     else {
            //         console.log('Нет видео или аудио')
            //     }
            // }
            //__________________КОНЕЦ РАБОЧЕГО КУСКА_____________________



        function settingDifficulty(event) {
            setDifficulty(event.target.value);
        }

        const handleChangeArt = event => {
            let id = event.target.value;
            let idInt = Number(id);
            setArtType([idInt]);

        }

        useEffect(() => {
            axios
                .get('http://94.139.255.120/api/article_types')
                .then(data => {
                    setAllTypes(data.data);
                    setArtType(data.data[0].id);
                })
        }, []);

        return (
            <>
                <div className={classes['test-wrapper']}>
                    <div className={classes['column']}></div>
                    <p className={classes['text']}>Название теста</p>
                    <input placeholder="Название" onInput={handleChangeName}/>
                    <p className={classes['text']}>Описание теста</p>
                    <input placeholder="Короткое описание" onInput={handleChangeDesc}/>
                    <p className={classes['text']}>Количество очков за тест:</p>
                    <input placeholder="Максимальное количество очков за тест" onInput={handleChangeScore}/>
                    <p className={classes['text']}>Количество вопросов:</p>
                    <input onChange={(event) => setAmount(event.target.value)}
                           placeholder="Количество вопросов в тесте (цифрой или числом)"/>
                    <div></div>
                    <select id="select-difficulty" className={classes['select-difficulty']} onChange={settingDifficulty}>
                        {
                            difficulty.map(type => {
                                return (
                                    <option key={type.id} id={type.id} value={type.value}>{type.valueRu}</option>
                                )
                            })
                        }
                    </select>
                    <div></div>
                    <select onChange={handleChangeArt}>
                        {allTypes && allTypes.map(type => {
                            return (
                                <option value={type.id} key={type.id}>{type.name}</option>
                            )
                        })
                        }
                    </select>
                    <div></div>
                    <button id='quest' className={classes['btn']} onClick={() => {
                        setRenderInputs(true);
                        document.getElementById("quest").disabled = true;
                        setAction(true);
                    }}>Добавить вопросы
                    </button>
                    <form encType="multipart/form-data" method="post" onSubmit={saveAnswers}>
                        {renderInputs &&
                            Array.from(Array(Number(amount))).map((x, index) => <QuestionComponent
                                key={index}
                                id={index}/>)}
                        <button id='save-btn'
                                className={isAction ? classes['action-button'] : classes['button']}
                                type="submit">Сохранить ответы
                        </button>
                    </form>
                </div>
            </>
        );
    };

export default CreateTest;

