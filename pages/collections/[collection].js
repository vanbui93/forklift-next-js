import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductItem from '../../components/ProductItem'
import LayoutUser from '../../layouts/LayoutUser'
import { getMenu } from '../../store/actions/menu'
import { getProduct } from '../../store/actions/products'

export default function Collections() {
    const products = useSelector(state => state.products.data)
    const menus = useSelector(state => state.menu.data)

    const dispatch = useDispatch()
    const router = useRouter()
    const { collection } = router.query

    useEffect(() => {
        dispatch(getProduct())
    }, [])

    useEffect(() => {
        dispatch(getMenu())
    }, [])

    const colllectName =
        menus.length &&
        menus?.filter(item => {
            return item.link.split('/')[1] == collection
        })

    const currentPage =
        products !== null &&
        products !== undefined &&
        Object.values(products)?.find(collect => collect.collection === collection)

    const getDulieu = collection => {
        return (
            products &&
            Object.keys(products)?.map((val, key) => {
                if (collection === products[val].collection) {
                    return (
                        products[val]?.isDisplay === '1' && (
                            <ProductItem
                                key={key}
                                id={val}
                                images={products[val].images}
                                name={products[val].name}
                                price={products[val].price}
                                comparePrice={products[val].compare_price}
                            />
                        )
                    )
                }
            })
        )
    }

    return (
        currentPage?.isDisplay === '1' && (
            <div>
                <Head>
                    <title>{colllectName[0]?.name}</title>
                    <meta name='description' content='Tuấn táo apple - iPhone' />
                    <meta
                        name='viewport'
                        content='width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0'
                    />
                    <link rel='icon' href='/favicon.ico' />
                </Head>
                <LayoutUser>
                    <div className='collections'>
                        <div className='container'>
                            <h2 className='collection__title'>{colllectName[0]?.name}</h2>
                            <ul className='collections__list'>{getDulieu(collection)}</ul>
                        </div>
                    </div>
                </LayoutUser>
            </div>
        )
    )
}
