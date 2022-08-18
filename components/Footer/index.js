import Link from 'next/link'
import { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
export default function Footer(props) {
    const { footerData } = props
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (Object.keys(footerData)?.length > 0) {
            setLoading(false)
        }
    }, [footerData])

    return (
        <footer className='footer'>
            <div className='container-fluid'>
                <div className='footer__area'>
                    <div className='container'>
                        {footerData && (
                            <div className='footer__inner'>
                                <div className='footer__col'>
                                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                        {loading && (
                                            <Skeleton
                                                width={250}
                                                height={22}
                                                style={{ marginRight: '20px' }}
                                                containerClassName='avatar-skeleton'
                                            />
                                        )}
                                    </SkeletonTheme>
                                    <h3 style={{ display: loading ? 'none' : undefined }}>
                                        {footerData.footer_title?.footer_title_01}
                                    </h3>
                                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                        {loading && (
                                            <Skeleton
                                                width={250}
                                                height={16}
                                                style={{ marginRight: '20px' }}
                                                containerClassName='avatar-skeleton'
                                                count={4}
                                            />
                                        )}
                                    </SkeletonTheme>
                                    <ul className='footer__list' style={{ display: loading ? 'none' : undefined }}>
                                        <li className='footer__item'>
                                            <Link href={`/page/${footerData.footer_sub?.link_01}`}>
                                                <a>{footerData.footer_sub?.text_01}</a>
                                            </Link>
                                        </li>
                                        <li className='footer__item'>
                                            <Link href={`/page/${footerData.footer_sub?.link_02}`}>
                                                <a>{footerData.footer_sub?.text_02}</a>
                                            </Link>
                                        </li>
                                        <li className='footer__item'>
                                            <Link href={`/page/${footerData.footer_sub?.link_03}`}>
                                                <a>{footerData.footer_sub?.text_03}</a>
                                            </Link>
                                        </li>
                                        <li className='footer__item'>
                                            <Link href={`/page/${footerData.footer_sub?.link_04}`}>
                                                <a>{footerData.footer_sub?.text_04}</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className='footer__col'>
                                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                        {loading && (
                                            <Skeleton
                                                width={250}
                                                height={22}
                                                style={{ marginRight: '20px' }}
                                                containerClassName='avatar-skeleton'
                                            />
                                        )}
                                    </SkeletonTheme>
                                    <h3 style={{ display: loading ? 'none' : undefined }}>
                                        {footerData.footer_title?.footer_title_02}
                                    </h3>
                                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                        {loading && (
                                            <Skeleton
                                                width={250}
                                                height={16}
                                                style={{ marginRight: '20px' }}
                                                containerClassName='avatar-skeleton'
                                                count={2}
                                            />
                                        )}
                                    </SkeletonTheme>
                                    <ul className='footer__list' style={{ display: loading ? 'none' : undefined }}>
                                        <li className='footer__item'>
                                            <a href={`tel: ${footerData?.phone}`}>
                                                <span>Hotline</span>: {footerData?.phone}
                                            </a>
                                        </li>
                                        <li className='footer__item'>
                                            <span>Địa chỉ :</span> {footerData?.address}
                                        </li>
                                    </ul>
                                </div>
                                <div className='footer__col payment'>
                                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                        {loading && (
                                            <Skeleton
                                                width={250}
                                                height={22}
                                                style={{ marginRight: '20px' }}
                                                containerClassName='avatar-skeleton'
                                            />
                                        )}
                                    </SkeletonTheme>
                                    <h3 style={{ display: loading ? 'none' : undefined }}>
                                        {footerData.footer_title?.footer_title_03}
                                    </h3>
                                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                        {loading && (
                                            <Skeleton
                                                width={250}
                                                height={16}
                                                style={{ marginRight: '20px' }}
                                                containerClassName='avatar-skeleton'
                                                count={3}
                                            />
                                        )}
                                    </SkeletonTheme>
                                    <ul className='payment__logo' style={{ display: loading ? 'none' : undefined }}>
                                        <li className='payment__item'>
                                            <img src={'/assets/img/logo-visa.png'} />
                                            <img src={'../assets/img/logo-master.png'} />
                                        </li>
                                        <li className='payment__item'>
                                            <img src={'/assets/img/logo-jcb.png'} />
                                            <img src={'/assets/img/logo-samsungpay.png'} />
                                        </li>
                                        <li className='payment__item'>
                                            <img src={'/assets/img/logo-atm.png'} />
                                            <img src={'/assets/img/logo-vnpay.png'} />
                                        </li>
                                    </ul>
                                </div>
                                <div className='footer__col transfer'>
                                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                        {loading && (
                                            <Skeleton
                                                width={250}
                                                height={22}
                                                style={{ marginRight: '20px' }}
                                                containerClassName='avatar-skeleton'
                                            />
                                        )}
                                    </SkeletonTheme>
                                    <h3 style={{ display: loading ? 'none' : undefined }}>
                                        {footerData.footer_title?.footer_title_04}
                                    </h3>
                                    <ul className='transfer__list'>
                                        <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                            {loading && (
                                                <Skeleton
                                                    width={77}
                                                    height={38}
                                                    style={{ marginRight: '3px' }}
                                                    containerClassName='avatar-skeleton'
                                                />
                                            )}
                                        </SkeletonTheme>
                                        <li
                                            className='transfer__item'
                                            style={{ display: loading ? 'none' : undefined }}
                                        >
                                            <img src={'/assets/img/nhattin.jpg'} />
                                        </li>
                                        <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                            {loading && (
                                                <Skeleton width={77} height={38} containerClassName='avatar-skeleton' />
                                            )}
                                        </SkeletonTheme>
                                        <li
                                            className='transfer__item'
                                            style={{ display: loading ? 'none' : undefined }}
                                        >
                                            <img src={'/assets/img/vnpost.jpg'} />
                                        </li>
                                    </ul>
                                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                        {loading && (
                                            <Skeleton
                                                width={160}
                                                height={61}
                                                style={{ marginRight: '20px' }}
                                                containerClassName='avatar-skeleton'
                                            />
                                        )}
                                    </SkeletonTheme>
                                    <div className='notice-ministry' style={{ display: loading ? 'none' : undefined }}>
                                        <Link href='/' target='_blank'>
                                            <img src={'/assets/img/logo-bct.png'} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    )
}
