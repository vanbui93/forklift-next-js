import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMenu } from '../../store/actions/menu'

export default function BreadCrumb(props) {
    const { productName, collection } = props
    const menus = useSelector(state => state.menu.data)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMenu())
    }, [])
    const colllectName =
        menus &&
        Object.values(menus)?.filter(item => {
            return item.link.split('/')[1] == collection
        })

    return (
        <div className='container'>
            <ul className='breadcrumb'>
                {collection && (
                    <li className='breadcrumb__item'>
                        <Link href='/'>
                            <a className='breadcrumb__link'>
                                <FontAwesomeIcon icon={faHouse} style={{ color: '#515154' }} />
                                Trang chủ
                            </a>
                        </Link>
                        <Link href={`/collections/${collection}`}>
                            <a className='breadcrumb__link'>{colllectName[0]?.name}</a>
                        </Link>
                        <a className='breadcrumb__link'>{productName}</a>
                    </li>
                )}
            </ul>
        </div>
    )
}
