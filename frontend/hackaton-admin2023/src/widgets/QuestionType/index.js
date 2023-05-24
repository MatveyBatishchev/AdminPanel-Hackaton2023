import React from 'react';

const QuestionType = (props) => {

    const componentValue = props.value;
    console.log(componentValue);

    return (
        <div>
            {componentValue === 'Аудио' && <div>
                <p>Прикрепите аудио-материал:</p>
                <input type="file"/>
            </div>}
            {componentValue === 'Видео' &&
                <div>
                    <p>Прикрепите видео-материал:</p>
                    <input type="file"/>
                </div>}
            {componentValue === 'Изображение' &&
                <div>
                    <p>Прикрепите фото-материал:</p>
                    <input type="file"/>
                </div>}
        </div>
    );
};

export default QuestionType;