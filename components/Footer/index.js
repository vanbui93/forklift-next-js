import { faPhone } from '@fortawesome/free-solid-svg-icons'
import FacebookIcon from '@mui/icons-material/Facebook'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button, Grid } from '@material-ui/core'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
export default function Footer(props) {
    const { footerData } = props
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (Object.keys(footerData)?.length > 0) {
            setLoading(false)
        }
    }, [footerData])

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
        setOrderData({
            ...orderData,
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

    const handleSubmitContact = () => {}

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
                                            <span>Contact Sales Team</span>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </div>
                    </div>
                    <div className='footer__content'>
                        <div className='container'>
                            <Grid container spacing={2} style={{ display: 'flex' }}>
                                <Grid item md={4}>
                                    <h2 className='footer__content-logo'>
                                        <img src='../../assets/img/logo_footer.png' alt='' />
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
                                <Grid item md={2}>
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
                                <Grid item md={2}>
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
                                <Grid item md={4}>
                                    <h3>CONTACT US TODAY</h3>
                                    <form action='/'>
                                        <div>
                                            <span>
                                                <input
                                                    type='text'
                                                    name='contact_email'
                                                    className='customer__input'
                                                    required
                                                    onChange={e => handleOnChange(e)}
                                                />
                                            </span>
                                            {errorsMessage.customer_name && (
                                                <div className='validation'>{errorsMessage.customer_name}</div>
                                            )}
                                        </div>
                                        <div>
                                            <span>
                                                <textarea
                                                    type='text'
                                                    name='contact_message'
                                                    className='customer__input'
                                                    required
                                                    onChange={e => handleOnChange(e)}
                                                />
                                            </span>
                                        </div>
                                        <Button variant='contained' onClick={handleSubmitContact}>
                                            Submit
                                        </Button>
                                    </form>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                    {/* <div className='container'>
                        {footerData && (
                            <div className='footer__inner'>
                                <div className='footer__col'>
                                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                        {loading && (
                                            <Skeleton
                                                width={250}
                                                height={22}
                                                style={{ marginRight: '20px' }}
                                                containerClassName='avatar-skeleton'
                                            />
                                        )}
                                    </SkeletonTheme>
                                    <h3 style={{ display: loading ? 'none' : undefined }}>
                                        {footerData.footer_title?.footer_title_01}
                                    </h3>
                                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                        {loading && (
                                            <Skeleton
                                                width={250}
                                                height={16}
                                                style={{ marginRight: '20px' }}
                                                containerClassName='avatar-skeleton'
                                                count={4}
                                            />
                                        )}
                                    </SkeletonTheme>
                                    <ul className='footer__list' style={{ display: loading ? 'none' : undefined }}>
                                        <li className='footer__item'>
                                            <Link href={`/page/${footerData.footer_sub?.link_01}`}>
                                                <a>{footerData.footer_sub?.text_01}</a>
                                            </Link>
                                        </li>
                                        <li className='footer__item'>
                                            <Link href={`/page/${footerData.footer_sub?.link_02}`}>
                                                <a>{footerData.footer_sub?.text_02}</a>
                                            </Link>
                                        </li>
                                        <li className='footer__item'>
                                            <Link href={`/page/${footerData.footer_sub?.link_03}`}>
                                                <a>{footerData.footer_sub?.text_03}</a>
                                            </Link>
                                        </li>
                                        <li className='footer__item'>
                                            <Link href={`/page/${footerData.footer_sub?.link_04}`}>
                                                <a>{footerData.footer_sub?.text_04}</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className='footer__col'>
                                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                        {loading && (
                                            <Skeleton
                                                width={250}
                                                height={22}
                                                style={{ marginRight: '20px' }}
                                                containerClassName='avatar-skeleton'
                                            />
                                        )}
                                    </SkeletonTheme>
                                    <h3 style={{ display: loading ? 'none' : undefined }}>
                                        {footerData.footer_title?.footer_title_02}
                                    </h3>
                                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                        {loading && (
                                            <Skeleton
                                                width={250}
                                                height={16}
                                                style={{ marginRight: '20px' }}
                                                containerClassName='avatar-skeleton'
                                                count={2}
                                            />
                                        )}
                                    </SkeletonTheme>
                                    <ul className='footer__list' style={{ display: loading ? 'none' : undefined }}>
                                        <li className='footer__item'>
                                            <a href={`tel: ${footerData?.phone}`}>
                                                <span>Hotline</span>: {footerData?.phone}
                                            </a>
                                        </li>
                                        <li className='footer__item'>
                                            <span>Địa chỉ :</span> {footerData?.address}
                                        </li>
                                    </ul>
                                </div>
                                <div className='footer__col payment'>
                                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                        {loading && (
                                            <Skeleton
                                                width={250}
                                                height={22}
                                                style={{ marginRight: '20px' }}
                                                containerClassName='avatar-skeleton'
                                            />
                                        )}
                                    </SkeletonTheme>
                                    <h3 style={{ display: loading ? 'none' : undefined }}>
                                        {footerData.footer_title?.footer_title_03}
                                    </h3>
                                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                        {loading && (
                                            <Skeleton
                                                width={250}
                                                height={16}
                                                style={{ marginRight: '20px' }}
                                                containerClassName='avatar-skeleton'
                                                count={3}
                                            />
                                        )}
                                    </SkeletonTheme>
                                    <ul className='payment__logo' style={{ display: loading ? 'none' : undefined }}>
                                        <li className='payment__item'>
                                            <img src={'/assets/img/logo-visa.png'} />
                                            <img src={'../assets/img/logo-master.png'} />
                                        </li>
                                        <li className='payment__item'>
                                            <img src={'/assets/img/logo-jcb.png'} />
                                            <img src={'/assets/img/logo-samsungpay.png'} />
                                        </li>
                                        <li className='payment__item'>
                                            <img src={'/assets/img/logo-atm.png'} />
                                            <img src={'/assets/img/logo-vnpay.png'} />
                                        </li>
                                    </ul>
                                </div>
                                <div className='footer__col transfer'>
                                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                        {loading && (
                                            <Skeleton
                                                width={250}
                                                height={22}
                                                style={{ marginRight: '20px' }}
                                                containerClassName='avatar-skeleton'
                                            />
                                        )}
                                    </SkeletonTheme>
                                    <h3 style={{ display: loading ? 'none' : undefined }}>
                                        {footerData.footer_title?.footer_title_04}
                                    </h3>
                                    <ul className='transfer__list'>
                                        <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                            {loading && (
                                                <Skeleton
                                                    width={77}
                                                    height={38}
                                                    style={{ marginRight: '3px' }}
                                                    containerClassName='avatar-skeleton'
                                                />
                                            )}
                                        </SkeletonTheme>
                                        <li
                                            className='transfer__item'
                                            style={{ display: loading ? 'none' : undefined }}
                                        >
                                            <img src={'/assets/img/nhattin.jpg'} />
                                        </li>
                                        <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                            {loading && (
                                                <Skeleton width={77} height={38} containerClassName='avatar-skeleton' />
                                            )}
                                        </SkeletonTheme>
                                        <li
                                            className='transfer__item'
                                            style={{ display: loading ? 'none' : undefined }}
                                        >
                                            <img src={'/assets/img/vnpost.jpg'} />
                                        </li>
                                    </ul>
                                    <SkeletonTheme baseColor='#ccc' highlightColor='#fff' borderRadius='0.5rem'>
                                        {loading && (
                                            <Skeleton
                                                width={160}
                                                height={61}
                                                style={{ marginRight: '20px' }}
                                                containerClassName='avatar-skeleton'
                                            />
                                        )}
                                    </SkeletonTheme>
                                    <div className='notice-ministry' style={{ display: loading ? 'none' : undefined }}>
                                        <Link href='/' target='_blank'>
                                            <img src={'/assets/img/logo-bct.png'} />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div> */}
                </div>
            </div>
        </footer>
    )
}
