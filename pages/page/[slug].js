import parse from 'html-react-parser'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LayoutUser from '../../layouts/LayoutUser'
import { getPageDetail } from './../../store/actions/page'

export default function PagesContent() {
    const pageData = useSelector(state => state.page.data)
    const router = useRouter()
    const { slug } = router.query
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPageDetail())
    }, [])

    const currentPage =
        pageData !== null && pageData !== undefined && Object.values(pageData)?.find(page => page.slug === slug)

    return (
        currentPage?.isDisplay === '1' && (
            <div>
                <Head>
                    <title>{currentPage?.name}</title>
                    <meta name='description' content={`Tuấn táo apple - ${currentPage?.name}`} />
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
