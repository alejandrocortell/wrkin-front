import React, { ChangeEvent, FC, useState } from 'react'
import { FileDrop } from 'react-file-drop'
import { useTranslation } from 'react-i18next'
import imageFile from 'assets/img/file.svg'

interface props {
    value: any
    onChange: any
}

export const InputFile: FC<props> = (props) => {
    const { t } = useTranslation()

    return (
        <FileDrop
            onDrop={(files, event) =>
                files !== null && props.onChange(files[0])
            }
        >
            <div className='container-drag-drop'>
                <img src={imageFile} alt='Drop file' />
                <p>{t('DOCUMENTS_DROP_FILES')}</p>
                {props.value ? (
                    <p>
                        {t('FORM_FILE_SELECTED')}{' '}
                        <span className='file-name'>{props.value.name}</span>
                    </p>
                ) : (
                    <p>{t('FORM_NOT_FILE_SELECTED')}</p>
                )}
            </div>

            <input
                type='file'
                onChange={(e) => {
                    if (!e.target.files) return
                    props.onChange(e.target.files[0])
                }}
            />
        </FileDrop>
    )
}
