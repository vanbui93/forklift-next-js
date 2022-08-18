import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckDouble, faCartFlatbed, faHeadset, faRefresh } from '@fortawesome/free-solid-svg-icons'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

export default function CoreValue(props) {
    const { coreValue } = props

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (Object.keys(coreValue)?.length > 0) {
            setLoading(false)
        }
    }, [coreValue])

    return (
        <section>
            <div className='container coreValue'>
                <ul className='coreValue__list'>
                    <li className='coreValue__item'>
                        <span className='coreValue__icon'>
                            <FontAwesomeIcon icon={faCheckDouble} size='3x' style={{ color: '#d2d2d7' }} />
                        </span>
                        <div className='coreValue__text'>
                            <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                {loading && <Skeleton className='coreValue__text01--seleketon' />}
                            </SkeletonTheme>
                            <span style={{ display: loading ? 'none' : undefined }}>{coreValue?.core_title_01}</span>
                            <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                {loading && <Skeleton className='coreValue__text02--seleketon' />}
                            </SkeletonTheme>
                            <strong style={{ display: loading ? 'none' : undefined }}>
                                {coreValue?.core_content_01}
                            </strong>
                        </div>
                    </li>
                    <li className='coreValue__item'>
                        <span className='coreValue__icon'>
                            <FontAwesomeIcon icon={faCartFlatbed} size='3x' style={{ color: '#d2d2d7' }} />
                        </span>
                        <div className='coreValue__text'>
                            <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                {loading && <Skeleton className='coreValue__text01--seleketon' />}
                            </SkeletonTheme>
                            <span style={{ display: loading ? 'none' : undefined }}>{coreValue?.core_title_02}</span>
                            <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                {loading && <Skeleton className='coreValue__text02--seleketon' />}
                            </SkeletonTheme>
                            <strong style={{ display: loading ? 'none' : undefined }}>
                                {coreValue?.core_content_02}
                            </strong>
                        </div>
                    </li>
                    <li className='coreValue__item'>
                        <span className='coreValue__icon'>
                            <FontAwesomeIcon icon={faHeadset} size='3x' style={{ color: '#d2d2d7' }} />
                        </span>
                        <div className='coreValue__text'>
                            <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                {loading && <Skeleton className='coreValue__text01--seleketon' />}
                            </SkeletonTheme>
                            <span style={{ display: loading ? 'none' : undefined }}>{coreValue?.core_title_03}</span>
                            <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                {loading && <Skeleton className='coreValue__text02--seleketon' />}
                            </SkeletonTheme>
                            <strong style={{ display: loading ? 'none' : undefined }}>
                                {coreValue?.core_content_03}
                            </strong>
                        </div>
                    </li>
                    <li className='coreValue__item'>
                        <span className='coreValue__icon'>
                            <FontAwesomeIcon icon={faRefresh} size='3x' style={{ color: '#d2d2d7' }} />
                        </span>
                        <div className='coreValue__text'>
                            <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                {loading && <Skeleton className='coreValue__text01--seleketon' />}
                            </SkeletonTheme>
                            <span style={{ display: loading ? 'none' : undefined }}>{coreValue?.core_title_04}</span>
                            <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                {loading && <Skeleton className='coreValue__text02--seleketon' />}
                            </SkeletonTheme>
                            <strong style={{ display: loading ? 'none' : undefined }}>
                                {coreValue?.core_content_04}
                            </strong>
                        </div>
                    </li>
                </ul>
            </div>
        </section>
    )
}
