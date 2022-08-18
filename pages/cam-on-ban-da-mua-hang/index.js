import Head from 'next/head'
import { withRouter } from 'next/router'
import React from 'react'
import LayoutUser from '../../layouts/LayoutUser'
import numberWithCommas from '../../utils/numberWithComas'

function ThankYou(props) {
    const state = props.router.query
    return (
        <div>
            <Head>
                <title>Cảm ơn bạn đã mua hàng</title>
                <meta name='description' content='Tuấn táo apple - Cảm ơn bạn đã mua hàng' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <LayoutUser>
                <div className='thankyou'>
                    <h2 className='thankyou__title'>Thanh toán</h2>
                    <span className='checkout__message'>
                        <i className='fa fa-check-circle' aria-hidden='true'></i>Cảm ơn vì đã quan tâm đến sản phẩm của
                        chúng tôi. Bạn vui lòng đợi trong giây lát để hệ thống xử lý đơn hàng của bạn.
                    </span>
                    <div className='cart-icon'>
                        <label>
                            THÔNG TIN ĐƠN HÀNG SỐ <span className='text-orange'>{state.id_order}</span>
                        </label>
                    </div>
                    <div className='order-infomation'>
                        <h3>1. Thông tin người đặt hàng</h3>
                        <div className='thankyou__order'>
                            <div className='thankyou__name'>
                                <span>Họ tên: </span>
                                <span>{state.customer_name}</span>
                            </div>
                            <div className='thankyou__phone'>
                                <span>Điện thoại: </span>
                                <span>{state.customer_phone}</span>
                            </div>
                            <div className='thankyou__email'>
                                <span>Email: </span>
                                <span>{state.customer_email}</span>
                            </div>
                            <div className='thankyou__address'>
                                <span>Địa chỉ: </span>
                                <span>{state.customer_address}</span>
                            </div>
                            <div className='thankyou__address'>
                                <span>Ghi chú đặt hàng : </span>
                                <span>{state.customer_notes}</span>
                            </div>
                        </div>
                    </div>
                    <div className='order-infomation'>
                        <h3>2. Danh sách sản phẩm đặt hàng</h3>
                        <div className='thankyou__confirm'>
                            <div className='thankyou__product-name'>
                                <span className='thankyou__product-title'>Tên sản phẩm</span>
                                <span className='thankyou__product-content'>{state.product_name}</span>
                            </div>
                            <div className='thankyou__product-version'>
                                <span className='thankyou__product-title'>Phiên bản</span>
                                <span className='thankyou__product-content'>{state.product_sku}</span>
                            </div>
                            <div className='thankyou__product-color'>
                                <span className='thankyou__product-title'>Màu sắc</span>
                                <span className='thankyou__product-content'>{state.color_id}</span>
                            </div>
                            <div className='thankyou__product-color'>
                                <span className='thankyou__product-title'>Giá tiền</span>
                                <span className='thankyou__product-content text-red'>
                                    {state.product_price ? `${numberWithCommas(state.product_price)} đ` : 'Liên hệ'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </LayoutUser>
        </div>
    )
}

export default withRouter(ThankYou)
