import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LayoutUser from '../../layouts/LayoutUser'
import { getBlog } from '../../store/actions/blogs'
import { getProduct } from '../../store/actions/products'
import { getSlides } from '../../store/actions/slides'
import AboutUs from '../AboutUs'
import HomeProduct from '../HomeProduct'
import HomeSlide from '../HomeSlide'
import News from '../News'
import Service from '../Service'
function HomePage(props) {
    const dispatch = useDispatch()
    const products = useSelector(state => state.products.data)
    const allSlides = useSelector(state => state.slides.data)
    const newsData = useSelector(state => state.blog.data)

    useEffect(() => {
        dispatch(getProduct())
    }, [])

    useEffect(() => {
        dispatch(getBlog())
    }, [])

    useEffect(() => {
        dispatch(getProduct())
    }, [])

    useEffect(() => {
        dispatch(getSlides())
    }, [])

    return (
        <LayoutUser>
            <HomeSlide slideImage={allSlides} />
            <HomeProduct products={products} />
            <AboutUs />
            <Service />
            <News newsData={newsData} />
        </LayoutUser>
    )
}
HomePage.layout = 'L1'
export default HomePage
