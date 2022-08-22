import parse from 'html-react-parser'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LayoutUser from '../../layouts/LayoutUser'
import { getBlogDetail } from '../../store/actions/blogDetail'

export default function PagesContent() {
    const blogData = useSelector(state => state.blogDetail.data)
    const router = useRouter()
    const { slug } = router.query
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBlogDetail())
    }, [])

    const currentPage =
        blogData !== null && blogData !== undefined && Object.values(blogData)?.find(blog => blog?.slug == slug)

    return (
        <div>
            <Head>
                <title>{currentPage?.title}</title>
                <meta name='description' content={`Tuấn táo apple - ${currentPage?.title}`} />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <LayoutUser>
                <div className='blog-detail'>
                    <div className='container'>
                        <h2>{currentPage?.title}</h2>
                        <div>{parse(currentPage?.content ? currentPage?.content : '')}</div>
                    </div>
                </div>
            </LayoutUser>
        </div>
    )
}
