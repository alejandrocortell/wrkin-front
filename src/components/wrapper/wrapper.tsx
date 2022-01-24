import React, { FC } from 'react'
import { Header } from '../header/header'

interface Props {
    children: JSX.Element
}

export const Wrapper: FC<Props> = (props) => {
    return (
        <>
            <Header />
            <div className='background-app'></div>
            {props.children}
        </>
    )
}
