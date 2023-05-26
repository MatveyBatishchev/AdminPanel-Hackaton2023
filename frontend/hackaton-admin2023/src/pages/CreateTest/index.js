import React, {useEffect, useRef, useState} from 'react';
import classes from './style.module.scss';
import QuestionComponent from "../../shared/ui/QuestionComponent";
import axios from "axios";

//TODO: сделать для сложности вывод на русском

const CreateTest = () => {


        // const [components, setComponents] = useState([]);
        const [inputs, setInputs] = useState([])
        const [amount, setAmount] = useState("")
        const [renderInputs, setRenderInputs] = useState(false);

        const [difficultyParams, setDifficulty] = useState("LITE");

        const [isAction, setAction] = useState(false);

        const [artType, setArtType] = useState([0]);
        const [allTypes, setAllTypes] = useState(null);

        useEffect(() => {
            if (renderInputs) {
                console.log(renderInputs)
            }
        }, [renderInputs])


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

        function saveAnswers(event) {
            event.preventDefault();
            let allData = new FormData(event.target);
            for (let allDatum of allData) {
                
            }
            console.log(allData.get('answer_audio_1_1'));
        }

        function settingDifficulty(event) {
            setDifficulty(event.target.value);
            console.log('value is:', event.target.value);
        }

        const handleChangeArt = event => {
            let id = event.target.value;
            let idInt = Number(id);
            setArtType([idInt]);

        }

        useEffect(() => {
            axios
                .get('http://localhost:8080/api/article_types')
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
                    <input placeholder="Название"/>
                    <p className={classes['text']}>Описание теста</p>
                    <input placeholder="Короткое описание"/>
                    <p className={classes['text']}>Количество очков за тест:</p>
                    <input placeholder="Максимальное количество очков за тест"/>
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
    }
;

export default CreateTest;

