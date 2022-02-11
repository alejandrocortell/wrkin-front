import React, { ChangeEvent, FC, useState } from 'react'
import visibility from '../../assets/img/visibility.svg'
import visibilityOff from '../../assets/img/visibility_off.svg'

interface Props {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    value: string | number
    label: string
    type:
        | 'text'
        | 'email'
        | 'date'
        | 'time'
        | 'password'
        | 'file'
        | 'number'
        | 'textarea'
    error: boolean
    errorText: string
    required?: boolean
    disabled?: boolean
    min?: string
    max?: string
}

export const InputField: FC<Props> = (props) => {
    const [type, setType] = useState(props.type)

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e)
    }

    const toggleVisibility = () => {
        type === 'text' ? setType('password') : setType('text')
    }

    if (type === 'textarea') {
        return (
            <div className='input-field'>
                <label>
                    {props.label}
                    {props.required && '*'}
                </label>
                <textarea name='' id='' cols={30} rows={4}></textarea>
            </div>
        )
    }
    return (
        <div className='input-field'>
            <label>
                {props.label}
                {props.required && '*'}
            </label>
            {props.type === 'password' && (
                <div
                    className='container-visibility'
                    onClick={toggleVisibility}
                >
                    <img
                        src={type === 'password' ? visibility : visibilityOff}
                        alt='toggle visibility password'
                        className='toggle-visibility'
                    />
                </div>
            )}
            <input
                type={type}
                value={props.value}
                onChange={handleChange}
                required={props.required}
                disabled={props.disabled}
                className={`${props.error && 'error'}`}
                min={props.min}
                max={props.max}
            />
            <span className='error-text'>{props.error && props.errorText}</span>
        </div>
    )
}
