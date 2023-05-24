import React from 'react';

const QuestionType = (props) => {
    return (
        <div>
            {
                (Number(props.id) === 1 ? (
                        <div>
                            <p>Прикрепите аудио-материал:</p>
                            <input type="file"/>
                        </div>
                    ) :
                    (Number(props.id) === 2 ? (
                            <div>
                                <p>Прикрепите видео-материал:</p>
                                <input type="file"/>
                            </div>
                        ) :
                        (
                            <div>
                                <p>Прикрепите фото-материал:</p>
                                <input type="file"/>
                            </div>
                        )))}
        </div>
        // }
        // {
        //
        //     }))
        // }
        // {
        //     ( && Array.from(Array(Number(props.id))).map((x, index) => {
        //         return (
        //
        //         )
        //     }))
        // }
    );
};

export default QuestionType;