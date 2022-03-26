import React, { ChangeEvent, FC, useState } from 'react'

interface Props {
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void
    value: string | number
    label: string
    list: Array<{ value: string }>
    error: boolean
    errorText: string
    required?: boolean
    disabled?: boolean
    min?: string
    max?: string
}

export const Dropdown: FC<Props> = (props) => {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        props.onChange(e)
    }

    return (
        <div className='dropdown input-field'>
            <label data-testid='label'>
                {props.label}
                {props.required && '*'}
            </label>
            <select
                value={props.value}
                onChange={handleChange}
                className={`${props.error && 'error'}`}
            >
                {props.list.map((e) => {
                    return (
                        <option key={e.value}>
                            {e.value.charAt(0).toUpperCase() + e.value.slice(1)}
                        </option>
                    )
                })}
            </select>
            {props.error && (
                <span className='error-text'>{props.errorText}</span>
            )}
        </div>
    )
}
