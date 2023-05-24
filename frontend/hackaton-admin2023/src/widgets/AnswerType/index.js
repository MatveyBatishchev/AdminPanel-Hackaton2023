import React from 'react';

const AnswerType = (props) => {
    const componentValue = props.value;
    console.log(componentValue);

    return (
        <div>
            {componentValue === 'Текстовый ответ' &&
                <div>
                    <p>Запишите варианты ответов:</p>
                    <input type="text"/>
                    <input type="text"/>
                    <input type="text"/>
                    <input type="text"/>
                </div>
            }
            {componentValue === 'Аудио-дорожка' && <div>
                <p>Прикрепите аудио-материал:</p>
                <input type="file"/>
                <input type="file"/>
                <input type="file"/>
                <input type="file"/>
            </div>}
            {componentValue === 'Видео-ресурс' &&
                <div>
                    <p>Прикрепите видео-материал:</p>
                    <input type="file"/>
                    <input type="file"/>
                    <input type="file"/>
                    <input type="file"/>
                </div>}
            {componentValue === 'Изображение или фотография' &&
                <div>
                    <p>Прикрепите фото-материал:</p>
                    <input type="file"/>
                    <input type="file"/>
                    <input type="file"/>
                    <input type="file"/>
                </div>}
        </div>
    );
};

export default AnswerType;