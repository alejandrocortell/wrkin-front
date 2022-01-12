import React, { FC } from 'react'
import { Logo } from '../logo/logo'
import { MenuHeader } from './menuHeader'

interface Props {}

export const Header: FC<Props> = (props) => {
    return (
        <header className='header'>
            <div className='container'>
                <div className='container-header'>
                    <div className='container-logo'>
                        <Logo />
                    </div>
                    <MenuHeader />
                </div>
            </div>
        </header>
    )
}
