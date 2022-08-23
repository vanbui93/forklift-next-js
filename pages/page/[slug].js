import { ref, set } from '@firebase/database'
import { Button } from '@material-ui/core'
import parse from 'html-react-parser'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import nextId, { setPrefix } from 'react-id-generator'
import { useDispatch, useSelector } from 'react-redux'
import methods from 'validator'
import LayoutUser from '../../layouts/LayoutUser'
import { RULES } from '../../Route'
import { addContactInfo } from '../../store/actions/contact'
import { db } from '../../utils/firebase'
import { getPageDetail } from './../../store/actions/page'

export default function PagesContent() {
    const pageData = useSelector(state => state.page.data)
    const router = useRouter()
    const { slug } = router.query
    const dispatch = useDispatch()

    const [contactData, setContactData] = useState({
        contact_name: '',
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

    useEffect(() => {
        dispatch(getPageDetail())
    }, [])

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

    //validate form
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
                contact_name: '',
                contact_email: '',
                contact_message: '',
            })
        } else {
            setErrorsMessage({
                ...valiErrors(),
            })
        }
    }

    const currentPage =
        pageData !== null && pageData !== undefined && Object.values(pageData)?.find(page => page.slug === slug)

    if (slug === 'contact') {
        return (
            <div>
                <Head>
                    <title>{currentPage?.name}</title>
                    <meta name='description' content={`Tanat Service ForkLift - ${currentPage?.name}`} />
                    <meta
                        name='viewport'
                        content='width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0'
                    />
                    <link rel='icon' href='/favicon.ico' />
                </Head>
                <LayoutUser>
                    <div className='post'>
                        <div className='container contact'>
                            <h2>{currentPage?.name}</h2>
                            <form action='/'>
                                <div className='control-group'>
                                    <label htmlFor='contact_name' className='control-label'>
                                        Name
                                    </label>
                                    <div className='contact__form-fullwidth'>
                                        <span>
                                            <input
                                                type='text'
                                                name='contact_name'
                                                className='contact__form-input'
                                                placeholder='Name'
                                                value={contactData.contact_name}
                                                onChange={e => handleOnChange(e)}
                                            />
                                        </span>
                                    </div>
                                </div>
                                <div className='control-group'>
                                    <label htmlFor='contact_email' className='control-label'>
                                        Email
                                    </label>
                                    <div className='contact__form-fullwidth'>
                                        <span>
                                            <input
                                                type='text'
                                                name='contact_email'
                                                className='contact__form-input'
                                                placeholder='*Email'
                                                required
                                                value={contactData.contact_email}
                                                onChange={e => handleOnChange(e)}
                                            />
                                        </span>
                                        {errorsMessage.contact_email && (
                                            <div className='errormessage'>{errorsMessage.contact_email}</div>
                                        )}
                                    </div>
                                </div>
                                <div className='control-group'>
                                    <label htmlFor='contact_message' className='control-label'>
                                        Message
                                    </label>
                                    <div className='contact__form-fullwidth'>
                                        <span>
                                            <textarea
                                                type='text'
                                                name='contact_message'
                                                className='contact__form-input footer__contact-text-area'
                                                placeholder='*Message'
                                                required
                                                value={contactData.contact_message}
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
                                        marginLeft: '132px',
                                    }}
                                >
                                    Submit
                                </Button>
                            </form>
                        </div>
                    </div>
                </LayoutUser>
            </div>
        )
    } else
        return (
            currentPage?.isDisplay === '1' && (
                <div>
                    <Head>
                        <title>{currentPage?.name}</title>
                        <meta name='description' content={`Tanat Service ForkLift - ${currentPage?.name}`} />
                        <meta
                            name='viewport'
                            content='width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0'
                        />
                        <link rel='icon' href='/favicon.ico' />
                    </Head>
                    <LayoutUser>
                        <div className='post'>
                            <div className='container'>
                                <h2>{currentPage?.name}</h2>
                                <div>{parse(currentPage?.content)}</div>
                            </div>
                        </div>
                    </LayoutUser>
                </div>
            )
        )
}
