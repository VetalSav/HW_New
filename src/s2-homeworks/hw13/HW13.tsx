import React, {useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW13.module.css'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import axios from 'axios'
import success200 from './images/200.svg'
import error400 from './images/400.svg'
import error500 from './images/500.svg'
import errorUnknown from './images/error.svg'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../hw10/bll/store";
import {loadingAC} from "../hw10/bll/loadingReducer";

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
    const statusLoading:boolean = useSelector<AppStoreType, boolean>((state) => state.loading.isLoading)
    const dispatch = useDispatch()

    const send = (x?: boolean | null) => () => {
        const url =
            x === null
                ? 'https://xxxxxx.ccc' // имитация запроса на не корректный адрес
                : 'https://incubator-personal-page-back.herokuapp.com/api/3.0/homework/test'

        setCode('')
        setImage('')
        setText('')
        setInfo('...loading')
        dispatch(loadingAC(true))
        axios
            .post(url, {success: x})
            .then((res) => {
                setCode(res.status.toString())
                setImage(success200)
                setText(res.data.errorText.toString())
                setInfo(res.data.info.toString())
                dispatch(loadingAC(false))

                // дописать

            })
            .catch((err) => {
                // дописать

                if (err.name ==='AxiosError'){
                    setImage(errorUnknown)
                    setText(err.message.toString())
                    setInfo(err.name.toString())
                    dispatch(loadingAC(false))

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
                    dispatch(loadingAC(false))
                } else if (err.request) {
                    // client never received a response, or request never left

                    dispatch(loadingAC(false))
                } else {
                    // anything else

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
                        disabled={statusLoading}
                        // дописать

                    >
                        Send true
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-false'}
                        onClick={send(false)}
                        xType={'secondary'}
                        disabled={statusLoading}
                        // дописать

                    >
                        Send false
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-undefined'}
                        onClick={send(undefined)}
                        xType={'secondary'}
                        disabled={statusLoading}
                        // дописать

                    >
                        Send undefined
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-null'}
                        onClick={send(null)} // имитация запроса на не корректный адрес
                        xType={'secondary'}
                        disabled={statusLoading}
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
