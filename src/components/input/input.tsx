import React, { ChangeEvent, FC } from 'react'

interface Props {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    value: string | number
    label: string
    type:
        | 'text'
        | 'email'
        | 'date'
        | 'password'
        | 'file'
        | 'number'
        | 'textarea'
    error: boolean
    errorText: string
    required?: boolean
    disabled?: boolean
}

export const InputField: FC<Props> = (props) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e)
    }

    if (props.type === 'textarea') {
        return (
            <div>
                <textarea name='' id='' cols={30} rows={10}></textarea>
            </div>
        )
    }
    return (
        <label className='input-field'>
            <span>
                {props.label}
                {props.required && '*'}
            </span>
            <input
                type={props.type}
                value={props.value}
                onChange={handleChange}
                required={props.required}
                disabled={props.disabled}
                className={`${props.error && 'error'}`}
            />
            <span className='error-text'>{props.error && props.errorText}</span>
        </label>
    )
}
