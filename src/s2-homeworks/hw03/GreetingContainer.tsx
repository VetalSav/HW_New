import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import Greeting, {GreetingPropsType} from './Greeting'
import {UserType} from './HW3'

type GreetingContainerPropsType = {
    users: Array<UserType> // need to fix any
    addUserCallback: (name: string) => void // need to fix any
}

export const pureAddUser = (name: string, setError: any, setName: any, addUserCallback: any) => {
    // если имя пустое - показать ошибку, иначе - добавить юзера и очистить инпут
    let nameTrim = name.trim()
    if (!nameTrim) {
        setError("Ошибка! Введите имя!")
    } else {
        addUserCallback(nameTrim)

        setName('')
    }

}

export const pureOnBlur = (name: string, setError: (st: string) => void) => {
    if (!name.trim()) setError('Ошибка! Введите имя!')
}

export const pureOnEnter = (e: React.KeyboardEvent, addUser: any) => {
    e.key === "Enter" && addUser()
    // если нажата кнопка Enter - добавить
}

// более простой и понятный для новичков
// function GreetingContainer(props: GreetingPropsType) {

// более современный и удобный для про :)
const GreetingContainer: React.FC<GreetingContainerPropsType> = ({
                                                                     users,
                                                                     addUserCallback,
                                                                 }) => {
    // деструктуризация пропсов
    const [name, setName] = useState<string>('') // need to fix any
    const [error, setError] = useState<string>('') // need to fix any

    const totalUsers = users.length // need to fix
    let lastUserName = ""
    if (users.length >= 1) {
        lastUserName = users[users.length - 1].name
    }
    const setNameCallback = (e: React.ChangeEvent<HTMLInputElement>) => { // need to fix any
        let nameTrime = e.currentTarget.value
        if (nameTrime) {
            setName(nameTrime)
            setError("")


        } else {
            setName('')
            setError("Ошибка! Введите имя!")
        }


    }
    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback)
        lastUserName = name

    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: React.KeyboardEvent) => {
        pureOnEnter(e, addUser)
    }


    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer
