import React, { FC } from 'react'
import { Header } from '../header/header'

interface Props {
    showMenu: boolean
    children: JSX.Element
}

export const Wrapper: FC<Props> = (props) => {
    return (
        <>
            {props.showMenu && <Header />}
            <div className='background-app'></div>
            {props.children}
        </>
    )
}
