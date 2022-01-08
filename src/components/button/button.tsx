import React, { ChangeEvent, FC } from 'react'

interface Props {
    onClick: () => void
    label: string
    style: 'primary' | 'secondary'
    disabled?: boolean
}

export const Button: FC<Props> = (props) => {
    const handleClick = () => {
        props.onClick()
    }

    return (
        <button
            className={`button ${props.style}`}
            onClick={handleClick}
            disabled={props.disabled}
        >
            {props.label}
        </button>
    )
}
