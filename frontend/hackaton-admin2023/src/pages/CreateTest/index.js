import React, {useEffect, useRef, useState} from 'react';
import classes from './style.module.scss';
import QuestionComponent from "../../shared/ui/QuestionComponent";

const CreateTest = () => {

    // const [components, setComponents] = useState([]);
    const [inputs, setInputs] = useState([])
    const [amount, setAmount] = useState("")
    const [renderInputs, setRenderInputs] = useState(false);

    const [isAction, setAction] = useState(false);


    function saveAnswers() {
        console.log('Ответы сохранены!')
    }

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
                <button id='quest' className={classes['btn']} onClick={() => {
                    setRenderInputs(true);
                    document.getElementById("quest").disabled = true;
                    setAction(true);
                }}>Добавить вопросы
                </button>
                <form onSubmit={(event) => {event.preventDefault()}}>
                    {renderInputs &&
                        Array.from(Array(Number(amount))).map((x, index) => <QuestionComponent
                            key={index}
                            id={index}/>)}
                    <button id='save-btn' className={isAction ? classes['action-button'] : classes['button']} type="submit" onClick={()=>{saveAnswers()}}>Сохранить ответы</button>
                </form>
            </div>
        </>
    );
};

export default CreateTest;