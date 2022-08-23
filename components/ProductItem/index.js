import Link from 'next/link'
import { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useSelector } from 'react-redux'
import { numberInputFormat } from '../../utils/numberInputFormat'

export default function ProductItem(props) {
    const { id, name, price, comparePrice, images } = props
    const mainData = useSelector(state => state.main.data)

    const img = []
    images !== null &&
        images !== undefined &&
        Object.values(images)?.map(item => {
            if (item !== null) {
                img.push(item)
            }
        })

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (Object.keys(mainData)?.length > 0) {
            setLoading(false)
        }
    }, [mainData])

    return (
        <li className='collections__item'>
            <Link href={`/product/${id}`} className='collection__link'>
                <a>
                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                        {loading && <Skeleton className='collections__img--sekeleton' />}
                    </SkeletonTheme>
                    <div className='collections__img' style={{ display: loading ? 'none' : undefined }}>
                        <img src={img[0]} alt='' />
                    </div>
                    <div className='collections__info'>
                        <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                            {loading && <Skeleton className='collections__title--sekeleton' />}
                        </SkeletonTheme>
                        <h4 className='collections__title' style={{ display: loading ? 'none' : undefined }}>
                            {name}
                        </h4>
                        <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                            {loading && <Skeleton className='collections__price--sekeleton' />}
                        </SkeletonTheme>
                        <p className='collections__price' style={{ display: loading ? 'none' : undefined }}>
                            <strong className='collections__new-price'>
                                {price ? `${numberInputFormat(price.toString())} Bath` : `${mainData?.phone}`}
                            </strong>
                            {price && comparePrice && (
                                <strike className='collections__compare-price'>
                                    {numberInputFormat(comparePrice.toString())} Bath
                                </strike>
                            )}
                        </p>
                    </div>
                </a>
            </Link>
        </li>
    )
}
