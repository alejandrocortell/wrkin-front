import React, { FC } from 'react'
import close from 'assets/img/close.svg'

interface Props {
    title: string
    onClose: (event: React.MouseEvent<HTMLElement>) => void
}

export const HeaderModal: FC<Props> = (props) => {
    return (
        <header className='header-modal'>
            <h2>{props.title}</h2>
            <button onClick={props.onClose}>
                <img src={close} alt='Close' />
            </button>
        </header>
    )
}
