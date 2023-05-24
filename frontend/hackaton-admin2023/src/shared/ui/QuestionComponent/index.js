import React, {useRef, useState} from 'react';
import classes from './style.module.scss';
import QuestionType from "../../../widgets/QuestionType";

const QuestionComponent = (props) => {

    let number = props.id;

    const [qType, setQuestionType] = useState('');

    const [aType, setAnswerType] = useState('');

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

    function questionTypeSelect(event) {
        setQuestionType(event.target.value);
        console.log('value is:', event.target.value);
    }

    return (
        <>
            <div className={classes['question-wrapper']}>
                <div className={classes['first-row']}>
                    <p className={classes['question-number']}>{++number}</p>
                    <input className={classes['text-input']} id='question' placeholder='Текст вопроса'/>
                </div>
                <p className={classes['choose-question']}>Выберите тип вопроса:</p>
                <select ref={change} id="select-question" onChange={questionTypeSelect}>
                    {
                        questionType.map(type => {
                            return (
                                <option key={type.id} id={type.id} value={type.id}>{type.value}</option>
                            )
                        })
                    }
                </select>
                {/*{*/}
                {/*    (qType && Number(qType) === 1 && Array.from(Array(Number(qType))).map((x, index) => {*/}
                {/*        return (*/}
                {/*            <div key={index}>*/}
                {/*                <p className={classes['audio-text']}>Прикрепите аудио-материал:</p>*/}
                {/*                <input className={classes['audio-input']} type="file" />*/}
                {/*            </div>*/}
                {/*        )*/}
                {/*    }))*/}
                {/*}*/}
                {/*{*/}
                {/*    (qType && Number(qType) === 2 && Array.from(Array(Number(qType))).map((x, index) => {*/}
                {/*        return (*/}
                {/*            <div key={index}>*/}
                {/*                <p className={classes['video-text']}>Прикрепите видео-материал:</p>*/}
                {/*                <input className={classes['video-input']} type="file"/>*/}
                {/*            </div>*/}
                {/*        )*/}
                {/*    }))*/}
                {/*}*/}
                {
                        (qType && Array.from(Array(Number(qType))).map((x, index) => {
                        return (
                            <QuestionType key={index} id={index}/>
                        )
                    }))
                }

                <p className={classes['choose-answer']}>Выберите тип ответа:</p>
                <select>
                    {
                        answerType.map(type => {
                            return (
                                <option key={type.id}>{type.value}</option>
                            )
                        })

                    }
                </select>
            </div>
        </>
    );
};

export default QuestionComponent;