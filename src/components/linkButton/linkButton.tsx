import React, { ChangeEvent, FC } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface Props {
    label: string
    onClick?: () => void
    path?: string
}

export const LinkButton: FC<Props> = (props) => {
    if (props.path) {
        return (
            <Link to={props.path} className='link-button'>
                {props.label}
            </Link>
        )
    } else {
        return (
            <a onClick={props.onClick} className='link-button'>
                {props.label}
            </a>
        )
    }
}
