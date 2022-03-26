import React, { ChangeEvent, FC } from 'react'

interface Props {
    onChange: () => void
    checked: boolean
    label: string
}

export const Checkbox: FC<Props> = (props) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange()
    }

    return (
        <label className='checkbox-field'>
            <input
                type='checkbox'
                aria-label='checkbox'
                checked={props.checked}
                onChange={handleChange}
            />
            <span className='checkmark'></span>
            {props.label}
        </label>
    )
}
