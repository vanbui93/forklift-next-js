import { useEffect, useState } from 'react'
import ProductItem from './../../components/ProductItem'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

const HomeProduct = props => {
    const { products } = props
    let data = { ...products }

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

    return (
        <section className='collections'>
            <div className='home-collect01 container'>
                <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                    {loading && <Skeleton containerClassName='avatar-skeleton' className='page-title--seleketon' />}
                </SkeletonTheme>
                <div className='page-title' style={{ display: loading ? 'none' : undefined }}>
                    <h3>Forklift used</h3>
                </div>
                <ul className='collections__list'>{getDulieu('used-forklifts', 10)}</ul>
            </div>
            <div className='home-collect02 container'>
                <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                    {loading && <Skeleton containerClassName='avatar-skeleton' className='page-title--seleketon' />}
                </SkeletonTheme>
                <div className='page-title' style={{ display: loading ? 'none' : undefined }}>
                    <h3>Forklift For Rental / Hire</h3>
                </div>
                <ul className='collections__list'>{getDulieu('rental-hire', 10)}</ul>
            </div>
            <div className='home-collect02 container'>
                <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                    {loading && <Skeleton containerClassName='avatar-skeleton' className='page-title--seleketon' />}
                </SkeletonTheme>
                <div className='page-title' style={{ display: loading ? 'none' : undefined }}>
                    <h3>New Machines</h3>
                </div>
                <ul className='collections__list'>{getDulieu('new-machines', 10)}</ul>
            </div>
        </section>
    )
}

export default HomeProduct
