import { ref } from '@firebase/database'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Grid } from '@material-ui/core'
import FacebookIcon from '@mui/icons-material/Facebook'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import methods from 'validator'

export default function Footer(props) {
    const { footerData } = props
    const [loading, setLoading] = useState(true)

    const rules = [
        {
            field: 'contact_email',
            method: 'isEmpty',
            validWhen: false,
            message: 'This field is required',
        },
        {
            field: 'contact_message',
            method: 'isEmpty',
            validWhen: false,
            message: 'This field is required',
        },
    ]

    useEffect(() => {
        if (Object.keys(footerData)?.length > 0) {
            setLoading(false)
        }
    }, [footerData])

    const [contactData, setContactData] = useState({
        id: '',
        contact_email: '',
        contact_message: '',
    })

    const [errorsMessage, setErrorsMessage] = useState({
        contact_email: '',
        contact_message: '',
    })

    const [fieldValue, setFieldValue] = useState({
        contact_email: '',
        contact_message: '',
    })

    // Lấy giá trị của form
    const handleOnChange = e => {
        let name = e.target.name
        let value = e.target.value
        setContactData({
            ...contactData,
            [name]: value,
        })

        setFieldValue({
            ...fieldValue,
            [name]: value,
        })

        setErrorsMessage({
            contact_email: fieldValue.contact_email !== '' ? '' : errorsMessage.contact_email,
            contact_message: fieldValue.contact_message !== '' ? '' : errorsMessage.contact_message,
        })
    }

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

    const handleSubmitContact = e => {
        e.preventDefault()

        if (valiErrors().contact_email === '' && valiErrors().contact_message === '') {
            // thêm dữ liệu vào firebase
            set(ref(db, 'contact/' + key), {
                product_image: state.contact_email ? state.contact_email : '',
                product_name: state.contact_message ? state.contact_message : '',
                create_date: new Date().toString().replace(/GMT.*/g, ''),
            })
        } else {
            setErrorsMessage({
                ...valiErrors(),
            })
        }
    }

    const handleOpenModalContact = () => {}

    return (
        <footer className='footer'>
            <div className='container-fluid'>
                <div className='footer__area'>
                    <div className='footer__contact'>
                        <div className='container'>
                            <div className='footer__contact-inner'>
                                <Grid container spacing={2} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Grid item md={4} xs={12}>
                                        <div className='footer__contact-text'>
                                            <a href={`tel:0987777777`}>
                                                <FontAwesomeIcon
                                                    icon={faPhone}
                                                    style={{ fontSize: 20, color: '#333' }}
                                                />
                                            </a>
                                            <span>FOR ANY HELP OR QUERIES</span>
                                        </div>
                                    </Grid>
                                    <Grid item md={5} xs={12}>
                                        <div className='footer__contact-phone'>
                                            <span>Call Us Now On</span>
                                            <a href={`tel:0987777777`}> 0086-510-68937216</a>
                                        </div>
                                    </Grid>
                                    <Grid item md={3} xs={12}>
                                        <div className='footer__contact-sale-team'>
                                            <Button
                                                variant='contained'
                                                onClick={handleOpenModalContact}
                                                style={{
                                                    background: '#fff',
                                                }}
                                            >
                                                Contact Sales Team
                                            </Button>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>
                    <div className='footer__content'>
                        <div className='container'>
                            <Grid container spacing={2} style={{ display: 'flex' }}>
                                <Grid item md={4} xs={12}>
                                    <h2 className='footer__content-logo'>
                                        <Link href='/'>
                                            <a>
                                                <img src='../../assets/img/logo_footer.png' alt='' />
                                            </a>
                                        </Link>
                                    </h2>
                                    <p className='footer__content-address'>
                                        <strong>Address</strong>: No.369 Changhong Road, Yaoguan Town , Wujin District ,
                                        Changzhou 213102 , Jiangsu ,P.R.China
                                    </p>
                                    <div className='footer__content-sns'>
                                        <Link href='/'>
                                            <a>
                                                <FacebookIcon fontSize='large' color='red' />
                                            </a>
                                        </Link>
                                    </div>
                                </Grid>
                                <Grid item md={2} xs={12}>
                                    <h3>QUICK LINKS</h3>
                                    <ul className='footer__link_01'>
                                        <li className='footer__link-item'>
                                            <Link href='/'>
                                                <a>About Us</a>
                                            </Link>
                                        </li>
                                        <li className='footer__link-item'>
                                            <Link href='/'>
                                                <a>Products</a>
                                            </Link>
                                        </li>
                                        <li className='footer__link-item'>
                                            <Link href='/'>
                                                <a>FAQ</a>
                                            </Link>
                                        </li>
                                        <li className='footer__link-item'>
                                            <Link href='/'>
                                                <a>Contact Us</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </Grid>
                                <Grid item md={2} xs={12}>
                                    <h3>Products</h3>
                                    <ul className='footer__link_01'>
                                        <li className='footer__link-item'>
                                            <Link href='/'>
                                                <a>Pallet Trucks</a>
                                            </Link>
                                        </li>
                                        <li className='footer__link-item'>
                                            <Link href='/'>
                                                <a>Pallet Stacker</a>
                                            </Link>
                                        </li>
                                        <li className='footer__link-item'>
                                            <Link href='/'>
                                                <a>Lift Tables</a>
                                            </Link>
                                        </li>
                                        <li className='footer__link-item'>
                                            <Link href='/'>
                                                <a>Others</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <h3>CONTACT US TODAY</h3>
                                    <form action='/'>
                                        <div>
                                            <span>
                                                <input
                                                    type='text'
                                                    name='contact_email'
                                                    className='footer__contact-input'
                                                    required
                                                    onChange={e => handleOnChange(e)}
                                                />
                                            </span>
                                            {errorsMessage.contact_email && (
                                                <div className='errormessage'>{errorsMessage.contact_email}</div>
                                            )}
                                        </div>
                                        <div>
                                            <span>
                                                <textarea
                                                    type='text'
                                                    name='contact_message'
                                                    className='footer__contact-input footer__contact-text-area'
                                                    required
                                                    onChange={e => handleOnChange(e)}
                                                />
                                            </span>
                                            {errorsMessage.contact_message && (
                                                <div className='errormessage'>{errorsMessage.contact_message}</div>
                                            )}
                                        </div>
                                        <Button
                                            variant='contained'
                                            onClick={handleSubmitContact}
                                            style={{
                                                color: '#fff',
                                                backgroundColor: '#ec971f',
                                                borderColor: '#d58512',
                                            }}
                                        >
                                            Submit
                                        </Button>
                                    </form>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    <div className='footer__copy-right'>
                        <div className='container'>
                            <div className='copyright'>
                                <p>
                                    Copyright © 2022 <span>Van Bui vancntt35b@gmail.com</span>. All rights reserved.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
