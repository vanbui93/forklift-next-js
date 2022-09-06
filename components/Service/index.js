import parse from 'html-react-parser'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMain } from '../../store/actions/main'

export default function Service() {
    const mainData = useSelector(state => state.main.data)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMain())
    }, [])

    return (
        mainData.main_content_02 && (
            <div className='container'>
                <div className='service'>
                    <h2 className='page-title'>{mainData.main_content_02.content_title}</h2>
                    <ul className='service__list'>
                        <li className='service__item'>
                            <div className='service__img'>
                                <img src={mainData.main_content_02.icon_01} alt='' />
                            </div>
                            <h3 className='service__sub-title'>{mainData.main_content_02.title_01}</h3>
                            <div className='service__text'>{parse(mainData.main_content_02.des_01)}</div>
                        </li>
                        <li className='service__item'>
                            <div className='service__img'>
                                <img src={mainData.main_content_02.icon_02} alt='' />
                            </div>
                            <h3 className='service__sub-title'>{mainData.main_content_02.title_02}</h3>
                            <div className='service__text'>{parse(mainData.main_content_02.des_02)}</div>
                        </li>
                        <li className='service__item'>
                            <div className='service__img'>
                                <img src={mainData.main_content_02.icon_03} alt='' />
                            </div>
                            <h3 className='service__sub-title'>{mainData.main_content_02.title_03}</h3>
                            <div className='service__text'>{parse(mainData.main_content_02.des_03)}</div>
                        </li>
                    </ul>
                </div>
            </div>
        )
    )
}
