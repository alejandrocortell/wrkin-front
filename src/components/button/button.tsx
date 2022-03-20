import React, { ChangeEvent, FC } from 'react'

interface Props {
    onClick: (event: React.MouseEvent<HTMLElement>) => void
    label: string
    style: 'primary' | 'secondary' | 'accept' | 'delete'
    disabled?: boolean
    loading?: boolean
    testTag?: string
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
            data-cy={props.testTag ? props.testTag : null}
        >
            {props.loading ? (
                <div className='loader-button'></div>
            ) : (
                props.label
            )}
        </button>
    )
}
