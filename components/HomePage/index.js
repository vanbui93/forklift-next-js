import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LayoutUser from '../../layouts/LayoutUser'
import { getProduct } from '../../store/actions/products'
import { getPromotions } from '../../store/actions/promotions'
import { getSlides } from '../../store/actions/slides'
import HomeProduct from '../HomeProduct'
import HomeSlide from '../HomeSlide'
function HomePage(props) {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.data)
    const allSlides = useSelector(state => state.slides.data)

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

    return (
        <LayoutUser>
            <HomeSlide slideImage={allSlides} />
            <HomeProduct products={products} />
        </LayoutUser>
    )
}
HomePage.layout = 'L1'
export default HomePage
