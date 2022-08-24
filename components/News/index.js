import Link from 'next/link'
import React from 'react'

export default function News() {
    return (
        <div className='container'>
            <div className='news'>
                <h2 className='page-title'>News</h2>
                <ul className='news__list'>
                    <li className='news__item'>
                        <Link href='/'>
                            <a className='news__item-wrap'>
                                <div
                                    className='news__img'
                                    style={{ backgroundImage: `url('../../assets/img/@temp/news_01.jpg')` }}
                                ></div>
                                <div className='news__text'>
                                    Why SOCMA's telescopic series forklifts are favored by customers?
                                </div>
                            </a>
                        </Link>
                    </li>
                    <li className='news__item'>
                        <Link href='/'>
                            <a className='news__item-wrap'>
                                <div
                                    className='news__img'
                                    style={{ backgroundImage: `url('../../assets/img/@temp/news_02.jpg')` }}
                                ></div>
                                <div className='news__text'>
                                    Why SOCMA's telescopic series forklifts are favored by customers?
                                </div>
                            </a>
                        </Link>
                    </li>
                    <li className='news__item'>
                        <Link href='/'>
                            <a className='news__item-wrap'>
                                <div
                                    className='news__img'
                                    style={{ backgroundImage: `url('../../assets/img/@temp/news_03.png')` }}
                                ></div>
                                <div className='news__text'>
                                    Why SOCMA's telescopic series forklifts are favored by customers?
                                </div>
                            </a>
                        </Link>
                    </li>
                    <li className='news__item'>
                        <Link href='/'>
                            <a className='news__item-wrap'>
                                <div
                                    className='news__img'
                                    style={{ backgroundImage: `url('../../assets/img/@temp/news_04.png')` }}
                                ></div>
                                <div className='news__text'>
                                    Why SOCMA's telescopic series forklifts are favored by customers?
                                </div>
                            </a>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
