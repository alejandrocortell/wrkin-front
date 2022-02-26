import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { Logo } from 'components/logo/logo'
import { MenuHeader } from './menuHeader'

interface Props {}

export const Header: FC<Props> = (props) => {
    return (
        <header className='header'>
            <div className='container'>
                <div className='container-header'>
                    <div className='container-logo'>
                        <Link to={'/'}>
                            <Logo />
                        </Link>
                    </div>
                    <MenuHeader />
                </div>
            </div>
        </header>
    )
}
