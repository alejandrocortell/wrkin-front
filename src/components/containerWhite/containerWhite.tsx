import React, { ChangeEvent, FC } from 'react'

interface Props {
    children: JSX.Element
}

export const ContainerWhite: FC<Props> = (props) => {
    return <div className='container-white'>{props.children}</div>
}
