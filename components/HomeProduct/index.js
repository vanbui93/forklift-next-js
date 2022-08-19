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
            if (data[key] !== null && data[key].fullbox) {
                const name = data[key].name ? data[key].name : ''
                const price = data[key].price ? data[key].price : ''
                const comparePrice = data[key].compare_price ? data[key].compare_price : ''
                const images = data[key].images ? data[key].images : ''
                const newPercent = data[key].newBox ? data[key].newBox : ''
                const fullbox = data[key].fullbox ? data[key].fullbox : ''
                const isDisplay = data[key].isDisplay ? data[key].isDisplay : ''
                arrayHomeProduct.push({
                    id: key,
                    name: name,
                    price: price,
                    comparePrice: comparePrice,
                    images: images,
                    newPercent: newPercent,
                    fullbox: fullbox,
                    isDisplay: isDisplay,
                })
            }
        })

    const currentList = [...arrayHomeProduct]
    const getDulieu = (fullbox, litmits) => {
        const arrFullbox = currentList?.filter(item => {
            if (fullbox === item.fullbox) {
                return item
            }
        })

        return arrFullbox.slice(0, litmits).map((item, idx) => {
            return (
                item?.isDisplay === '1' && (
                    <ProductItem
                        key={idx}
                        id={item.id}
                        name={item.name}
                        price={item.price}
                        comparePrice={item.compare_price}
                        images={item.images}
                        newPercent={item.newBox}
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
                    <h3>Forklift cũ</h3>
                </div>
                <ul className='collections__list'>{getDulieu(1, 15)}</ul>
            </div>
            <div className='home-collect02 container'>
                <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                    {loading && <Skeleton containerClassName='avatar-skeleton' className='page-title--seleketon' />}
                </SkeletonTheme>
                <div className='page-title' style={{ display: loading ? 'none' : undefined }}>
                    <h3>Forklift Mới</h3>
                </div>
                <ul className='collections__list'>{getDulieu(2, 15)}</ul>
            </div>
        </section>
    )
}

export default HomeProduct
