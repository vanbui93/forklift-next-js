import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Grid } from '@material-ui/core'
import FacebookIcon from '@mui/icons-material/Facebook'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import nextId, { setPrefix } from 'react-id-generator'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useDispatch, useSelector } from 'react-redux'
import methods from 'validator'
import { RULES } from '../../Route'
import { getCollection } from '../../store/actions/collection'
import { addContactInfo } from '../../store/actions/contact'
import { getMenu } from '../../store/actions/menu'

export default function Footer(props) {
    const { footerData } = props
    const collectAll = useSelector(state => state.collection.data)
    const menus = useSelector(state => state.menu.data)
    const router = useRouter()

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)
    useEffect(() => {
        setLoading(false)
    }, [menus])

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
        create_date: new Date().toString().replace(/GMT.*/g, ''),
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
        e.preventDefault()

        if (valiErrors().contact_email === '' && valiErrors().contact_message === '') {
            // thêm dữ liệu vào firebase
            setPrefix('')
            const keyAdd = nextId()
            dispatch(addContactInfo(contactData, Number(keyAdd)))

            setContactData({
                contact_email: '',
                contact_message: '',
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
        Object.keys(menus)?.filter(element => {
            const key = element
            if (menus[key] !== null && menus[key].link.includes('collections') === false) {
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
                                        <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                            {loading && (
                                                <Skeleton className='footer__top-span--seleketon footer__contact-text--seleketon' />
                                            )}
                                        </SkeletonTheme>
                                        <div
                                            className='footer__contact-text'
                                            style={{ display: loading ? 'none' : undefined }}
                                        >
                                            <a href={`tel:${footerData?.phone}`}>
                                                <FontAwesomeIcon
                                                    icon={faPhone}
                                                    style={{ fontSize: 20, color: '#333' }}
                                                />
                                            </a>
                                            <span>{footerData.footer_title?.footer_title_01}</span>
                                        </div>
                                    </Grid>
                                    <Grid item md={5} xs={12}>
                                        <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                            {loading && (
                                                <Skeleton className='footer__top-span--seleketon footer__contact-phone--seleketon' />
                                            )}
                                        </SkeletonTheme>
                                        <div
                                            className='footer__contact-phone'
                                            style={{ display: loading ? 'none' : undefined }}
                                        >
                                            <span>{footerData.footer_title?.footer_title_02}</span>
                                            <a href={`tel:${footerData?.phone}`}>{footerData?.phone}</a>
                                        </div>
                                    </Grid>
                                    <Grid item md={3} xs={12}>
                                        <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                            {loading && (
                                                <Skeleton className='footer__top-span--seleketon footer__contact-sale--seleketon' />
                                            )}
                                        </SkeletonTheme>
                                        <div
                                            className='footer__contact-sale-team'
                                            style={{ display: loading ? 'none' : undefined }}
                                        >
                                            <Button
                                                variant='contained'
                                                onClick={handleOpenModalContact}
                                                style={{
                                                    background: '#fff',
                                                }}
                                            >
                                                {footerData.footer_sub?.footer_sub_title_04}
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
                                        <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                            {loading && <Skeleton className='footer__content-logo--seleketon' />}
                                        </SkeletonTheme>
                                        <Link href='/'>
                                            <a style={{ display: loading ? 'none' : undefined }}>
                                                <img src={footerData.logo_img} alt='' />
                                            </a>
                                        </Link>
                                    </h2>
                                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                        {loading && (
                                            <Skeleton width={350} height={34} style={{ marginBottom: '10px' }} />
                                        )}
                                    </SkeletonTheme>
                                    <p
                                        className='footer__content-address'
                                        style={{ display: loading ? 'none' : undefined }}
                                    >
                                        <strong>ที่อยู่</strong>: {footerData?.address}
                                    </p>
                                    <div className='footer__content-sns'>
                                        <SkeletonTheme baseColor='#ccc' highlightColor='#fff'>
                                            {loading && <Skeleton width={35} height={35} />}
                                        </SkeletonTheme>
                                        <a
                                            href={footerData?.fanpage}
                                            target='_blank'
                                            rel='noopener noreferrer'
                                            style={{ display: loading ? 'none' : undefined }}
                                        >
                                            <FacebookIcon fontSize='large' color='red' />
                                        </a>
                                    </div>
                                </Grid>
                                <Grid item md={2} xs={12}>
                                    <h3>{footerData.footer_sub?.footer_sub_title_01}</h3>
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
                                    <h3>{footerData.footer_sub?.footer_sub_title_02}</h3>
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
                                    <h3>{footerData.footer_sub?.footer_sub_title_03}</h3>
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
                                                        value={contactData?.contact_email}
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
                                                        value={contactData?.contact_message}
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
