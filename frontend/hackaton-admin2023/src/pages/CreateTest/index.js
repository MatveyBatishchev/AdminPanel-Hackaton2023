import React, {useEffect, useRef, useState} from 'react';
import classes from './style.module.scss';
import QuestionComponent from "../../shared/ui/QuestionComponent";

const CreateTest = () => {

    const [components, setComponents] = useState([]);
    const [inputs, setInputs] = React.useState([])
    const [amount, setAmount] = React.useState("")
    const [renderInputs, setRenderInputs] = React.useState(false);

    const change = useRef();

    const questionType = [{
        id: 0,
        value: "Текст"
    },
        {
            id: 1,
            value: "Аудио"
        },
        {
            id: 2,
            value: "Видео"
        },
        {
            id: 3,
            value: "Изображение"
        }]

    const answerType = [{
        id: 0,
        value: "Текст"
    },
        {
            id: 1,
            value: "Аудио"
        },
        {
            id: 2,
            value: "Видео"
        },
        {
            id: 3,
            value: "Изображение"
        }]

    useEffect(() => {
        console.log(amount)
    }, [amount])


    // const setInput = event => {
    //     setComponents(event.target.value);
    //     console.log('value is:', event.target.value);
    //
    // }
    //
    // function addQuestion() {
    //     setComponents([...components, []])
    // }

    return (
        <>
            <div className={classes['test-wrapper']}>
                <p>Название теста</p>
                <input/>
                <p>Описание теста</p>
                <input/>
                <p>Количество очков за тест:</p>
                <input/>
                <p>Количество вопросов:</p>
                {/*<input ref={change} onInput={setInput} id="count"/>*/}
                <input onChange={(event) => setAmount(event.target.value)}/>

                {renderInputs && Array.from(Array(Number(amount))).map((x, index) => <QuestionComponent key={index}/>)}
                <button onClick={() => {
                    setRenderInputs(true)
                }}>Добавить вопросы
                </button>

            </div>
        </>
    );
};

export default CreateTest;