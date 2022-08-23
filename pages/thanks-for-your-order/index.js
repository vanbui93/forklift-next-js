import Head from 'next/head'
import { withRouter } from 'next/router'
import React from 'react'
import LayoutUser from '../../layouts/LayoutUser'
import { numberInputFormat } from '../../utils/numberInputFormat'

function ThankYou(props) {
    const state = props.router.query
    return (
        <div>
            <Head>
                <title>Tanat Service ForkLift ธนัท เซอร์วิส ซื้อ ขาย เช่า โฟล์ค ลิฟท์ กิ่งแก้ว</title>
                <meta
                    name='description'
                    content='Tanat Service ForkLift ธนัท เซอร์วิส ซื้อ ขาย เช่า โฟล์ค ลิฟท์ กิ่งแก้ว - Thank you for your purchase'
                />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <LayoutUser>
                <div className='thankyou'>
                    <h2 className='thankyou__title'>Payment</h2>
                    <span className='checkout__message'>
                        <i className='fa fa-check-circle' aria-hidden='true'></i>Thanks for your interest in our
                        products. Please wait a moment for the system to process your order.
                    </span>
                    <div className='cart-icon'>
                        <label>
                            Order code <span className='text-orange'>{state.id_order}</span>
                        </label>
                    </div>
                    <div className='order-infomation'>
                        <h3>1. Ordering information</h3>
                        <div className='thankyou__order'>
                            <div className='thankyou__name'>
                                <span>Full name: </span>
                                <span>{state.customer_name}</span>
                            </div>
                            <div className='thankyou__phone'>
                                <span>Phone Number: </span>
                                <span>{state.customer_phone}</span>
                            </div>
                            <div className='thankyou__email'>
                                <span>Email: </span>
                                <span>{state.customer_email}</span>
                            </div>
                            <div className='thankyou__address'>
                                <span>Address: </span>
                                <span>{state.customer_address}</span>
                            </div>
                            <div className='thankyou__address'>
                                <span>Order Notes : </span>
                                <span>{state.customer_notes}</span>
                            </div>
                        </div>
                    </div>
                    <div className='order-infomation'>
                        <h3>2. Ordered product list</h3>
                        <div className='thankyou__confirm'>
                            <div className='thankyou__product-name'>
                                <span className='thankyou__product-title'>Product's name</span>
                                <span className='thankyou__product-content'>{state.product_name}</span>
                            </div>
                            <div className='thankyou__product-color'>
                                <span className='thankyou__product-title'>Price</span>
                                <span className='thankyou__product-content text-red'>
                                    {state.product_price
                                        ? `${numberInputFormat(state.product_price.toString())} Bath`
                                        : 'Liên hệ'}
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
