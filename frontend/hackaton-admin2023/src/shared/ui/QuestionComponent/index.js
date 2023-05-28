import React, {useEffect, useRef, useState} from 'react';
import classes from './style.module.scss';
import QuestionType from "../../../widgets/QuestionType";
import AnswerType from "../../../widgets/AnswerType";

const QuestionComponent = (props) => {

    let number = props.id;

    const [qType, setQuestionType] = useState('');
    const [aType, setAnswerType] = useState('');

    useEffect(() => {

    }, [])


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
        value: "Текстовый ответ"
    },
        {
            id: 1,
            value: "Аудио-дорожка"
        },
        {
            id: 2,
            value: "Видео-ресурс"
        },
        {
            id: 3,
            value: "Изображение или фотография"
        }]

    function questionTypeSelect(event) {
        setQuestionType(event.target.value);
    }

    function answerTypeSelect(event) {
        setAnswerType(event.target.value);
    }

    return (
        <>
            <div className={classes['question-wrapper']}>
                <div className={classes['first-row']}>
                    <p className={classes['question-number']}>{++number}</p>
                    <input className={classes['text-input']} name={`text_quest_${number}`} id='question'
                           placeholder='Текст вопроса'/>
                </div>
                <p className={classes['choose-question']}>Выберите тип вопроса:</p>
                <select id="select-question" onChange={questionTypeSelect}>
                    {
                        questionType.map(type => {
                            return (
                                <option key={type.id} id={type.id} value={type.value}>{type.value}</option>
                            )
                        })
                    }
                </select>
                {
                    (qType ? (
                            <QuestionType key={qType} index={number} value={qType}/>
                        ) :
                        (
                            <div></div>
                        ))
                }

                <p className={classes['choose-answer']}>Выберите тип ответа:</p>
                <select id="select-ans" onChange={answerTypeSelect}>
                    {
                        answerType.map(type => {
                            return (
                                <option key={type.id} id={type.id} value={type.value}>{type.value}</option>

                            )
                        })

                    }
                </select>
                {
                    (aType ? (
                            <AnswerType key={aType} index={number} value={aType}/>

                        ) :
                        (
                            <div></div>
                        ))
                }
                <input className={classes['text-input']} name={`text_exp_${number}`} placeholder='Объяснение к вопросу'/>
            </div>
        </>
    );
};

export default QuestionComponent;