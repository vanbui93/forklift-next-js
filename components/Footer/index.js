import { ref, set } from '@firebase/database'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Grid } from '@material-ui/core'
import FacebookIcon from '@mui/icons-material/Facebook'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import nextId, { setPrefix } from 'react-id-generator'
import { useDispatch, useSelector } from 'react-redux'
import methods from 'validator'
import { RULES } from '../../Route'
import { getCollection } from '../../store/actions/collection'
import { getMenu } from '../../store/actions/menu'
import { db } from '../../utils/firebase'

export default function Footer(props) {
    const { footerData } = props
    const collectAll = useSelector(state => state.collection.data)
    const menus = useSelector(state => state.menu.data)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCollection())
    }, [])

    useEffect(() => {
        dispatch(getMenu())
    }, [])

    useEffect(() => {
        if (Object.keys(footerData)?.length > 0) {
            setLoading(false)
        }
    }, [footerData])

    const [contactData, setContactData] = useState({
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
        RULES.forEach(rule => {
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
        console.log(contactData)
        e.preventDefault()

        if (valiErrors().contact_email === '' && valiErrors().contact_message === '') {
            // thêm dữ liệu vào firebase
            setPrefix('')
            const keyAdd = nextId()
            set(ref(db, 'contact/' + Number(keyAdd)), {
                contact_email: contactData.contact_email,
                contact_message: contactData.contact_message,
                create_date: new Date().toString().replace(/GMT.*/g, ''),
            })
        } else {
            setErrorsMessage({
                ...valiErrors(),
            })
        }
    }

    const handleOpenModalContact = () => {
        router.push('/page/contact')
    }

    const arrayCollection = []
    collectAll !== null &&
        collectAll !== undefined &&
        Object.keys(collectAll)?.map(element => {
            const key = element
            if (collectAll[key] !== null) {
                const name = collectAll[key].name ? collectAll[key].name : ''
                const collection = collectAll[key].collection ? collectAll[key].collection : ''
                arrayCollection.push({
                    id: key,
                    name: name,
                    collection: collection,
                })
            }
        })

    const arrayMenu = []
    menus !== null &&
        menus !== undefined &&
        Object.keys(menus)?.map(element => {
            const key = element
            if (menus[key] !== null) {
                const name = menus[key].name ? menus[key].name : ''
                const link = menus[key].link ? menus[key].link : ''
                arrayMenu.push({
                    id: key,
                    name: name,
                    link: link,
                })
            }
        })

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
                                                <img src='../../assets/img/logo.png' alt='' />
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
                                        {arrayMenu?.map((item, idx) => {
                                            return (
                                                <li className='footer__link-item' key={idx}>
                                                    <Link href={`/${item.link}`}>
                                                        <a>{item.name}</a>
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </Grid>
                                <Grid item md={2} xs={12}>
                                    <h3>Products</h3>
                                    <ul className='footer__link_01'>
                                        {arrayCollection?.map((item, idx) => {
                                            return (
                                                <li className='footer__link-item' key={idx}>
                                                    <Link href={`/collections/${item.collection}`}>
                                                        <a>{item.name}</a>
                                                    </Link>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </Grid>
                                <Grid item md={4} xs={12}>
                                    <h3>CONTACT US TODAY</h3>
                                    <form action='/'>
                                        <div className='control-group'>
                                            <div className='contact__form-fullwidth'>
                                                <span>
                                                    <input
                                                        type='text'
                                                        name='contact_email'
                                                        className='contact__form-input'
                                                        placeholder='*Email'
                                                        required
                                                        onChange={e => handleOnChange(e)}
                                                    />
                                                </span>
                                                {errorsMessage.contact_email && (
                                                    <div className='errormessage'>{errorsMessage.contact_email}</div>
                                                )}
                                            </div>
                                        </div>
                                        <div className='control-group'>
                                            <div className='contact__form-fullwidth'>
                                                <span>
                                                    <textarea
                                                        type='text'
                                                        name='contact_message'
                                                        className='contact__form-input'
                                                        placeholder='*Message'
                                                        required
                                                        onChange={e => handleOnChange(e)}
                                                    />
                                                </span>
                                                {errorsMessage.contact_message && (
                                                    <div className='errormessage'>{errorsMessage.contact_message}</div>
                                                )}
                                            </div>
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
