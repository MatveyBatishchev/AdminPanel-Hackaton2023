import React from 'react';

const AnswerType = (props) => {
    const componentValue = props.value;
    console.log(componentValue);


    return (
        <div>
            {componentValue === 'Текстовый ответ' &&
                <div>
                    <p>Запишите варианты ответов: обратите внимание, что 1 слот отведен для верного ответа</p>
                    <input type="text" accept="image/*" name={`answer_text_${props.index}_1`} />
                    <input type="text" accept="image/*" name={`answer_text_${props.index}_2`} />
                    <input type="text" accept="image/*" name={`answer_text_${props.index}_3`} />
                    <input type="text" accept="image/*" name={`answer_text_${props.index}_4`} />
                </div>
            }
            {componentValue === 'Аудио-дорожка' && <div>
                <p>Прикрепите аудио-материал: обратите внимание, что 1 слот отведен для верного ответа</p>
                <input type="file" name={`answer_audio_${props.index}_1`}/>
                <input type="file" name={`answer_audio_${props.index}_2`}/>
                <input type="file" name={`answer_audio_${props.index}_3`}/>
                <input type="file" name={`answer_audio_${props.index}_4`}/>
            </div>}
            {componentValue === 'Видео-ресурс' &&
                <div>
                    <p>Прикрепите видео-материал: обратите внимание, что 1 слот отведен для верного ответа</p>
                    <input type="file" name={`answer_video_${props.index}_1`}/>
                    <input type="file" name={`answer_video_${props.index}_2`} />
                    <input type="file" name={`answer_video_${props.index}_3`}/>
                    <input type="file" name={`answer_video_${props.index}_4`}/>
                </div>}
            {componentValue === 'Изображение или фотография' &&
                <div>
                    <p>Прикрепите фото-материал: обратите внимание, что 1 слот отведен для верного ответа</p>
                    <input type="file" name={`answer_image_${props.index}_1`} />
                    <input type="file" name={`answer_image_${props.index}_2`} />
                    <input type="file" name={`answer_image_${props.index}_3`} />
                    <input type="file" name={`answer_image_${props.index}_4`} />
                </div>}
        </div>
    );
};

export default AnswerType;