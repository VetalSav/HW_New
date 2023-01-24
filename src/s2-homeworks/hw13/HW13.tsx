import React, {useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW13.module.css'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import axios from 'axios'
import success200 from './images/200.svg'
import error400 from './images/400.svg'
import error500 from './images/500.svg'
import errorUnknown from './images/error.svg'

/*
* 1 - дописать функцию send
* 2 - дизэйблить кнопки пока идёт запрос
* 3 - сделать стили в соответствии с дизайном
* */

const HW13 = () => {
    const [code, setCode] = useState('')
    const [text, setText] = useState('')
    const [info, setInfo] = useState('')
    const [image, setImage] = useState('')
    const [disabletBt, SetdisabletBt] = useState(false)

    const send = (x?: boolean | null) => () => {
        const url =
            x === null
                ? 'https://xxxxxx.ccc' // имитация запроса на не корректный адрес
                : 'https://incubator-personal-page-back.herokuapp.com/api/3.0/homework/test'

        setCode('')
        setImage('')
        setText('')
        setInfo('...loading')
        SetdisabletBt(true)
        axios
            .post(url, {success: x})
            .then((res) => {
                setCode(res.status.toString())
                setImage(success200)
                setText(res.data.errorText.toString())
                setInfo(res.data.info.toString())
                SetdisabletBt(false)

                // дописать

            })
            .catch((err) => {
                // дописать
                console.log(err)
                if (err.name ==='AxiosError'){
                    console.log("hello bro")
                    setImage(errorUnknown)
                    SetdisabletBt(false)
                    setText(err.message.toString())
                    setInfo(err.name.toString())

                }
                else if (err.response) {
                    // client received an error response (5xx, 4xx)

                    let code = err.response?.status
                    let imgError =
                        code === 400
                            ? error400
                            : error500
                    setCode(code.toString())
                    setText(err.response.data.errorText.toString())
                    setInfo(err.response.data.info.toString())
                    setImage(imgError)
                    SetdisabletBt(false)
                } else if (err.request) {
                    // client never received a response, or request never left
                    console.log(`err.request ${err.request}`)
                    SetdisabletBt(false)
                } else {
                    // anything else
                    console.log(` ${err}`)
                }
            })
    }

    return (
        <div id={'hw13'}>
            <div className={s2.hwTitle}>Homework #13</div>

            <div className={s2.hw}>
                <div className={s.buttonsContainer}>
                    <SuperButton
                        id={'hw13-send-true'}
                        onClick={send(true)}
                        xType={'secondary'}
                        disabled={disabletBt}
                        // дописать

                    >
                        Send true
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-false'}
                        onClick={send(false)}
                        xType={'secondary'}
                        disabled={disabletBt}
                        // дописать

                    >
                        Send false
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-undefined'}
                        onClick={send(undefined)}
                        xType={'secondary'}
                        disabled={disabletBt}
                        // дописать

                    >
                        Send undefined
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-null'}
                        onClick={send(null)} // имитация запроса на не корректный адрес
                        xType={'secondary'}
                        disabled={disabletBt}
                        // дописать

                    >
                        Send null
                    </SuperButton>
                </div>

                <div className={s.responseContainer}>
                    <div className={s.imageContainer}>
                        {image && <img src={image} className={s.image} alt="status"/>}
                    </div>

                    <div className={s.textContainer}>
                        <div id={'hw13-code'} className={s.code}>
                            {code}
                        </div>
                        <div id={'hw13-text'} className={s.text}>
                            {text}
                        </div>
                        <div id={'hw13-info'} className={s.info}>
                            {info}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HW13
