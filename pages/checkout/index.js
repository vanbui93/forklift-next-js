import { ref, set } from 'firebase/database'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter, withRouter } from 'next/router'
import { useState } from 'react'
import methods from 'validator'
import LayoutUser from '../../layouts/LayoutUser'
import { db } from '../../utils/firebase'
import { numberInputFormat } from '../../utils/numberInputFormat'

function Checkout(props) {
    const state = props.router.query
    const [orderData, setOrderData] = useState({
        id: '',
        customer_name: '',
        customer_address: '',
        customer_city: '',
        customer_phone: '',
        customer_email: '',
        customer_notes: '',
    })

    const rules = [
        {
            field: 'customer_name',
            method: 'isEmpty',
            validWhen: false,
            message: 'Vui lòng nhập tên',
        },
        {
            field: 'customer_name',
            method: 'isLength',
            args: [{ min: 2 }],
            validWhen: true,
            message: 'Tên tối thiếu 2 kí tự',
        },
        {
            field: 'customer_phone',
            method: 'isEmpty',
            validWhen: false,
            message: 'Vui lòng nhập số điện thoại',
        },
        {
            field: 'customer_phone',
            method: 'isNumeric',
            validWhen: true,
            message: 'Số điện thoại phải là số',
        },
        {
            field: 'customer_phone',
            method: 'isLength',
            args: [{ min: 10 }],
            validWhen: true,
            message: 'Số điện thoại phải tối thiểu 10 kí tự',
        },
        {
            field: 'customer_address',
            method: 'isEmpty',
            validWhen: false,
            message: 'Vui lòng nhập địa chỉ',
        },
        {
            field: 'customer_city',
            method: 'isEmpty',
            validWhen: false,
            message: 'Vui lòng nhập tỉnh/ Thành phố',
        },
    ]

    const [errorsMessage, setErrorsMessage] = useState({
        customer_name: '',
        customer_address: '',
        customer_city: '',
        customer_phone: '',
    })

    // Lấy giá trị của form
    const handleOnChange = e => {
        let name = e.target.name
        let value = e.target.value
        setOrderData({
            ...orderData,
            [name]: value,
        })

        setFieldValue({
            ...fieldValue,
            [name]: value,
        })

        setErrorsMessage({
            customer_name: fieldValue.customer_name !== '' ? '' : errorsMessage.customer_name,
            customer_address: fieldValue.customer_address !== '' ? '' : errorsMessage.customer_address,
            customer_city: fieldValue.customer_city !== '' ? '' : errorsMessage.customer_city,
            customer_phone: fieldValue.customer_phone !== '' ? '' : errorsMessage.customer_phone,
        })
    }

    const timeStamp = Math.floor(Date.now() / 1000)
    const key = timeStamp
    const router = useRouter()

    const handleCheckOut = e => {
        e.preventDefault()

        if (
            valiErrors().customer_name === '' &&
            valiErrors().customer_address === '' &&
            valiErrors().customer_city === '' &&
            valiErrors().customer_phone === ''
        ) {
            // thêm dữ liệu vào firebase
            set(ref(db, 'order/' + key), {
                product_image: state.productImage ? state.productImage : '',
                product_name: state.productName ? state.productName : '',
                product_price: state.productPrice ? state.productPrice : '',
                customer_name: orderData.customer_name ? orderData.customer_name : '',
                customer_address: orderData.customer_address ? orderData.customer_address : '',
                customer_city: orderData.customer_city ? orderData.customer_city : '',
                customer_phone: orderData.customer_phone ? orderData.customer_phone : '',
                customer_email: orderData.customer_email ? orderData.customer_email : '',
                customer_notes: orderData.customer_notes ? orderData.customer_notes : '',
                create_date: new Date().toString().replace(/GMT.*/g, ''),
            })

            router.push(
                {
                    pathname: '/thanks-for-your-order',
                    query: {
                        id_order: key,
                        product_image: state.productImage,
                        product_name: state.productName,
                        product_price: state.productPrice,
                        customer_name: orderData.customer_name,
                        customer_address: orderData.customer_address,
                        customer_city: orderData.customer_city,
                        customer_phone: orderData.customer_phone,
                        customer_email: orderData.customer_email,
                        customer_notes: orderData.customer_notes,
                        create_date: orderData.create_date,
                    },
                },
                '/thanks-for-your-order'
            )
        } else {
            setErrorsMessage({
                ...valiErrors(),
            })
        }
    }

    const [fieldValue, setFieldValue] = useState({
        customer_name: '',
        customer_address: '',
        customer_city: '',
        customer_phone: '',
        customer_email: '',
    })

    let isValid = true
    const valiErrors = () => {
        rules.forEach(rule => {
            if (errorsMessage[rule.field]) return

            const fieldVal = fieldValue[rule.field] || ''
            const args = rule.args || []
            const validationMethod = typeof rule.method === 'string' ? methods[rule.method] : rule.method

            if (validationMethod(fieldVal, ...args) !== rule.validWhen) {
                isValid = false
                errorsMessage[rule.field] = rule.message

                setErrorsMessage({
                    ...errorsMessage,
                    [rule.field]: rule.message,
                })
            }
        })
        return errorsMessage
    }

    return (
        <div>
            <Head>
                <title>Payment</title>
                <meta name='description' content='Tanat Service ForkLift - Payment' />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <LayoutUser>
                <div className='checkout'>
                    <div className='container'>
                        <div className='checkout__wrap'>
                            <h2 className='checkout__title'>คำสั่งของคุณ</h2>
                            <span className='checkout__message'>
                                <i className='fa fa-check-circle' aria-hidden='true'></i>
                                เพิ่ม {state.productName} ลงในรถเข็นแล้ว ขอบคุณที่เลือกเรา!
                            </span>
                            <form action='/' name='checkout' method='post' className=''>
                                <div className='checkout__inner'>
                                    <div className='checkout__product'>
                                        <div className='checkout__product-wrap'>
                                            <div className='checkout__product-thumbnail'>
                                                <span className='checkout__product-title'></span>
                                                <span>
                                                    <Link href='/'>
                                                        <img src={state?.productImage} alt='' />
                                                    </Link>
                                                </span>
                                            </div>
                                            <div className='checkout__product-name'>
                                                <span className='checkout__product-title'>ผลิตภัณฑ์</span>
                                            </div>
                                            <div className='checkout__product-price'>
                                                <span className='checkout__product-title'>ชั่วคราว</span>
                                                <span>
                                                    {state.productPrice
                                                        ? `${numberInputFormat(state.productPrice?.toString())} Bath`
                                                        : 'Liên hệ'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='checkout__total'>
                                        <div className='checkout__total-inner'>
                                            <h3 className='checkout__total-title'>Order infomation</h3>
                                            <div className='customer__info'>
                                                <div>
                                                    <label>
                                                        ชื่อและนามสกุล <span className='checkout__asterisk'>*</span>
                                                    </label>
                                                    <span>
                                                        <input
                                                            type='text'
                                                            name='customer_name'
                                                            className='customer__input'
                                                            value={orderData.customer_name}
                                                            autoComplete='off'
                                                            onChange={e => handleOnChange(e)}
                                                        />
                                                    </span>
                                                    {errorsMessage.customer_name && (
                                                        <div className='validation'>{errorsMessage.customer_name}</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <label>
                                                        Address, Ward, District{' '}
                                                        <span className='checkout__asterisk'>*</span>
                                                    </label>
                                                    <span>
                                                        <input
                                                            type='text'
                                                            name='customer_address'
                                                            className='customer__input'
                                                            value={orderData.customer_address}
                                                            autoComplete='off'
                                                            onChange={e => handleOnChange(e)}
                                                        />
                                                    </span>
                                                    {errorsMessage.customer_address && (
                                                        <div className='validation'>
                                                            {errorsMessage.customer_address}
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <label>
                                                        Province/City <span className='checkout__asterisk'>*</span>
                                                    </label>
                                                    <span>
                                                        <input
                                                            type='text'
                                                            name='customer_city'
                                                            className='customer__input'
                                                            value={orderData.customer_city}
                                                            autoComplete='off'
                                                            onChange={e => handleOnChange(e)}
                                                        />
                                                    </span>
                                                    {errorsMessage.customer_city && (
                                                        <div className='validation'>{errorsMessage.customer_city}</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <label>
                                                        Phone Number <span className='checkout__asterisk'>*</span>
                                                    </label>
                                                    <span>
                                                        <input
                                                            type='text'
                                                            name='customer_phone'
                                                            className='customer__input'
                                                            value={orderData.customer_phone}
                                                            autoComplete='off'
                                                            onChange={e => handleOnChange(e)}
                                                        />
                                                    </span>
                                                    {errorsMessage.customer_phone && (
                                                        <div className='validation'>{errorsMessage.customer_phone}</div>
                                                    )}
                                                </div>
                                                <div>
                                                    <label>Email</label>
                                                    <span>
                                                        <input
                                                            type='text'
                                                            name='customer_email'
                                                            className='customer__input'
                                                            value={orderData.customer_email}
                                                            autoComplete='off'
                                                            onChange={e => handleOnChange(e)}
                                                        />
                                                    </span>
                                                </div>
                                                <div>
                                                    <label>Note (option)</label>
                                                    <span>
                                                        <textarea
                                                            type='text'
                                                            name='customer_notes'
                                                            className='customer__input'
                                                            value={orderData.customer_notes}
                                                            onChange={e => handleOnChange(e)}
                                                        />
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='order-button'>
                                    <button type='button' onClick={handleCheckOut}>
                                        Purchase
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </LayoutUser>
        </div>
    )
}
export default withRouter(Checkout)
