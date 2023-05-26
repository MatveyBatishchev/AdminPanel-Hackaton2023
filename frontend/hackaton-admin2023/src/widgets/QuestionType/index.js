import React from 'react';

const QuestionType = (props) => {

    const componentValue = props.value;
    console.log(componentValue);


    return (
        <div>
            {componentValue === 'Аудио' && <div>
                <p>Прикрепите аудио-материал:</p>
                <input type="file" name={`audio-quest_${props.index}`} />
            </div>}
            {componentValue === 'Видео' &&
                <div>
                    <p>Прикрепите видео-материал:</p>
                    <input type="file" name={`video-quest_${props.index}`} />
                </div>}
            {componentValue === 'Изображение' &&
                <div>
                    <p>Прикрепите фото-материал:</p>
                    <input type="file" name={`image-quest_${props.index}`} />
                </div>}
        </div>
    );
};

export default QuestionType;