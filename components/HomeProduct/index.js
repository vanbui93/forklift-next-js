import Link from 'next/link'
import { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { getCollection } from '../../store/actions/collection'

const HomeProduct = props => {
    const collectAll = useSelector(state => state.collection.data)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCollection())
    }, [])

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (collectAll && Object.keys(collectAll)?.length > 0) {
            setLoading(false)
        }
    }, [collectAll])

    const collectName =
        collectAll &&
        Object.values(collectAll)?.map(item => {
            return item
        })

    const collectData = [...collectName]
        .slice(0, 3)
        .filter(
            e => e.collection === 'used-forklifts' || e.collection === 'new-machines' || e.collection === 'rental-hire'
        )

    return (
        <section className='container'>
            <div className='page-title-wrap'>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem' textAlign='center'>
                        {loading && <Skeleton containerClassName='avatar-skeleton' className='page-title--seleketon' />}
                    </SkeletonTheme>
                </div>
                <h2
                    className='page-title page-title--home-collection'
                    style={{ display: loading ? 'none' : undefined }}
                >
                    Forklift Sales Rental
                </h2>
            </div>
            <div className='home-collection'>
                <ul className='home-collection__list'>
                    {collectData &&
                        collectData?.map((item, idx) => (
                            <li className='home-collection__item' key={idx}>
                                <Link href={`/collections/${item?.collection}`}>
                                    <a>
                                        <div
                                            className='home-collection__img'
                                            style={{ backgroundImage: `url(${item.image})` }}
                                        ></div>
                                        <h3 className='home-collection__text'>{item?.name}</h3>
                                    </a>
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
        </section>
    )
}

export default HomeProduct
