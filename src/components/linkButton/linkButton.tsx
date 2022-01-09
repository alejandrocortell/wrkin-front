import React, { ChangeEvent, FC } from 'react'
import { useNavigate } from 'react-router-dom'

interface Props {
    label: string
    onClick?: () => void
    path?: string
}

export const LinkButton: FC<Props> = (props) => {
    const navigate = useNavigate()
    const handleClick = () => {
        if (props.path) {
            navigate(props.path)
        } else if (props.onClick) {
            props.onClick()
        }
    }

    return (
        <a onClick={handleClick} className='link-button'>
            {props.label}
        </a>
    )
}
