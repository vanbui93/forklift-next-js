import parse from 'html-react-parser'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMain } from '../../store/actions/main'

export default function AboutUs(props) {
    const mainData = useSelector(state => state.main.data)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMain())
    }, [])

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(false)
    }, [mainData])

    return (
        mainData.main_content_01 && (
            <div className='container'>
                <div className='aboutus'>
                    <h2 className='page-title'>{mainData.main_content_01?.title}</h2>
                    <div className='aboutus__inner'>
                        <div
                            className='aboutus__img'
                            style={{
                                backgroundImage: `url(${mainData.main_content_01?.image})`,
                            }}
                        ></div>
                        <div className='aboutus__text'>
                            <div className='aboutus__text-inner'>
                                <div>{parse(mainData.main_content_01.des)}</div>
                                <div className='btn_more'>
                                    <Link href={mainData.main_content_01.link}>
                                        <a>— ดูเพิ่มเติม</a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}
