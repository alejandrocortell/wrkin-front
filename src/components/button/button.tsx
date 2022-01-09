import React, { ChangeEvent, FC } from 'react'

interface Props {
    onClick: (event: React.MouseEvent<HTMLElement>) => void
    label: string
    style: 'primary' | 'secondary'
    disabled?: boolean
    loading?: boolean
}

export const Button: FC<Props> = (props) => {
    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        props.onClick(e)
    }

    return (
        <button
            className={`button ${props.style}`}
            onClick={handleClick}
            disabled={props.disabled}
        >
            {props.loading ? (
                <div className='loader-button'></div>
            ) : (
                props.label
            )}
        </button>
    )
}
