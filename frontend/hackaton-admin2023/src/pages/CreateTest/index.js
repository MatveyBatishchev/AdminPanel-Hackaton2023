import React, {useEffect, useRef, useState} from 'react';
import classes from './style.module.scss';
import QuestionComponent from "../../shared/ui/QuestionComponent";

const CreateTest = () => {

    // const [components, setComponents] = useState([]);
    const [inputs, setInputs] = React.useState([])
    const [amount, setAmount] = React.useState("")
    const [renderInputs, setRenderInputs] = React.useState(false);



    function saveAnswers() {
        console.log('Ответы сохранены!')
    }

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
                <input onChange={(event) => setAmount(event.target.value)}/>
                <button id='quest' className={classes['btn']} onClick={() => {
                    setRenderInputs(true);
                    document.getElementById("quest").disabled = true;
                }}>Добавить вопросы
                </button>
                <form onSubmit={(event) => {event.preventDefault()}}>
                    {renderInputs &&
                        Array.from(Array(Number(amount))).map((x, index) => <QuestionComponent
                            key={index}
                            id={index}/>)}
                    <button id='save-btn' className={classes['btn']} type="submit" onClick={()=>{saveAnswers()}}>Сохранить ответы</button>
                </form>
            </div>
        </>
    );
};

export default CreateTest;