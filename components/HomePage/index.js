import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LayoutUser from '../../layouts/LayoutUser'
import { getComments } from '../../store/actions/cmt'
import { getMain } from '../../store/actions/main'
import { getProduct } from '../../store/actions/products'
import { getPromotions } from '../../store/actions/promotions'
import CoreValue from '../CoreValue'
import CustomerCmt from '../CustomerCmt'
import HomeProduct from '../HomeProduct'
function HomePage() {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.data)
    const cmts = useSelector(state => state.cmt.data)
    const mainData = useSelector(state => state.main.data)

    useEffect(() => {
        dispatch(getProduct())
    }, [])

    useEffect(() => {
        dispatch(getProduct())
    }, [])

    useEffect(() => {
        dispatch(getPromotions())
    }, [])

    useEffect(() => {
        dispatch(getComments())
    }, [])

    useEffect(() => {
        dispatch(getMain())
    }, [])

    return (
        <LayoutUser>
            <HomeProduct products={products} />
            <CustomerCmt comments={cmts} />
            <CoreValue coreValue={mainData} />
        </LayoutUser>
    )
}
HomePage.layout = 'L1'
export default HomePage
