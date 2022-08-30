import { onValue, ref } from 'firebase/database'
import { useEffect, useState } from 'react'
import { db } from './../../utils/firebase'

import parse from 'html-react-parser'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb'
import LayoutUser from '../../layouts/LayoutUser'
import { numberInputFormat } from '../../utils/numberInputFormat'
import ProductRelated from './../../components/ProductRelated'
import ProductSlide from './../../components/ProductSlide'
import VideoReview from './../../components/VideoReview'
import { getProductDetail } from './../../store/actions/productDetail'
import { getVideo } from './../../store/actions/videos'

export default function ProductDetail(props) {
    const [videos, setVideos] = useState({})
    const product = useSelector(state => state.product.data)
    const mainData = useSelector(state => state.main.data)
    const router = useRouter()
    const { id } = router.query

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductDetail(id))
    }, [id])

    useEffect(() => {
        dispatch(getVideo())
    }, [])

    // video liên quan từ bảng `videos`
    useEffect(() => {
        const videosRef = ref(db, `videos`)
        onValue(videosRef, snapshot => {
            if (snapshot.val() !== null) {
                setVideos({ ...snapshot.val() })
            } else {
                setVideos({})
            }
        })
        return () => {
            setVideos({})
        }
    }, [])

    // Lọc video
    let dataVideo = []
    if (product && Object(product.videos).length > 0) {
        const productVideo = product.videos
        Object.values(videos)?.filter(el => {
            if (el) {
                return productVideo?.some(f => {
                    if (f.video_id === el.video_id) {
                        dataVideo.push(el)
                    }
                })
            }
        })
    }

    const getThumbnail = () => {
        let imgThumb = product.images
        const img = []
        Object.values(imgThumb)?.map(item => {
            if (item !== null) {
                img.push(item)
            }
        })
        return img[0]
    }

    //Đi tới trang giỏ hàng
    const gotoCheckout = e => {
        e.preventDefault()
        router.push(
            {
                pathname: '/checkout',
                query: {
                    productName: product.name ? product.name : '',
                    productPrice: product.price ? product.price : '',
                    productImage: getThumbnail(),
                },
            },
            '/checkout'
        )
    }

    const isShortDes = product?.content?.includes('|||')

    return (
        <div>
            <Head>
                <title>{`${product?.name}`}</title>
                <meta name='description' content={`Tanat Service ForkLift - ${product?.name}`} />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <LayoutUser>
                {product && (
                    <div className='product-detail'>
                        <div className='container'>
                            <BreadCrumb productName={product.name} collection={product.collection} />
                            <h2 className='product-detail__title'>{product.name}</h2>
                            <div className='product-detail__content'>
                                <div className='product-detail__info'>
                                    <div className='product-detail__images'>
                                        <ProductSlide productImages={product.images} />
                                    </div>
                                    <div className='product-detail__variant'>
                                        <div className='product-detail__current-price'>
                                            <strong>
                                                {product.price
                                                    ? `${numberInputFormat(product.price.toString())} Bath`
                                                    : `Liên hệ : ${mainData?.phone ? mainData?.phone : ''}`}
                                            </strong>
                                        </div>
                                        <p className='product-detail__free-ship'>
                                            <span>Miễn phí vận chuyển toàn quốc</span>
                                        </p>
                                        <div className='product-detail__purchase'>
                                            <div className='purchase'>
                                                <button
                                                    className='purchase__link'
                                                    data-sku='IPN11128G'
                                                    onClick={e => gotoCheckout(e)}
                                                >
                                                    <strong className='purchase__action'>MUA NGAY</strong>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='product-detail__short-des'>
                                        {isShortDes ? parse(product?.content.split('|||')[0]) : ''}
                                    </div>
                                </div>
                                <div className='product-detail__long-des'>
                                    {isShortDes ? parse(product?.content.split('|||')[1]) : parse(product?.content)}
                                </div>
                                <div className='product-detail__related'>
                                    <div className='page-title'>
                                        <h3>Gợi ý cho bạn</h3>
                                    </div>
                                    <ProductRelated productCollection={product.collection} />
                                </div>
                                <VideoReview dataVideo={dataVideo} productName={product.name} />
                            </div>
                        </div>
                    </div>
                )}
            </LayoutUser>
        </div>
    )
}
