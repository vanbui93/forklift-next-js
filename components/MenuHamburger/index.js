import Link from 'next/link'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import * as hamgugerActions from './../../store/actions/mobileMenu'

export default function MenuHamburger(props) {
    const { headerData } = props

    const showhamburger = useSelector(state => state.hambuger.showhamburger)

    const dispatch = useDispatch()
    const handleCloseHambuger = () => {
        dispatch(hamgugerActions.hideHamburger())
    }
    return (
        showhamburger && (
            <div className='menu-hamberger__wrap'>
                <ul className='menu-hamberger__list'>
                    <li className='menu-hamberger__item'>
                        <Link href={`/page/${headerData.menu_hambuger?.link_menu_01}`}>
                            <a onClick={handleCloseHambuger}>{headerData.menu_hambuger?.text_menu_01}</a>
                        </Link>
                    </li>
                    <li className='menu-hamberger__item'>
                        <Link href={`/page/${headerData.menu_hambuger?.link_menu_02}`}>
                            <a onClick={handleCloseHambuger}>{headerData.menu_hambuger?.text_menu_02}</a>
                        </Link>
                    </li>
                    <li className='menu-hamberger__item'>
                        <Link href={`/page/${headerData.menu_hambuger?.link_menu_03}`}>
                            <a onClick={handleCloseHambuger}>{headerData.menu_hambuger?.text_menu_03}</a>
                        </Link>
                    </li>
                    <li className='menu-hamberger__item'>
                        <Link href={`/page/${headerData.menu_hambuger?.link_menu_04}`}>
                            <a onClick={handleCloseHambuger}>{headerData.menu_hambuger?.text_menu_04}</a>
                        </Link>
                    </li>
                </ul>
                <div className='menu-hamberger__contact'>
                    <p className='menu-hamberger__contact-title'>Liên hệ</p>
                    <ul className='menu-hamberger__contact-list'>
                        <li className='menu-hamberger__contact-item'>
                            Mua hàng: <a href={`tel:${headerData?.phone}`}>{headerData?.phone}</a>
                        </li>
                        <li className='menu-hamberger__contact-item'>
                            Khiếu nại: <a href={`tel:${headerData?.hotline}`}>{headerData?.hotline}</a>
                        </li>
                    </ul>
                </div>
                <div className='menu-hamberger__close' onClick={handleCloseHambuger}></div>
            </div>
        )
    )
}
