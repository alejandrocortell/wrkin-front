import React, { FC } from 'react'
import { Header } from '../header/header'

interface Props {
    children: JSX.Element
}

export const Wrapper: FC<Props> = (props) => {
    return (
        <div className='background-app'>
            <Header />
            {props.children}
        </div>
    )
}
