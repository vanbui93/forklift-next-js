import { Card } from '@material-ui/core'
import { Button, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import { getCollection } from '../../store/actions/collection'
import ProductItem from './../../components/ProductItem'

const HomeProduct = props => {
    const { classes, products } = props
    let data = { ...products }

    const collectAll = useSelector(state => state.collection.data)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCollection())
    }, [])

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        if (products && Object.keys(products)?.length > 0) {
            setLoading(false)
        }
    }, [products])

    var arrayHomeProduct = []
    data !== null &&
        data !== undefined &&
        Object.keys(data)?.map(element => {
            const key = element
            if (data[key] !== null && data[key].collection) {
                const name = data[key].name ? data[key].name : ''
                const price = data[key].price ? data[key].price : ''
                const comparePrice = data[key].compare_price ? data[key].compare_price : ''
                const images = data[key].images ? data[key].images : ''
                const collection = data[key].collection ? data[key].collection : ''
                const isDisplay = data[key].isDisplay ? data[key].isDisplay : ''
                arrayHomeProduct.push({
                    id: key,
                    name: name,
                    price: price,
                    comparePrice: comparePrice,
                    images: images,
                    collection: collection,
                    isDisplay: isDisplay,
                })
            }
        })

    const currentList = [...arrayHomeProduct]
    const getDulieu = (collection, litmits) => {
        const arrCollection = currentList?.filter(item => {
            if (collection === item.collection) {
                return item
            }
        })

        return arrCollection.slice(0, litmits).map((item, idx) => {
            return (
                item?.isDisplay === '1' && (
                    <ProductItem
                        key={idx}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        comparePrice={item.compare_price}
                        images={item.images}
                    />
                )
            )
        })
    }

    const collectName =
        collectAll &&
        Object.values(collectAll)?.map((item, idx) => {
            return item
        })

    return (
        <section className='container'>
            <div className='container'>
                <div className='page-title-wrap'>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem' textAlign='center'>
                            {loading && (
                                <Skeleton containerClassName='avatar-skeleton' className='page-title--seleketon' />
                            )}
                        </SkeletonTheme>
                    </div>
                    <h2 className='page-title' style={{ display: loading ? 'none' : undefined }}>
                        Forklift Sales Rental
                    </h2>
                </div>
                <div className='home-collection'>
                    <ul className='home-collection__list'>
                        <li className='home-collection__item'>
                            <Link href={`/collections/${collectName[0]?.collection}`}>
                                <a>
                                    <div
                                        className='home-collection__img'
                                        style={{ backgroundImage: `url('../../assets/img/@temp/collect_01.jpg')` }}
                                    ></div>
                                    <h3 className='home-collection__text'>{collectName[0]?.name}</h3>
                                </a>
                            </Link>
                        </li>
                        <li className='home-collection__item'>
                            <Link href={`/collections/${collectName[1]?.collection}`}>
                                <a>
                                    <div
                                        className='home-collection__img'
                                        style={{ backgroundImage: `url('../../assets/img/@temp/collect_02.jpg')` }}
                                    ></div>
                                    <h3 className='home-collection__text'>{collectName[1]?.name}</h3>
                                </a>
                            </Link>
                        </li>
                        <li className='home-collection__item'>
                            <Link href={`/collections/${collectName[2]?.collection}`}>
                                <a>
                                    <div
                                        className='home-collection__img'
                                        style={{ backgroundImage: `url('../../assets/img/@temp/collect_03.jpg')` }}
                                    ></div>
                                    <h3 className='home-collection__text'>{collectName[2]?.name}</h3>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default HomeProduct
