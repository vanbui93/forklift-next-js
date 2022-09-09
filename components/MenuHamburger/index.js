import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMenu } from '../../store/actions/menu'
import * as hamgugerActions from './../../store/actions/mobileMenu'

export default function MenuHamburger(props) {
    const { headerData } = props

    const menus = useSelector(state => state.menu.data)
    const showhamburger = useSelector(state => state.hambuger.showhamburger)

    const dispatch = useDispatch()
    const handleCloseHambuger = () => {
        dispatch(hamgugerActions.hideHamburger())
    }
    useEffect(() => {
        dispatch(getMenu())
    }, [])

    const arrayMenu = []
    menus !== null &&
        menus !== undefined &&
        Object.values(menus)?.filter(item => {
            if (item !== null) {
                const name = item.name ? item.name : ''
                const link = item.link ? item.link : ''
                arrayMenu.push({
                    name: name,
                    link: link,
                })
            }
        })

    return (
        showhamburger && (
            <div className='menu-hamberger__wrap'>
                <ul className='menu-hamberger__list'>
                    {arrayMenu?.map((item, idx) => (
                        <li className='menu-hamberger__item' key={idx}>
                            <Link href={`/${item.link}`}>
                                <a onClick={handleCloseHambuger}>{item?.name}</a>
                            </Link>
                        </li>
                    ))}
                </ul>
                <div className='menu-hamberger__contact'>
                    <p className='menu-hamberger__contact-title'>ติดต่อ</p>
                    <ul className='menu-hamberger__contact-list'>
                        <li className='menu-hamberger__contact-item'>
                            ซื้อ: <a href={`tel:${headerData?.phone}`}>{headerData?.phone}</a>
                        </li>
                        <li className='menu-hamberger__contact-item'>
                            ร้องทุกข์: <a href={`tel:${headerData?.hotline}`}>{headerData?.hotline}</a>
                        </li>
                    </ul>
                </div>
                <div className='menu-hamberger__close' onClick={handleCloseHambuger}></div>
            </div>
        )
    )
}
