import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PaginationButtons from '../../admin_components/Pagination'
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
        menus &&
        Object.values(menus)?.filter(item => {
            return item.link.split('/')[1] == collection
        })

    const arrayProduct = []
    products &&
        Object.keys(products)?.map((val, key) => {
            if (products[val] !== undefined && products[val].collection == collection) {
                const item = products[val]
                arrayProduct.push({
                    key: key,
                    id: val,
                    images: item.images,
                    name: item.name,
                    collection: item.collection,
                    isDisplay: item.isDisplay,
                    price: item.price,
                    comparePrice: item.comparePrice,
                })
            }
        })

    //Phân trang
    const allList = [...arrayProduct].sort(
        (a, b) => new Date(b.create_date) - new Date(a.create_date) || new Date(b.update_date) - new Date(a.update_date)
    )
    const totalLists = allList?.length
    const pageLimit = 20
    const [currentList, setCurrentList] = useState([])
    useEffect(() => {
        setCurrentList([...allList].slice(0, pageLimit))
    }, [products, collection])
    const onPageChanged = value => {
        let offset = (value - 1) * pageLimit
        const currentList = [...allList].slice(offset, offset + pageLimit)
        setCurrentList(currentList)
    }

    const getDulieu = collection => {
        return (
            currentList &&
            currentList?.map((item, key) => {
                if (collection === item.collection) {
                    return (
                        item?.isDisplay === '1' && (
                            <ProductItem
                                key={key}
                                id={item.id}
                                images={item.images}
                                name={item.name}
                                price={item.price}
                                comparePrice={item.compare_price}
                            />
                        )
                    )
                }
            })
        )
    }

    return (
        <div>
            <Head>
                <title>{colllectName[0]?.name}</title>
                <meta name='description' content='Tanat Service ForkLift - iPhone' />
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
                        <div className='blogs__pagination'>
                            <PaginationButtons
                                count={Math.ceil(totalLists / pageLimit)}
                                handleChangePage={value => {
                                    onPageChanged(value)
                                }}
                            />
                        </div>
                    </div>
                </div>
            </LayoutUser>
        </div>
    )
}
