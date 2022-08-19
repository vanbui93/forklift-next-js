import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LayoutUser from '../../layouts/LayoutUser'
import { getComments } from '../../store/actions/cmt'
import { getProduct } from '../../store/actions/products'
import { getPromotions } from '../../store/actions/promotions'
import { getSlides } from '../../store/actions/slides'
import CoreValue from '../CoreValue'
import CustomerCmt from '../CustomerCmt'
import HomeProduct from '../HomeProduct'
import HomeSlide from '../HomeSlide'
function HomePage(props) {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.data)
    const allSlides = useSelector(state => state.slides.data)
    const cmts = useSelector(state => state.cmt.data)
    const { mainData } = props

    useEffect(() => {
        dispatch(getProduct())
    }, [])

    useEffect(() => {
        dispatch(getProduct())
    }, [])

    useEffect(() => {
        dispatch(getSlides())
    }, [])

    useEffect(() => {
        dispatch(getPromotions())
    }, [])

    useEffect(() => {
        dispatch(getComments())
    }, [])

    return (
        <LayoutUser>
            <HomeSlide slideImage={allSlides} />
            <HomeProduct products={products} />
            <CustomerCmt comments={cmts} />
            <CoreValue coreValue={mainData} />
        </LayoutUser>
    )
}
HomePage.layout = 'L1'
export default HomePage
