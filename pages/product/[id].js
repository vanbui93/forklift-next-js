import { onValue, ref } from 'firebase/database'
import parse from 'html-react-parser'
import { useEffect, useState } from 'react'
import numberWithCommas from '../../utils/numberWithComas'
import { db } from './../../utils/firebase'

import { faShield } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb'
import LayoutUser from '../../layouts/LayoutUser'
import ProductRelated from './../../components/ProductRelated'
import ProductSlide from './../../components/ProductSlide'
import VideoReview from './../../components/VideoReview'
import { getProductDetail } from './../../store/actions/productDetail'
import { getPromotions } from './../../store/actions/promotions'
import { getVideo } from './../../store/actions/videos'
import { getWarantys } from './../../store/actions/warantys'

export default function ProductDetail(props) {
    const [warantys, setWarantys] = useState({})
    const [videos, setVideos] = useState({})
    const product = useSelector(state => state.product.data)
    const allPromotions = useSelector(state => state.promotions.data)
    const allWarantys = useSelector(state => state.warantys.data)
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

    useEffect(() => {
        dispatch(getWarantys())
    }, [])

    useEffect(() => {
        dispatch(getPromotions())
    }, [])

    // Lấy waranty từ bảng `warantys`
    useEffect(() => {
        const warantysRef = ref(db, `warantys`)
        onValue(warantysRef, snapshot => {
            if (snapshot.val() !== null) {
                setWarantys({ ...snapshot.val() })
            } else {
                setWarantys({})
            }
        })
        return () => {
            setWarantys({})
        }
    }, [])

    // video liên quan từ bảng `videos`
    useEffect(() => {
        const warantysRef = ref(db, `videos`)
        onValue(warantysRef, snapshot => {
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

    // Lọc bảo hành
    let dataWaranty = []
    if (product && Object(product.warantys).length > 0) {
        const productWaranty = product.warantys
        Object.values(warantys)?.filter(el => {
            return productWaranty?.some(f => {
                if (f.waranty_id === el.waranty_id) {
                    dataWaranty.push(el)
                }
            })
        })
    }

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
        router.push({
            pathname: '/checkout',
            query: {
                productName: product.name ? product.name : '',
                productPrice: product.price ? product.price : '',
                productNewBox: product.newBox ? product.newBox : '',
                productFullBox: product.fullbox ? product.fullbox : '',
                productPromotion: product.promotions ? product.promotions : [],
                productImage: getThumbnail(),
            },
        })
    }

    const ckPromotionIds =
        product &&
        product.promotions?.length &&
        product.promotions !== null &&
        product.promotions !== undefined &&
        product.promotions?.map(item => {
            if (item !== null) {
                return item.promotion_id
            }
        })

    const ckWarantyIds =
        product &&
        product.warantys?.length &&
        product.warantys !== null &&
        product.warantys !== undefined &&
        product.warantys?.map(item => {
            if (item !== null) {
                return item.waranty_id
            }
        })

    return (
        <div>
            <Head>
                <title>{`${product?.name}`}</title>
                <meta name='description' content={`Tuấn táo apple - ${product?.name}`} />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <LayoutUser>
                {product && (
                    <div className='product-detail'>
                        <div className='container'>
                            <BreadCrumb productName={product.name} category={product.category} />
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
                                                    ? `${numberWithCommas(product.price)} đ`
                                                    : `Liên hệ : ${mainData?.phone ? mainData?.phone : ''}`}
                                            </strong>
                                            &nbsp;&nbsp; | <i>Giá đã bao gồm 10% VAT</i>
                                        </div>
                                        <p className='product-detail__free-ship'>
                                            <span>Miễn phí vận chuyển toàn quốc</span>
                                        </p>
                                        {ckPromotionIds ? (
                                            <div className='product-detail__promotion'>
                                                <strong>KHUYẾN MÃI</strong>
                                                <ul className='promotion'>
                                                    {allPromotions !== null &&
                                                        allPromotions !== undefined &&
                                                        Object.values(allPromotions)?.map((ckPromotion, idx) => {
                                                            if (ckPromotionIds?.includes(ckPromotion.promotion_id)) {
                                                                return (
                                                                    <li className='promotion__item' key={idx}>
                                                                        <span className='bag'>KM {idx}</span>
                                                                        <span className='promotion__detail'>
                                                                            {ckPromotion.promotion_text}
                                                                        </span>
                                                                        <Link href='/xem-them-khuyen-mai'>
                                                                            <a className='promotion__link'>
                                                                                Xem thêm&gt;&gt;
                                                                            </a>
                                                                        </Link>
                                                                    </li>
                                                                )
                                                            }
                                                        })}
                                                </ul>
                                            </div>
                                        ) : (
                                            ''
                                        )}
                                        <div className='product-detail__purchase'>
                                            <div className='purchase'>
                                                <button
                                                    className='purchase__link'
                                                    data-sku='IPN11128G'
                                                    onClick={e => gotoCheckout(e)}
                                                >
                                                    <strong className='purchase__action'>MUA NGAY</strong>
                                                    <span> Giao tận nhà (COD) hoặc Nhận tại cửa hàng</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='product-detail__waranty'>
                                        <div className='waranty'>
                                            <h4 className='waranty__title'>Thông tin sản phẩm</h4>
                                            <div className='warranty__info'>
                                                {allWarantys?.map((item, idx) => {
                                                    if (ckWarantyIds?.includes(item.waranty_id)) {
                                                        return (
                                                            <div className='waranty__item' key={idx}>
                                                                <span className='waranty__icon'>
                                                                    <FontAwesomeIcon
                                                                        icon={faShield}
                                                                        style={{ color: '#515154' }}
                                                                    />
                                                                    <i className='fa fa-shield' aria-hidden='true'></i>
                                                                </span>
                                                                <p className='waranty__detail'>
                                                                    {parse(item.waranty_text)}
                                                                </p>
                                                            </div>
                                                        )
                                                    }
                                                })}
                                                <div className='waranty__item waranty__item--more'>
                                                    <Link href={'/page/chinh-sach-bao-hanh'}>
                                                        <a>
                                                            <br />
                                                            Xem chi tiết
                                                        </a>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='product-detail__related'>
                                    <div className='page-title'>
                                        <h3>Gợi ý cho bạn</h3>
                                    </div>
                                    <ProductRelated productCategory={product.category} />
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
