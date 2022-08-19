import parse from 'html-react-parser'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LayoutUser from '../../layouts/LayoutUser'
import { getBlog } from '../../store/actions/blogs'

export default function PagesContent() {
    const blogData = useSelector(state => state.blog.data)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getBlog())
    }, [])

    console.log(blogData)

    return (
        <div>
            <Head>
                <title>{blogData?.name}</title>
                <meta name='description' content={`Tuấn táo apple - ${blogData?.name}`} />
                <meta
                    name='viewport'
                    content='width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0'
                />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <LayoutUser>
                <div className='post'>
                    <div className='container'>sdsdsd</div>
                </div>
            </LayoutUser>
        </div>
    )
}
